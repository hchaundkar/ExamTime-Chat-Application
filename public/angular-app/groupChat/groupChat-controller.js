angular.module('examtimechatapplication').controller('GroupChatController', GroupChatController);

function GroupChatController($http, $scope, $window, $location){
  var vm = this;
  $scope.joinRoom = function(data){
    var socket= io.connect("http://localhost:3000");
    var packet={
       username: data.username,
       room: data.room.roomName,
       message: data.chatMessage
    };
    var username= data.username;
    var room= data.room;
    var leave= data.leave;
    var send= data.send;
    var message= data.chatMessage;;
    console.log("Chat Message", data.chatMessage);
    $http.post('/api/chat/addMember', packet).then(function(result){
      console.log("Invite send ", result);
    }).catch(function(error){
      console.log(error);
    });
    console.log("Leave button value", leave);
    console.log("Send button value", send);
    console.log('In GroupChat controller', username, room.roomName, vm.chatMessage);

     if(message != null){
      socket.emit('message', packet);
      document.getElementById("message_send").value='';
    }else{
      socket.emit('join', packet);
      socket.on('new user joined', function(data){
        console.log("BroadCast data From Server", data);
        var li= document.createElement("li");
        var br= document.createElement("br")
        var message= "<span><strong>" +data.user+ ": </strong>" +data.message+ "/<span>";

        li.appendChild(document.createTextNode(data.user + ":    "+ data.message));

        document.getElementById("messages").appendChild(li);
    


      });
    }

    }

$scope.leave= function(data){
  console.log("New Leave",data);
  var socket= io.connect("http://localhost:3000");
  console.log("New Leave",data.username);
  console.log("Leave button clicked");
  var leavepacket={
    username: data.username,
    room: data.room.roomName
  }
  $http.post('/api/chat/removeMember', leavepacket).then(function(result){
    console.log("Memeber removed", result);
  }).catch(function(error){
    console.log(error);
  });
  socket.emit('leave', leavepacket);

}

$scope.inviteFriends= function(){
  window.open('http://localhost:3000/index.html#!/inviteFriends');
}

$scope.create=function(){
  //window.open('http://localhost:3000/index.html#!/createQuiz');
  $window.open("http://localhost:3000/index.html#!/createQuiz")
}

vm.sendInvite=function(){

  var data={
    roomName: vm.roomName,
    emailId: vm.emailId
  };
  $http.post('/api/chat/sendInvite', data).then(function(result){
    console.log("Invite send ", result);
    vm.message= "Invite Send";
  }).catch(function(error){
    console.log(error);
  });

}

vm.createRoom=function(){
  var roomName={
    roomName : vm.roomName
  };
  $http.post('/api/chat/createRoom', roomName).then(function(result){
    console.log("Rooms Data ", result.status);
    if(result.status== 200){
      $window.location.href = '#!/groupchat';
    }

  }).catch(function(error){
    console.log(error);
  });

}

$scope.fetchRooms= function(){
  console.log("in angular fet rooms");
    $http.get('/api/chat/getAllRooms').then(function(result){
      console.log("Rooms Data ", result);
      console.log("Room List", result.data);
      $scope.roomList= result.data;
    }).catch(function(error){
        console.log(error);
    });

    }


$scope.fetchRooms();


};
