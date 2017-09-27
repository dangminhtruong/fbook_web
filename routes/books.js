var booksController = require('../controllers/books');

var books = function (app) {
    app.use('/books', booksController);
};

module.exports = books;
