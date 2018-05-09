require('./api/models/db.js');
var express = require('express');
var app = express();
var path = require('path');
var User=require('./api/models/user-model.js')
var http = require('http').Server(app);
var routes = require('./api/routes');
var bodyParser = require('body-parser');
var io= require('socket.io')(http);
var passport= require('passport');
var jwt = require('jsonwebtoken');
var secret ="chatapplication";
var LocalStrategy= require('passport-local').Strategy;

app.set('port', 3000);

app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
//passport.use(new LocalStrategy(User.authenticate()));
passport.use('login',new LocalStrategy(
function(username, password, done) {
  var username1= username;
  console.log("Authenticating using passport", username);
  User.getUser(username, function (error, response) {
    if (error) {
      return done(error);
     }
    if (!response) {
      return done(null, false, {message:'User not found'});
    }
    console.log("User Response", response);
    User.comparePassword(password, response.password,function(error, isCorrect){
      if(error) {
        console.log("Error", error);
        throw error;
      }
      if(isCorrect){
        console.log("Entered Password is matching");
        var token= jwt.sign({data: response},secret,{ expiresIn: 3600});
        console.log("token", token);
        done("token");

      }
    })
    return done(null, response);
})
}));

app.use('/api', routes);

io.on('connection', function(socket){
  console.log(' new user connected');
  socket.on('chat message', function(msg){
    console.log("Client Message", msg);
    io.emit('chat message', msg);
  });

  socket.on('join', function(data){
    console.log("user requested to join a room");
    socket.join(data.room);
    socket.broadcast.to(data.room).emit('new user joined',{user: data.username, message:'has joined this room'});
  });

  socket.on('leave', function(data){
    console.log("user requested to leave a room", data.username, data.room);

    socket.broadcast.to(data.room).emit('new user joined',{user: data.username, message:'has left this room', left: true});

  
    socket.leave(data.room);
  });

  socket.on('message', function(data){
    console.log("Message sent by user", data.username, data.message);
    io.in(data.room).emit('new user joined', {user:data.username, message: data.message});

  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});




http.listen(3000, function(){
  console.log('listening to port:3000');
});
