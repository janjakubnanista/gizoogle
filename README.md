# Gizoogle.js

[![Build Status](https://travis-ci.org/janjakubnanista/gizoogle.svg)](https://travis-ci.org/janjakubnanista/gizoogle)

[Gizoogle.net](http://gizoogle.net) translates a string or a complete website to a Snoop Dogg like slang. Since it lacks an API and of course you want to use it in your JavaScript projects, I have created this Node.js interface to help you out.

## Installation

To install via npm, please run

    npm install gizoogle

## Usage

    var G = require('gizoogle');

    // To translate a string
    G.string('hello world', function(error, translation) {
    	...
    });

    // To translate a website
    G.website('http://google.com', function(error, translation) {
    	...
    });

## API

`G.string(string, callback);`

Translates a string.

`string` *`String`* String to translate.

`callback` *`function(Error, String)`* Callback to call when translation is ready.

`G.website(url, callback);`

Translates a string.

`url` *`String`* URL of the website to translate.

`callback` *`function(Error, String)`* Callback to call when translation is ready.
