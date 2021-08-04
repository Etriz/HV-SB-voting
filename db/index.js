const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URL;

mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch((e) => {
    console.error('Connection Error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
