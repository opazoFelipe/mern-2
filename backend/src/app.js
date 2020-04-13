const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Settings 
const appPort = process.env.PORT || 3000;
app.set('port', appPort);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// Routes
app.use('/api/users', require('./routes/user.route'));
app.use('/api/notes', require('./routes/note.route'));

const startApp = async () => {
    await app.listen(appPort);
    console.log(`Server on port ${appPort}`);
}

module.exports = {startApp};