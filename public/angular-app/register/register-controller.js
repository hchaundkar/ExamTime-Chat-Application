angular.module('examtimechatapplication').controller('RegisterController', RegisterController);

function RegisterController($http,$location, $window){
  var vm = this;

  vm.register = function(){
    var user = {
      firstname: vm.firstname,
      lastname: vm.lastname,
      emailid: vm.emailid,
      username: vm.username,
      password: vm.password
    };

    if(!vm.username || !vm.password){
      vm.error = 'Please enter username and password.';
    } else {
      if(vm.password !== vm.passwordRepeat){
        vm.error = 'Please verify the password matches';
      } else {
        $http.post('/api/users/register', user).then(function(result){
          console.log(result.data.success);
          if(result.data.success== true){
            console.log("Registration Successfull");
            $window.location.href = '#!/login';
            vm.message = 'Your registration is successful, please login.';
            vm.error = '';
          }

        }).catch(function(error){
          console.log(error);
        })
      }
    }
  }

};
