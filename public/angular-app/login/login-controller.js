angular.module('examtimechatapplication').controller('LoginController', LoginController);

function LoginController($http,$location, $window,jwtHelper, $scope){
  var vm = this;

  vm.login = function () {
    if(vm.username && vm.password) {
    var user = {
      username: vm.username,
      password: vm.password
      };

    $http.post('/api/users/login', user).then(function(response){
      console.log("Login response", response.status);
      if(response.data.success){
        console.log("After Logging", response);
        console.log("JWT token", response.data.user.id);
        localStorage.setItem('currentUser', JSON.stringify({token: response.data.token, username: response.data.user.username , userid: response.data.user.id}));
                var currentUser= JSON.parse(localStorage.getItem('currentUser'));
        var token= currentUser.token;
        var username= currentUser.username;

        vm.loggedInUser = username;
        console.log("Logged User", vm.loggedInUser);

        $window.open("http://localhost:3000/index.html#!/main")
      }
    }).catch(function(error){

      console.log(error);
    })
    }
  }



};
