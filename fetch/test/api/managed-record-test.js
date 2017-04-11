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

  it('should return first page of results', function(done){
    var expected = {"previousPage":null,"nextPage":2,"ids":[1,2,3,4,5,6,7,8,9,10],"open":[{"id":2,"color":"yellow","disposition":"open","isPrimary":true},{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":8,"color":"green","disposition":"open","isPrimary":false},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":1};
    retrieve({page: 1}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should return a second page of results', function(done){
    var expected = {"previousPage":1,"nextPage":null,"ids":[11,12],"open":[{"id":12,"color":"yellow","disposition":"open","isPrimary":true}],"closedPrimaryCount":1};
    retrieve({page: 2}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should return a empty third page of results', function(done){
    var expected = {"previousPage":2,"nextPage":null,"ids":[],"open":[],"closedPrimaryCount":0};
    retrieve({page: 3}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should return results filtered by multiple colors', function(done){
    var expected = {"previousPage":null,"nextPage":null,"ids":[5,6,10,11],"open":[{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":2};
    retrieve({page: 1, colors: ['red', 'blue']}).then(function(output){
      expect(output).toEqual(expected);
    }).then(done);
  });

  it('should return results filtered by a single color', function (done) {
    var expected = {"previousPage":null,"nextPage":null,"ids":[1,3,4,9],"open":[{"id":4,"color":"brown","disposition":"open","isPrimary":false}],"closedPrimaryCount":0};
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

  it('should paginate correctly when on last page of results', function (done) {
    var expected = {"previousPage":null,"nextPage":null,"ids":[1,3,4,5,6,7,8,9,10,11],"open":[{"id":4,"color":"brown","disposition":"open","isPrimary":false},{"id":6,"color":"blue","disposition":"open","isPrimary":true},{"id":8,"color":"green","disposition":"open","isPrimary":false},{"id":10,"color":"red","disposition":"open","isPrimary":true}],"closedPrimaryCount":2};
    retrieve({colors: ["red", "brown", "blue", "green"]}).then(function(output){
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
