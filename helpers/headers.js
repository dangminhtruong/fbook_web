var util = require('util');

module.exports = {
    headers: function (params) {
        var extend = util._extend;
        var defaultHeader = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        return params !== undefined ? extend(defaultHeader, params) : defaultHeader;
    },
    urlencodedHeaders: function (params) {
        var extend = util._extend;
        var defaultHeader = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        };

        return params !== undefined ? extend(defaultHeader, params) : defaultHeader;
    }
};

