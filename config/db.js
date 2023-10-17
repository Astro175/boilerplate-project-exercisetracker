const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const uri = process.env.MONGO_URI;

const connectDatabase = async () => {
    try {
        await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true});
        console.log('Database connection successful');
    } catch(error) {
        console.log('Database connection error', error);
    }
}

module.exports = connectDatabase;