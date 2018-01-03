var express = require('express');
var router = express.Router();
var request = require('request');
var objectHeaders = require('../helpers/headers');
var authorize = require('../middlewares/authorize');
var localSession = require('../middlewares/localSession');
var async = require('async');

router.get('/my_profile', authorize.isAuthenticated, function(req, res, next) {
    var pageReading = req.query.pageReading ? req.query.pageReading : 1;
    var pageWaiting = req.query.pageWaiting ? req.query.pageWaiting : 1;
    var pageDone = req.query.pageDone ? req.query.pageDone : 1;
    var pageSharing = req.query.pageSharing ? req.query.pageSharing : 1;
    var pageSuggest = req.query.pageSuggest ? req.query.pageSuggest : 1;
    var pageReviewed = req.query.pageReviewed ? req.query.pageReviewed : 1;
    var userId = req.session.user.id;

    async.parallel({
        suggestedBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/interested-books?page=' + pageSuggest,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var suggestedBooks = JSON.parse(body);
                        callback(null, suggestedBooks);
                    } catch (errorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        waitingBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/book/' + userId + '/waiting?page=' + pageWaiting,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var waitingBooks = JSON.parse(body);
                        callback(null, waitingBooks);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        readingBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/book/' + userId + '/reading?page=' + pageReading,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var readingBooks = JSON.parse(body);
                        callback(null, readingBooks);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        doneBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/book/' + userId + '/returned?page=' + pageDone,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var doneBooks = JSON.parse(body);
                        callback(null, doneBooks);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        sharingBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/book/' + userId + '/sharing?page=' + pageSharing,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var sharingBooks = JSON.parse(body);
                        callback(null, sharingBooks);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        reviewedBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/book/' + userId + '/reviewed?page=' + pageReviewed,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var reviewedBooks = JSON.parse(body);
                        callback(null, reviewedBooks);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        user: function (callback) {
          request({
                url: req.configs.api_base_url + 'users/' + userId,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var user = JSON.parse(body);
                        callback(null, user);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        follow: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/follow/info/' + userId,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var user = JSON.parse(body);
                        callback(null, user);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        categories: function (callback) {
            request({
                url: req.configs.api_base_url + 'categories',
                headers: objectHeaders.headers
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var categories = JSON.parse(body);
                        callback(null, categories);
                    } catch (errorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        }
    }, function (err, results) {
        if (err || !results.user) {
            req.flash('error', 'You can\'t view user profile');

            return res.redirect('../home');
        } else {
            categoryIds = results.categories.items.map(function(category) {
                return category.id;
            });
            var interestedCategoryIds;

            if (results.user.item.tags) {
                interestedCategoryIds = results.user.item.tags.split(",");
            }

            res.render('users/current_user_profile', {
                data: results.user.item,
                pageTitle: 'My profile',
                categories: results.categories,
                interestedCategoryIds: interestedCategoryIds,
                officeId: results.user.item.office_id,
                categoryIds: categoryIds,
                userId: results.user.item.id,
                readingBooks: results.readingBooks,
                doneBooks: results.doneBooks,
                waitingBooks: results.waitingBooks,
                sharingBooks: results.sharingBooks,
                suggestedBooks: results.suggestedBooks,
                reviewedBooks: results.reviewedBooks,
                follow: results.follow.items,
                currentUrl: req.protocol + "://" + req.get('host') + '/users' + req.path,
                pageReading: pageReading,
                pageWaiting: pageWaiting,
                pageDone: pageDone,
                pageSharing: pageSharing,
                pageSuggest: pageSuggest,
                pageReviewed: pageReviewed,
            });
        }
    });
});

router.get('/my_books', authorize.isAuthenticated, function (req, res, next) {
    var pageMyBook = req.query.page ? req.query.page : 1;

    request({
        url: req.configs.api_base_url + 'users/book/' + req.session.user.id + '/sharing?page=' + pageMyBook,
        headers: objectHeaders.headers({'Authorization': req.session.access_token})
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            try {
                var books = JSON.parse(body);
                res.render('users/my_books.ejs', {
                    books: books,
                    pageTitle: 'My Books',
                    pageName: 'My books',
                    info: req.flash('info'),
                    error: req.flash('error'),
                });
            } catch (errorJSONParse) {
                res.redirect('home');
            }
        } else {
            res.redirect('home');
        }
    });
});

router.get('/fbook_app', localSession, function(req, res) {
    res.render('users/fbook_app.ejs');
});

router.get('/:id', authorize.isAuthenticated, function(req, res, next) {
    var pageReading = req.query.pageReading ? req.query.pageReading : 1;
    var pageWaiting = req.query.pageWaiting ? req.query.pageWaiting : 1;
    var pageDone = req.query.pageDone ? req.query.pageDone : 1;
    var pageSharing = req.query.pageSharing ? req.query.pageSharing : 1;
    var pageSuggest = req.query.pageSuggest ? req.query.pageSuggest : 1;
    var pageReviewed = req.query.pageReviewed ? req.query.pageReviewed : 1;
    var userId = req.params.id;

    async.parallel({
        waitingBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/book/' + userId + '/waiting?page=' + pageWaiting,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var waitingBooks = JSON.parse(body);
                        callback(null, waitingBooks);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        readingBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/book/' + userId + '/reading?page=' + pageReading,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var readingBooks = JSON.parse(body);
                        callback(null, readingBooks);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        doneBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/book/' + userId + '/returned?page=' + pageDone,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var doneBooks = JSON.parse(body);
                        callback(null, doneBooks);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        sharingBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/book/' + userId + '/sharing?page=' + pageSharing,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var sharingBooks = JSON.parse(body);
                        callback(null, sharingBooks);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        reviewedBooks: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/book/' + userId + '/reviewed?page=' + pageReviewed,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var reviewedBooks = JSON.parse(body);
                        callback(null, reviewedBooks);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        user: function (callback) {
          request({
                url: req.configs.api_base_url + 'users/' + req.params.id,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var user = JSON.parse(body);
                        callback(null, user);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        follow: function (callback) {
            request({
                url: req.configs.api_base_url + 'users/follow/info/' + req.params.id,
                headers: objectHeaders.headers({'Authorization': req.session.access_token})
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var user = JSON.parse(body);
                        callback(null, user);
                    } catch (errsorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        },
        categories: function (callback) {
            request({
                url: req.configs.api_base_url + 'categories',
                headers: objectHeaders.headers
            }, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    try {
                        var categories = JSON.parse(body);
                        callback(null, categories);
                    } catch (errorJSONParse) {
                        callback(null, null);
                    }
                } else {
                    callback(null, null);
                }
            });
        }
    }, function (err, results) {
        if (err || !results.user) {
            req.flash('error', 'You can\'t view user profile');

            return res.redirect('../home');
        } else {
            categoryIds = results.categories.items.map(function(category) {
                return category.id;
            });
            var interestedCategoryIds;

            if (results.user.item.tags) {
                interestedCategoryIds = results.user.item.tags.split(",");
            }

            res.render('users/profile', {
                data: results.user.item,
                pageTitle: results.user.item.id + ' profile',
                categories: results.categories,
                interestedCategoryIds: interestedCategoryIds,
                categoryIds: categoryIds,
                officeId: results.user.item.office_id,
                userId: results.user.item.id,
                readingBooks: results.readingBooks,
                doneBooks: results.doneBooks,
                waitingBooks: results.waitingBooks,
                sharingBooks: results.sharingBooks,
                reviewedBooks: results.reviewedBooks,
                follow: results.follow.items,
                currentUrl: req.protocol + "://" + req.get('host') + '/users' + req.path,
                pageReading: pageReading,
                pageWaiting: pageWaiting,
                pageDone: pageDone,
                pageSharing: pageSharing,
                pageReviewed: pageReviewed,
            });
        }
    });
});

module.exports = router;
