var MongoClient = require('mongodb').MongoClient;                  //Native connection
var dburl = 'mongodb://localhost:27017/examtimechatapplication';
var connection = null;

var open = function(){
  // Db Connection
  MongoClient.connect(dburl, function(error, db){
    if(err){
        console.log("Connection to DB failed");
        return;
    }
    connection = db;
    console.log("Connection to DB successfull", db);
  });
};

var get  = function(){
  return connection;
};

module.exports = {
  open: open,
  get: get
};
