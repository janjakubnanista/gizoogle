'use strict';

var cheerio = require('cheerio');
var http = require('http');
var querystring = require('querystring');

var HOSTNAME = 'gizoogle.net';

function createRequest(path, payload, callback) {
    return http.request({
        protocol: 'http:',
        hostname: HOSTNAME,
        port: 80,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(payload, 'utf8')
        }
    }, callback)
}

function parseResponse(res, callback) {
    var chunks = [];

    res.on('data', function (chunk) {
        chunks.push(chunk);
    });

    res.on('end', function () {
        callback(Buffer.concat(chunks).toString('utf8'));
    });
}

module.exports = {
    string: function(string, callback) {
        var payload = querystring.stringify({ translatetext: string });
        var req = createRequest('/textilizer.php', payload, function receiveHTTPResponse(res) {
            parseResponse(res, function extractTranslatedString(body) {
                if (res.statusCode !== 200) {
                    return callback(Error('Got error response HTTP ' + res.statusCode));
                }

                var html = cheerio.load(body.toString('utf8')),
                    text = html('textarea[name="translatetext"]').val();

                if (!text) {
                    return callback(new Error('Got empty response'));
                }

                callback(null, text.trim());
            });
        });

        req.on('error', callback);

        req.write(payload, 'utf8');
        req.end();

        return req;
    },

    website: function(url, callback) {
        var payload = querystring.stringify({ search: url });
        var req = createRequest('/tranzizzle.php', payload, function receiveHTTPResponse(res) {
            parseResponse(res, function extractTranslatedString(body) {
                if (res.statusCode !== 200) {
                    return callback(Error('Got error response HTTP ' + res.statusCode));
                }

                callback(null, body);
            });
        });

        req.on('error', callback);

        req.write(payload, 'utf8');
        req.end();

        return req;
    }
}
