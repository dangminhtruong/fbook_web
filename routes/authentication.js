var loginController = require('../controllers/login');
var callbackController = require('../controllers/callback');
var logoutController = require('../controllers/logout');

module.exports = {
    login: function (app) {
        app.use('/login', loginController);
    },
    callback: function (app) {
        app.use('/callback', callbackController);
    },
    logout: function (app) {
        app.use('/logout', logoutController);
    }
};
