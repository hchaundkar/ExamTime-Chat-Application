var mongoose = require('mongoose');
var DiscussionRoom = mongoose.model('Rooms');
var io= require('socket.io');
var socket= io();
var nodemailer = require('nodemailer');
var mailer = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'hchaundkar@gmail.com',
            pass: 'nikunj23'
        }
    });
//creating room
module.exports.createRoom= function(req,res){
      var roomName= req.body.roomName;
      //var membername= req.body.username;
      DiscussionRoom.create({
        roomName : roomName
        //members: membername
      }, function(err, room){
        if(err){
          console.log(err);
          res.status(400).json(err);
        } else {
          console.log('Room created', room);
          res.status(200).json(room);
        }
      });
    };


    //add member to room
    module.exports.addMember= function(req,res){
      var roomName= req.body.room;
      console.log("Roomname", roomName);
      var membername= req.body.username;
      console.log("Member Name", membername);
      DiscussionRoom.update({
        roomName : roomName,
      },{'$push': {'members': membername}}).exec(function(err, room){
        if(err){
          console.log("Room not found", err);
          res.status(400).json(err);
        }else{
            res.status(200).json(room);
          }

      });
    };


    //remove member from room
    module.exports.removeMember= function(req,res){
      var roomName= req.body.room;
      console.log("Roomname", roomName);
      var membername= req.body.username;
      console.log("Member Name", membername);
      DiscussionRoom.update({
        roomName : roomName,
      },{'$pull': {'members': membername}}).exec(function(err, room){
        if(err){
          console.log("Room not found", err);
          res.status(400).json(err);
        }else{
            res.status(200).json(room);
          }

      });
    };

    //fetch all rooms
    module.exports.getAllRooms = function(req, res){
      console.log('Fetching Rooms');
      DiscussionRoom.find({}, function(err,room ) {
        if(err){
          console.log(err);
          res.status(400).json(err);
        } else {
          console.log('Rooms Fetched', room);
          //res.redirect('#!/fetchQuiz')
          res.status(200).json(room);
        }
      });
    };


  // sendInvite

  module.exports.sendInvite = function(req, res){

    var sendInviteTo= req.body.emailId;
    var roomName= req.body.roomName;
    var joinlink= 'http://localhost:3000/#!/';
    console.log("Sendto",sendInviteTo)
    var mailDetails = {
      from: 'hchaundkar@gmail.com',
      to: sendInviteTo,
      subject: 'Request To Join Discussion',
      html: '<b>Hello</b> <p> I request you to join the below discussion.<br> To join the discussion click on below link and select the Room Name as: '+roomName+'</p><br><a href="'+joinlink+'" >click here to join</a>'
  };

  mailer.sendMail(mailDetails, function(error, response){
  if(error){
     console.log(error);
     res.status(400).json(error);
  }else{
     res.status(201).json(response);
  };
  });

  };
