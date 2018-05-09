var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');


var userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  emailid: {
    type: String,
    unique: true,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});



  var User= module.exports= mongoose.model('User', userSchema);



module.exports.getUser = function(username, callback){
  var query = {username: username}
  User.findOne(query, callback);
}

module.exports.registerUser = function(registerUser, callback){
  console.log("In Register User");
  bcrypt.genSalt(10, (error, salt) => {
    bcrypt.hash(registerUser.password,salt, null, (error, hash) => {
      if(error){
        throw error;
      }

      registerUser.password = hash;
      registerUser.save(callback);
    });
  });
}

module.exports.comparePassword = function(loggingInUserPassword, hash, callback){
  bcrypt.compare(loggingInUserPassword, hash, (error, isCorrect) => {
    if(error) throw error;
    callback(null, isCorrect);
  });
}
