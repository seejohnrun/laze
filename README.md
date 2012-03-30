# Lazy Properties

[![Build Status](https://secure.travis-ci.org/seejohnrun/laze.png)](http://travis-ci.org/seejohnrun/laze)

This is a library for easily defining lazy properties in JavaScript.

To define a property:

``` javascript
var thing = { };
lazy.define(thing, 'func', function () {
  return 'something';
});

thing.func(); // calls function
thing.func(); // does not call function
```

You can also take properties that already exist and make them lazy:

``` javascript
var thing = {
  func: function () { }
};
lazy.make(thing, 'func'); // one property
lazy.makeAll(thing, ['other', 'things', 'too']); // many at once
```

And lastly you can define multiple at the same time:

``` javascript
var thing = {};
lazy.defineAll(thing, {
  name: function () { },
  number: function () { }
});
```
