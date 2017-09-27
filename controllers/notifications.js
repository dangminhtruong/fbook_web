var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
var async = require('async');
var objectHeaders = require('../helpers/headers');
var localSession = require('../middlewares/localSession');
var authorize = require('../middlewares/authorize');

router.get('/', authorize.isAuthenticated, function (req, res, next) {
    var page = req.query.page ? req.query.page : 1;
    request({
        url: req.configs.api_base_url + 'notifications' + '/?page=' + page,
        headers: objectHeaders.headers({'Authorization': req.session.access_token})
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            try {
                var dataNoti = JSON.parse(body);
                res.render('users/notifications', {
                    dataNoti: dataNoti,
                    pageTitle: 'Notifications',
                    info: req.flash('info'),
                    error: req.flash('error'),
                });
            } catch (errorJSONParse) {
                res.redirect('home');
            }
        } else {
            req.flash('error', response.statusCode);
            res.redirect('home');
        }
    });
});

module.exports = router;
