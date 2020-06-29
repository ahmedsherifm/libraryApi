/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
function booksController(Book) {
  function getBooks(req, res) {
    const { query } = req;
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }

      const returnBooks = books.map((book) => {
        const newBook = book.toJSON();
        newBook.links = {};
        newBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return newBook;
      });
      return res.json(returnBooks);
    });
  }

  function addBook(req, res) {
    const book = new Book(req.body);

    if (!book.title) {
      res.status(400);
      return res.send('Title is required');
    }

    res.status(201);
    return res.json(book);
  }

  function getBookByIdMiddleware(req, res, next) {
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
  }

  function getBookById(req, res) {
    const returnBook = req.book.toJSON();

    returnBook.links = {};
    const { genre } = returnBook;
    returnBook.links.filterByThisGenre = `http://${req.headers.host}/api/books?genre=${encodeURI(genre)}`;
    res.json(returnBook);
  }

  function replaceBookData(req, res) {
    const { book } = req;

    book.title = req.body.title;
    book.author = req.body.author;
    book.genre = req.body.genre;
    book.read = req.body.read;
    book.save((err) => {
      if (err) {
        return res.send(err);
      }

      res.status(200);
      return res.json(book);
    });
  }

  function updateBook(req, res) {
    const { book } = req;

    if (req.body._id) {
      delete req.body._id;
    }
    Object.entries(req.body).forEach((item) => {
      const key = item[0];
      const value = item[1];
      book[key] = value;
    });
    book.save((err) => {
      if (err) {
        return res.send(err);
      }

      res.status(200);
      return res.json(book);
    });
  }

  function removeBook(req, res) {
    req.book.remove((err) => {
      if (err) {
        return res.send(err);
      }

      return res.sendStatus(204);
    });
  }

  return {
    addBook,
    getBooks,
    getBookByIdMiddleware,
    getBookById,
    replaceBookData,
    updateBook,
    removeBook
  };
}

module.exports = booksController;
