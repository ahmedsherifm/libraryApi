const express = require('express');

const booksController = require('../controllers/booksController');

function router(Book) {
  const bookRouter = express.Router();
  const {
    addBook, getBooks,
    getBookByIdMiddleware, getBookById,
    replaceBookData, updateBook, removeBook
  } = booksController(Book);

  bookRouter.route('/')
    .get(getBooks)
    .post(addBook);

  bookRouter.use('/:bookId', getBookByIdMiddleware);
  bookRouter.route('/:bookId')
    .get(getBookById)
    .put(replaceBookData)
    .patch(updateBook)
    .delete(removeBook);

  return bookRouter;
}

module.exports = router;
