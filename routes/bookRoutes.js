const express = require('express');

const Book = require('../models/bookModel');

function router() {
  const bookRouter = express.Router();
  bookRouter.route('/')
    .get((req, res) => {
      const { query } = req;
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }

        return res.json(books);
      });
    })
    .post((req, res) => {
      const book = new Book(req.body);

      book.save();
      res.status(201).json(book);
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
