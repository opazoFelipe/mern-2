require('dotenv').config();

const { startApp } = require('./app');
require('./database');

startApp();