const express = require('express');

const bookRouter = express.Router();
const Book = require('../models/bookModel');

function router() {
  bookRouter.route('/')
    .get((req, res) => {
      const { query } = req;
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }

        return res.json(books);
      });
    });
  bookRouter.route('/:bookId')
    .get((req, res) => {
      const { bookId } = req.params;
      Book.findById(bookId, (err, book) => {
        if (err) {
          return res.send(err);
        }

        return res.json(book);
      });
    });

  return bookRouter;
}

module.exports = router();
