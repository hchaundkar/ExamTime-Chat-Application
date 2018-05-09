var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var secret ="chatapplication";
var passport = require('passport');
var LocalStrategy= require('passport-local').Strategy;

// Registering User
module.exports.register = function(req, res){
  console.log('Registering users');
  var registerUser= new User({
     firstname :req.body.firstname || null,
     lastname : req.body.lastname || null,
     emailid : req.body.emailid || null,
     username : req.body.username,
     password : req.body.password,
  });
console.log("Register new user", registerUser);
 User.registerUser(registerUser, (error, response) =>{
   if(error){
     console.log(error);
     res.status(400).json(error);
   }else{
     console.log("User Registration Successfull");
     res.status(200).json(response);
   }
 });
};

//Logging In users
module.exports.login = function(req,res){
  console.log("Logging User");
  var username = req.body.username;
  var password = req.body.password;

User.getUser(username, (error, response) =>{
  if(error){
    res.status(400).json(error);
  }
  if(!response){
     return res.status(400).json(error);
  }
  console.log("Login User Details", response);
  User.comparePassword(password, response.password,(error, isCorrect) =>{
    if(error) throw error;
    if(isCorrect){
      console.log("Entered Password is matching");
      var token= jwt.sign({data: response},secret,{ expiresIn: 604800});
      console.log("token", token);
      res.json({
        success: true,
        token: `Bearer ${token}`,
        user: {
            id: response._id,
            firstname: response.firstname,
            lastname: response.lastname,
            username: response.username,
            emailid: response.emailid
          }
      });
    }else{
      return res.status(400).json(error);
    }
  });
});
};

//Logging In using Passport
module.exports.loginPassport = function(req,res){
  console.log("Passport Login");
  var username = req.body.username;
  var password = req.body.password;
  passport.authenticate('local')(req, res, function(){
    console.log("Response:" ,res);
    res.redirect('/');
  });

};
