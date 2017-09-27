var request = require('request');
var express = require('express');
var session = require('express-session');
var app = express();

module.exports = {
    isAuthenticated: function (req, res, next) {
        if (typeof req.session.user === 'undefined' || typeof req.session.access_token === 'undefined') {
            req.flash('error', 'Please login');

            return res.redirect('back');
        }

        res.locals.user = req.session.user;
        res.locals.access_token = req.session.access_token;

        next();
    }
};
