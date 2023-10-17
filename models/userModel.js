const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    username: {
        type: String
    },
    exercises: [{
        description: {
            type: String,
        },
        duration: {
            type: Number,
        },
        date: String
    }]   
});

const User = mongoose.model('User', userSchema);
module.exports = User;