require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.APP_PORT || 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Menggunakan rute dari notes.js
const notesRouter = require('./routes/notes');
app.use('/notes', notesRouter);

// Rute dasar untuk root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Notes API');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
