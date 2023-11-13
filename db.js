const mongoose = require('mongoose');

const DB_URI = 'mongodb+srv://dheerajgussain10:VzLJerkaEsTeyQlC@cluster0.hqhyz2o.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;


