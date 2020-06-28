const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to Library API');
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
