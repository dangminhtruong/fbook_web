var session = require('express-session');

localSession = function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.access_token = req.session.access_token;

    next();
};

module.exports = localSession;
