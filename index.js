const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');

// const db = require('./db');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// db.on('error', console.error.bind(console, 'Mongoose connection error:'));

app.get('/', (req, res) => {
  res.send('Hello from the server');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
