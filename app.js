const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const port = process.env.PORT || 3000;

const bookRouter = require('./routes/bookRoutes');

app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to Library API');
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
