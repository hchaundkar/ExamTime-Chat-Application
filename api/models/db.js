var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/examtimechatapplication';

mongoose.connect(dburl);

mongoose.connection.on('connected', function(){
  console.log('Mongoose DataBase connected to ' + dburl);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error ' + err);
});



//integrating Models

require('./user-model.js');
require('./quiz-model.js');
require('./discussionRoom-model.js');
