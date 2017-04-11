var express = require('express');
var app = express();

var data = [
  { id: 1, color: "brown", disposition: "closed" },
  { id: 2, color: "yellow", disposition: "open" },
  { id: 3, color: "brown", disposition: "closed" },
  { id: 4, color: "brown", disposition: "open" },
  { id: 5, color: "red", disposition: "closed" },
  { id: 6, color: "blue", disposition: "open" },
  { id: 7, color: "green", disposition: "closed" },
  { id: 8, color: "green", disposition: "open" },
  { id: 9, color: "brown", disposition: "closed" },
  { id: 10, color: "red", disposition: "open" },
  { id: 11, color: "blue", disposition: "closed" },
  { id: 12, color: "yellow", disposition: "open" }
];

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/records', function (req, res) {
  var limit = parseInt(req.query.limit) || 100;
  var offset = parseInt(req.query.offset) || 0;
  var colorFilters = req.query.color;
  var response;

  if (typeof req.query.color !== "undefined" && !Array.isArray(req.query.color)) {
    res.status(400).send('Bad Request');
    return;
  }

  if (isNaN(limit) || limit < 0 || isNaN(offset) || offset < 0) {
    res.status(400).send('Bad Request');
    return;
  }

  if (colorFilters && colorFilters.length) {
    response = data
      .filter(function(item){ return colorFilters.indexOf(item.color) !== -1; })
      .slice(offset, offset + limit);
  } else {
    response = data.slice(offset, offset + limit);
  }

  res.send(response);
});

app.listen(3000, function () {
  console.log('Records API listening on port 3000!')
});
