var adminController = require('../controllers/admin');

var admin = function (app) {
    app.use('/admin', adminController);
};

module.exports = admin;
