const express = require('express');
const router = express.Router();
const { registerUser, getUsers,  newExercise, getLog } = require('../controllers/userController')

// Route to create a new user
router.post('/', registerUser);

// Route to get all users
router.get('/', getUsers);

// Route to add new exercise for a user
router.post('/:_id/exercises', newExercise);

// Route to get a log of a user
router.get('/:_id/logs', getLog);

module.exports = router;

