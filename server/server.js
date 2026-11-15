// my dns was failing for atlas so forcing google dns

require('node:dns').setServers(['8.8.8.8', '8.8.4.4']);
// main server file, just connects to the db for now
require('dotenv').config();
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var authRoutes = require('./routes/auth');

var app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', function (req, res) {
  res.send('taskmatrix server is running');
});

mongoose.connect(process.env.MONGO_URI).then(function () {
  console.log('mongodb connected');
  app.listen(process.env.PORT || 5000, function () {
    console.log('server running on port ' + (process.env.PORT || 5000));
  });
}).catch(function (err) {
  console.log('mongodb connection failed: ' + err.message);
});