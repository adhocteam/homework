// your code goes here ...
(function() {
  var householdList = [];

  addValidations();
  document.querySelector('.builder > form').addEventListener('submit', function(evt) {
    evt.preventDefault(); 
    growHouseholds(serialize(this));
    initializeForm();
  });

  document.getElementsByClassName('household')[0].addEventListener('click', function(evt) {
    if (evt.target.className === 'delete') {
      var createdTime = evt.target.id.split('del-')[1];
      removeHousehold(createdTime);
    }
  }, false);

  document.getElementsByClassName('submit-list')[0].addEventListener('click', function() {
    var clonedList = JSON.parse(JSON.stringify(householdList)).map(function(item) {
      delete item.create_time;
      return item;
    });
    var debugElement = document.getElementsByClassName('debug')[0];
    if (clonedList.length > 0) {
      debugElement.style.display = 'block';
    } else {
      debugElement.style.display = 'none';
    }
    debugElement.innerHTML = JSON.stringify(clonedList, undefined, 2);
  });

  function addValidations() {
    document.querySelector('.builder > form input[name="age"]').required = true;
    document.querySelector('.builder > form input[name="age"]').type = 'number';
    document.querySelector('.builder > form input[name="age"]').min = 1;
    document.querySelector('.builder > form select[name="rel"]').required = true;
    document.querySelector('.builder > form button:not(.add)').type = 'button';
    document.querySelector('.builder > form button:not(.add)').className = 'submit-list';
  }

  function serialize(form) {
    return Array
      .from(new FormData(form).entries())
      .reduce(function (response, current) {
        response[current[0]] = current[1];
        return response;
      }, {});
  }

  function getElement(info) {
    var li = document.createElement('li');
    var now = new Date().getTime();
    li.id = 'child-' + now;
    li.innerHTML = '<strong>Age </strong>' + info.age + '<br>' +
                   '<strong>Relationship </strong>' + info.rel + '<br>' +
                   '<strong>Smoker </strong>' + (info.smoker? 'Yes' : 'No') + '<br>' +
                   '<a id="del-' + now + '" class="delete" href="javascript:void(0)">Delete</a>';
    return li;
  }

  function growHouseholds(info) {
    var li = document.createElement('li');
    var now = new Date().getTime();
    li.id = 'child-' + now;
    li.innerHTML = '<strong>Age </strong>' + info.age + '<br>' +
                   '<strong>Relationship </strong>' + info.rel + '<br>' +
                   '<strong>Smoker </strong>' + (info.smoker? 'Yes' : 'No') + '<br>' +
                   '<a id="del-' + now + '" class="delete" href="javascript:void(0)">Delete</a>';
    document.getElementsByClassName('household')[0].appendChild(li);
    info.create_time = now;
    householdList.push(info);
  }

  function removeHousehold(time) {
    document.getElementById('child-' + time).remove();
    var index = householdList.findIndex(function(item) {
      return item.create_time === time;
    });
    householdList.splice(index, 1);
  }

  function initializeForm() {
    document.querySelector('.builder > form input[name="age"]').value = '';
    document.querySelector('.builder > form select[name="rel"]').value = '';
    document.querySelector('.builder > form input[name="smoker"]').checked = false;
  }
})();
