const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const connectDatabase = require('./config/db');
const userRoute = require('./routes/userRoute');
const logger = require('./middleware/requestLogger')

connectDatabase();
app.use(cors());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.use('/api/users', userRoute);
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
