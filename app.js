var express = require('express');
var expressValidator = require('express-validator');
var path = require('path');
var expressLayouts = require('express-ejs-layouts');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var configs = require('./configs/config');

var index = require('./routes/index');
var users = require('./routes/users');
var books = require('./routes/books');
var admin = require('./routes/admin');
var notifications = require('./routes/notifications')
var authentication = require('./routes/authentication');
var request = require('request');
var objectHeaders = require('./helpers/headers');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layout/template');

app.use(expressLayouts);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({resave: true, saveUninitialized: true, secret: 'wemakeitawesome', cookie: { maxAge: 60000 * 30 }}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

// configs
app.use(function (req, res, next) {
    req.configs = configs;
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//controllers
index(app);
users(app);
books(app);
notifications(app);
admin(app);
authentication.login(app);
authentication.callback(app);
authentication.logout(app);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.locals.configs = configs;

getString = function (string, maxLength) {
    if (typeof string !== 'undefined' && string) {
        return string.length > maxLength ? string.substring(0, maxLength) + '...' : string;
    }
};

request({
    url: app.locals.configs.api_base_url + 'offices',
    headers: objectHeaders.headers
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        try {
            var offices = JSON.parse(body);
            app.locals.offices = offices;
        } catch (errorJSONParse) {
            app.locals.offices = false;
        }
    } else {
        app.locals.offices = false;
    }
});

module.exports = app;
