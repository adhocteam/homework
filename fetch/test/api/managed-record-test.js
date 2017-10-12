import retrieve from "../../api/managed-records";
import fetch from '../../util/fetch-fill';
import URI from 'urijs';

describe("Records", function() {

  it('should return unfiltered results', function(done){
    var expected = {"previousPage":null,"nextPage":2,"ids":[1,2,3,4,5,6,7,8,9,10],"open":[{"id":2,"color":"yellow","disposition":"open","isPrimary":true},{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":8,"color":"green","disposition":"open","isPrimary":false},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":1};
    retrieve().then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  describe('should return results for', function(){
    it('first page', function(done){
      var expected = {"previousPage":null,"nextPage":2,"ids":[1,2,3,4,5,6,7,8,9,10],"open":[{"id":2,"color":"yellow","disposition":"open","isPrimary":true},{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":8,"color":"green","disposition":"open","isPrimary":false},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":1};
      retrieve({page: 1}).then(function(output){
        expect(output).toEqual(expected);
      }).then(done);
    });
    it('third page', function(done){
      var expected = {"previousPage":2,"nextPage":4,"ids":[21,22,23,24,25,26,27,28,29,30],"open":[{"id":23,"color":"red","disposition":"open","isPrimary":true},{"id":24,"color":"red","disposition":"open","isPrimary":true},{"id":25,"color":"red","disposition":"open","isPrimary":true},{"id":28,"color":"blue","disposition":"open","isPrimary":true}],"closedPrimaryCount":3};
      retrieve({page: 3}).then(function(output){
        expect(output).toEqual(expected);
      }).then(done);
    });
    it('fifteenth page with colors', function(done){
      var expected = {"previousPage":14,"nextPage":16,"ids":[236,237,238,240,241,243,246,251,252,256],"open":[{"id":240,"color":"blue","disposition":"open","isPrimary":true},{"id":241,"color":"red","disposition":"open","isPrimary":true},{"id":243,"color":"blue","disposition":"open","isPrimary":true},{"id":251,"color":"blue","disposition":"open","isPrimary":true},{"id":252,"color":"blue","disposition":"open","isPrimary":true},{"id":256,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":4};
      retrieve({page: 15, colors: ["red", "blue", "brown"]}).then(function(output){
        expect(output).toEqual(expected);
      }).then(done);
    });
    it('thirty fourth page', function(done){
      var expected = {"previousPage":33,"nextPage":35,"ids":[331,332,333,334,335,336,337,338,339,340],"open":[{"id":332,"color":"brown","disposition":"open","isPrimary":false},{"id":334,"color":"green","disposition":"open","isPrimary":false},{"id":336,"color":"blue","disposition":"open","isPrimary":true},{"id":337,"color":"green","disposition":"open","isPrimary":false},{"id":339,"color":"green","disposition":"open","isPrimary":false},{"id":340,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":2};
      retrieve({page: 34}).then(function(output){
        expect(output).toEqual(expected);
      }).then(done);
    });
    it('last page', function(done){
      var expected = {"previousPage":49,"nextPage":null,"ids":[491,492,493,494,495,496,497,498,499,500],"open":[{"id":491,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":6};
      retrieve({page: 50}).then(function(output){
        expect(output).toEqual(expected);
      }).then(done);
    });
  });

  it('should return an empty set of results for pages after the last page', function(done){
    var expected = {"previousPage":50,"nextPage":null,"ids":[],"open":[],"closedPrimaryCount":0};
    retrieve({page: 51}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should return results filtered by multiple colors', function(done){
    var expected = {"previousPage":null,"nextPage":2,"ids":[5,6,10,11,15,16,17,22,23,24],"open":[{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":10,"color":"red","disposition":"open","isPrimary":true},{"id":23,"color":"red","disposition":"open","isPrimary":true},{"id":24,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":6};
    retrieve({page: 1, colors: ['red', 'blue']}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should return results filtered by a single color', function (done) {
    var expected = {"previousPage":null,"nextPage":2,"ids":[1,3,4,9,20,27,29,41,42,55],"open":[{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":41,"color":"brown","disposition":"open","isPrimary":false},{"id":55,"color":"brown","disposition":"open","isPrimary":false}],"closedPrimaryCount":0};
    retrieve({colors: ["brown"]}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should return empty results', function(done){
    var expected = {"previousPage":null,"nextPage":null,"ids":[],"open":[],"closedPrimaryCount":0};
    retrieve({colors: ["hotpink"]}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should recover on fetch error', function(done){
    window.path = "http://localhost:3000/recordszzz";
    spyOn(console, "log").and.callFake(function(){});

    function check(output) {
      window.path = "http://localhost:3000/records";
      expect(console.log).toHaveBeenCalled();
      console.log.calls.reset();
      retrieve().then(function(output){
        var expected = {"previousPage":null,"nextPage":2,"ids":[1,2,3,4,5,6,7,8,9,10],"open":[{"id":2,"color":"yellow","disposition":"open","isPrimary":true},{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":8,"color":"green","disposition":"open","isPrimary":false},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":1};
        expect(output).toEqual(expected);
        expect(console.log).not.toHaveBeenCalled();
        done();
      });
    }

    retrieve().then(check);
  });

});
