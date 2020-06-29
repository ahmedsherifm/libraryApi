/* eslint-disable no-param-reassign */
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

  bookRouter.use('/:bookId', (req, res, next) => {
    const { bookId } = req.params;
    Book.findById(bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      if (book) {
        req.book = book;
        return next();
      }

      return res.status(404);
    });
  });
  bookRouter.route('/:bookId')
    .get((req, res) => res.json(req.book))
    .put((req, res) => {
      const { book } = req;

      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      book.save();
      return res.json(book);
    });

  return bookRouter;
}

module.exports = router();
