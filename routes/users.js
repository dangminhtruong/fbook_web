var usersController = require('../controllers/users');

var users = function (app) {
    app.use('/users', usersController);
};

module.exports = users;
