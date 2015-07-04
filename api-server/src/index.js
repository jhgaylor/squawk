
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var ClientRouter = require('./routers/clients');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/clients', ClientRouter);

app.get('/', function(req, res) {
  res.send('Hello World!!!!!!');
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
