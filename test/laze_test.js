var libpath = process.env['LAZY_COV'] ? '../lib-cov' : '../lib';
var laze = require(libpath + '/laze');

describe('laze', function () {

  describe('with a non prototype object', function () {

    var properResponse = 'john';
    var results = [];
    var object = {
      name: function () {
        this.called = this.called ? this.called + 1 : 1;
        return properResponse;
      }
    };

    before(function () {
      // Make it laze
      laze.makeAll(object, ['name']);
      // Call it twice and record the results
      results.push(object.name);
      results.push(object.name);
    });

    it('should be enumerable', function () {
      Object.keys(object).indexOf('name').should.not.equal(-1);
    });

    it('should have the same result each time', function () {
      results.forEach(function (res) {
        res.should.equal(properResponse);
      });
    });

    it('should be called once', function () {
      object.called.should.equal(1);
    });

  });

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
      // Make it laze
      laze.makeAll(object.prototype, ['name']);
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
    var object = function (r) {
      this.response = r || properResponse;
    };

    before(function () {
      // Define a new property
      laze.defineAll(object.prototype, {
        name: function () {
          this.called = this.called ? this.called + 1 : 1;
          return this.response; // text context
        }
      });
    });

    describe('calling on two different objects of the same type', function () {

      var results = new Array(2);
      var names = ['john', 'kate'];

      before(function () {
        results[0] = new object(names[0]).name;
        results[1] = new object(names[1]).name;
      });

      it('should get the proper name for the first call', function () {
        results[0].should.equal(names[0]);
      });

      it('should get the proper name for the second call', function () {
        results[1].should.equal(names[1]);
      });

    });

    describe('calling on the same object twice', function () {

      var results = [];
      var obj;

      before(function () {
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

});
