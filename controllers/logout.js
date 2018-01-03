var express = require('express');
var app = express();
var router = express.Router();

router.get('/', function(req, res, next) {
    req.session.destroy();
    res.redirect('home');
});

module.exports = router;
