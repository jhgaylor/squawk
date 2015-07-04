var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/squawk';
mongoose.connect(MONGO_URL);
var Models = require('./models')(mongoose);

var ContactsRouter = require('./routers/contacts')(Models);
var UsersRouter = require('./routers/users')(Models);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/contacts', ContactsRouter);
app.use('/users', UsersRouter);

app.get('/', function(req, res) {
  res.send('Hello World!!!!!!');
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
