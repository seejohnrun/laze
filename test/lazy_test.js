var libpath = process.env['LAZY_COV'] ? '../lib-cov' : '../lib';
var lazy = require(libpath + '/lazy');

describe('lazy', function () {

  describe('with an existing property', function () {

    var properResponse = 'john';
    var object = function () {
      this.response = properResponse;
    };
    object.prototype = {
      name: function () {
        this.called = this.called ? this.called + 1 : 1;
        return this.response;
      }
    };

    var results = [];
    var obj;

    before(function () {
      // Make it lazy
      lazy.makeAll(object.prototype, ['name']);
      // Call it twice and record the results
      obj = new object();
      results.push(obj.name);
      results.push(obj.name);
    });

    it('should be enumerable', function () {
      Object.keys(object.prototype).indexOf('name').should.not.equal(-1);
    });

    it('should have the same result each time', function () {
      results.forEach(function (res) {
        res.should.equal(properResponse);
      });
    });

    it('should be called once', function () {
      obj.called.should.equal(1);
    });

  });

  describe('with no existing property', function () {

    var properResponse = 'john';
    var object = function () {
      this.response = properResponse;
    };

    var results = [];
    var obj;

    before(function () {
      // Define a new property
      lazy.defineAll(object.prototype, {
        name: function () {
          this.called = this.called ? this.called + 1 : 1;
          return this.response; // text context
        }
      });
      // Call it twice and record the results
      obj = new object();
      results.push(obj.name);
      results.push(obj.name);
    });

    it('should be enumerable', function () {
      Object.keys(object.prototype).indexOf('name').should.not.equal(-1);
    });

    it('should have the same result each time', function () {
      results.forEach(function (res) {
        res.should.equal(properResponse);
      });
    });

    it('should be called once', function () {
      obj.called.should.equal(1);
    });

  });

});
