var indexController = require('../controllers/index');

var index = function (app) {
    app.use('/home', indexController);
    app.use('/', indexController);
};

module.exports = index;
