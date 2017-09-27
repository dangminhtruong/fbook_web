var notificationsController = require('../controllers/notifications');

var notifications = function (app) {
    app.use('/notifications', notificationsController);
};

module.exports = notifications;
