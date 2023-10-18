const User = require('../models/userModel');
const mongoose = require('mongoose');


const registerUser = async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(404).json({ error: "All fields are required" });
    }
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({error: "User already exists"});

    const user = await User.create({ username });
    res.status(200).json({ user });
}

const getUsers = async (req, res) => {
    const users = await User.find({});

    if (!users) {
        res.status(400).json({ error: 'No such documents in collection' });
    }
    res.status(200).json({ users });
}

const newExercise = async (req, res) => {
    const { _id } = req.params;
    let { description, duration, date } = req.body;

    console.log("Received userId:", _id);

    if (!date) {
        const d = new Date();
        date = d.toDateString();
    }
    if(!description || !duration) {
        return res.status(400).json({error: 'All fields must be filled'});
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ error: 'Invalid userId' });
    }
    const newExercise = {
    description,
    duration,
    date }
    const user = await User.findOneAndUpdate(
    { _id },
    { $push: { exercises: newExercise } }, // Push the new exercise to the "exercises" array
    { new: true });

res.status(200).json({ 
        _id: user.id,
        username: user.username,
        date,
        duration,
        description });
};

    
const getLog = async (req, res) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    console.log(_id);
    
    if (!_id) {
        return res.status(400).json({error: 'All fields must be filled'});
    }
    const user = await User.findById(_id);
    if (!user) {
        return res.status(400).json({error: 'User does not exist'});
    }
    const count = user.exercises.length;
    

    if(from && to && limit) {
       const fromDate = new Date(from);
        const toDate = new Date(to);

        const filteredLogs = user.exercises.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= fromDate && logDate <= toDate;
        });

        const limitedLogs = filteredLogs.slice(0, limit);

        return res.status(200).json({
            _id,
            username: user.username,
            count: limitedLogs.length,
            log: limitedLogs
        });
    }

    res.status(200).json({
        _id,
        username: user.username,
        count,
        log: user.exercises
    });
}

module.exports = { registerUser, getUsers,  newExercise, getLog };