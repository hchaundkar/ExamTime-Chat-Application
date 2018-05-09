angular.module('examtimechatapplication', ['ngRoute','angular-jwt']).config(config);

function config($httpProvider, $routeProvider) {


  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/main/home.html',

      access: {
        restricted: false
      }
    })
    .when('/main', {
      templateUrl: 'angular-app/main/main.html',

      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })

    .when('/contact', {
      templateUrl: 'angular-app/main/contact.html',

      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/register', {
      templateUrl: 'angular-app/register/register.html',
      controller: RegisterController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })

    .when('/registeredUser', {
      templateUrl: 'angular-app/register/registeredUser.html',
      controller: RegisterController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/groupChat', {
      templateUrl: 'angular-app/groupChat/groupChat.html',
      controller: GroupChatController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })

    .when('/createRoom', {
      templateUrl: 'angular-app/groupChat/createRoom.html',
      controller: GroupChatController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })

    .when('/inviteFriends', {
      templateUrl: 'angular-app/groupChat/inviteFriends.html',
      controller: GroupChatController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })

  .when('/groupchat', {
      templateUrl: 'angular-app/groupChat/groupChat.html',
      controller: GroupChatController,
      controllerAs: 'vm',
      access: {
        restricted: false
      }
    })
    .when('/createQuiz', {
      templateUrl: 'angular-app/createQuiz/createQuiz.html',
      controller: CreateQuizController,
      controllerAs: 'vm',
      access: {
        restricted: true
      }
    })
    .when('/fetchQuiz', {
      templateUrl: 'angular-app/displayQuiz/displayQuiz.html',
      controller: CreateQuizController,
      controllerAs: 'vm',
      access: {
        restricted: true
      }
    })
    .when('/login', {
      templateUrl: 'angular-app/login/login.html',
      controller: LoginController,
      controllerAs: 'vm',
      access: {
        restricted: true
      }
    })





    .otherwise({
      redirectTo: '/'
    });
}
