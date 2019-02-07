// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ui.router'])
  
  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs).
      // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
      // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
      // useful especially with forms, though we would prefer giving the user a little more room
      // to interact with the app.
      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }
      
      if (window.StatusBar) {
        // Set the statusbar to use the default style, tweak this to
        // remove the status bar on iOS or change it to use white instead of dark colors.
        StatusBar.styleDefault();
      }
    });
  })
  
  .config(function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html',
        controller: 'HomeController'
      })
      .state('notifications', {
        url: '/notifications',
        templateUrl: 'notifications.html',
        controller: 'NotificationsController'
      });
    
    $urlRouterProvider.otherwise("/");
    
  })
  
  .controller('HomeController', function ($scope, $state) {
    $scope.state = $state;
    
    $scope.changePage = function (page) {
      $state.go(page);
    }
  })
  
  .controller('NotificationsController', function ($scope, $stateParams, $ionicHistory, $http) {
    $http.get('http://localhost:8000/api/messages')
      .then(function (res) {
        $scope.messages = res.data.messages;
      });
    
    $scope.goBack = function () {
      $ionicHistory.goBack();
    }
  })
