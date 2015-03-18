'use strict';

var expect = require('expect.js');
var fs = require('fs');
var nock = require('nock');
var G = require('../src/gizoogle.js');

describe('Gizoogle', function() {
    beforeEach(function() {
        this.mock = nock('http://gizoogle.net');
    });

    afterEach(function() {
        delete this.mock;
    });

    describe('string()', function() {
        beforeEach(function() {
            this.post = this.mock.post('/textilizer.php', {
                translatetext: 'hello world'
            });
        });

        afterEach(function() {
            delete this.post;
        });

        context('when API call succeeds', function() {
            before(function() {
                this.responseText = fs.readFileSync(__dirname + '/mocks/textilizer_success.html');
            });

            after(function() {
                delete this.responseText;
            });

            beforeEach(function() {
                this.post.reply(200, this.responseText);
            });

            it('should pass null as error', function(done) {
                G.string('hello world', function(error, translation) {
                    expect(error).to.be(null);

                    done();
                });
            });

            it('should pass translated string as a second argument', function(done) {
                G.string('hello world', function(error, translation) {
                    expect(translation).to.be.a('string')

                    done();
                });
            });
        });

        context('when API call fails', function() {
            beforeEach(function() {
                this.post.reply(400);
            });

            it('should pass an error object', function(done) {
                G.string('hello world', function(error, translation) {
                    expect(error).to.be.an(Error);

                    done();
                });
            });
        });
    });

    describe('website()', function() {
        beforeEach(function() {
            this.post = this.mock.post('/tranzizzle.php', {
                search: 'google.com'
            });
        });

        afterEach(function() {
            delete this.post;
        });

        context('when API call succeeds', function() {
            before(function() {
                this.responseText = fs.readFileSync(__dirname + '/mocks/textilizer_success.html');
            });

            after(function() {
                delete this.responseText;
            });

            beforeEach(function() {
                this.post.reply(200, this.responseText);
            });

            it('should pass null as error', function(done) {
                G.website('google.com', function(error, translation) {
                    expect(error).to.be(null);

                    done();
                });
            });

            it('should pass translated string as a second argument', function(done) {
                G.website('google.com', function(error, translation) {
                    expect(translation).to.be.a('string')

                    done();
                });
            });
        });

        context('when API call fails', function() {
            beforeEach(function() {
                this.post.reply(400);
            });

            it('should pass an error object', function(done) {
                G.website('google.com', function(error, translation) {
                    expect(error).to.be.an(Error);

                    done();
                });
            });
        });
    });
});
