// Define an individual property that will
// be run one time, and then replace itself
// with the return value
var define = function (obj, prop, def) {
  Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: true,
    get: function () {
      var value = def.bind(this)();
      Object.defineProperty(this, prop, {
        value: value,
        configurable: false,
        writable: false
      });
      return value;
    }
  });
};

// Define a set of properties as lazy
var defineAll = function (obj, props) {
  for (var key in props) {
    define(obj, key, props[key]);
  }
};

// Make an existing property lazy
var make = function (obj, prop) {
  var def = obj[prop];
  delete obj[prop];
  define(obj, prop, def);
};

// Make a set of existing properties lazy
var makeAll = function (obj, props) {
  props.forEach(function (prop) {
    make(obj, prop);
  });
};

// Export these functions
module.exports = {
  define: define,
  defineAll: defineAll,
  make: make,
  makeAll: makeAll
};
