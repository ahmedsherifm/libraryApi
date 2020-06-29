const sinon = require('sinon');
const should = require('should');

const booksController = require('../controllers/booksController');

describe('Books Controller Tests:', () => {
  describe('POST: Add new book', () => {
    it('should not allow an empty title on post', () => {
      const Book = function (book) { this.save = () => { }; };

      const req = {
        body: {
          author: 'ahmed'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const { addBook } = booksController(Book);
      addBook(req, res);

      res.status.calledWith(400).should.equal(true, `Bad Status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
