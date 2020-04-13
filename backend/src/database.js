const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI 
    ? process.env.MONGODB_URI
    : 'mongodb://localhost/databasetest';
    
const mongoConfig = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
};  

mongoose.connect(URI, mongoConfig);

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is conected');
});
    