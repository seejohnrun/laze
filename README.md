# Laze

[![Build Status](https://secure.travis-ci.org/seejohnrun/laze.png)](http://travis-ci.org/seejohnrun/laze)

Laze is a library for easily defining lazy properties in JavaScript.

## Installation

To install this guy:

``` bash
$ npm install laze
```

## Usage

To define a property:

``` javascript
var laze = require('laze');

var thing = { };
laze.define(thing, 'func', function () {
  return 'something';
});

thing.func(); // calls function
thing.func(); // does not call function
```

You can also take properties that already exist and make them laze:

``` javascript
var laze = require('laze');

var thing = {
  func: function () { }
};
laze.make(thing, 'func'); // one property
laze.makeAll(thing, ['other', 'things', 'too']); // many at once
```

And lastly you can define multiple at the same time:

``` javascript
var laze = require('laze');

var thing = {};
laze.defineAll(thing, {
  name: function () { },
  number: function () { }
});
```

## License

(The MIT License)

Copyright © 2012 John Crepezzi

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the ‘Software’), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED ‘AS IS’, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
