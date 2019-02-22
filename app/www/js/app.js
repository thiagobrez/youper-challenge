// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ui.router', 'ngCordova'])
  
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
  
  .controller('AppController', function ($scope, $state, $location, $ionicNavBarDelegate) {
    firebase.initializeApp({
      apiKey: "AIzaSyBbki1h7LgwhrFe1Ukn9GP2C16AKr9nE7c",
      authDomain: "youper-challenge-8e39c.firebaseapp.com",
      databaseURL: "https://youper-challenge-8e39c.firebaseio.com",
      projectId: "youper-challenge-8e39c",
      storageBucket: "youper-challenge-8e39c.appspot.com",
      messagingSenderId: "644755206912"
    });
  
    firebase.auth().signInAnonymously()
      .catch(err => alert('Error authenticating with firebase'));
    
    if ($location.path().indexOf('submit') !== -1) {
      $ionicNavBarDelegate.showBackButton(false);
    } else {
      $ionicNavBarDelegate.showBackButton(true);
    }
  })
  
  .controller('HomeController', function ($scope, $state, $cordovaImagePicker, $cordovaFile) {
    $scope.state = $state;
    
    $scope.changePage = page => $state.go(page);
    
    const saveToFirebase = (imageBlob, filename) => {
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child('images/' + filename).put(imageBlob, {contentType: 'image/jpeg'});
      
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {},
        error => alert(error.message),
        () => uploadTask.snapshot.ref.getDownloadURL()
          .then(downloadURL => $scope.$apply($scope.avatarPath = downloadURL)));
    };
    
    $scope.chooseAvatar = () => {
      const options = {
        maximumImagesCount: 1,
        width: 80,
        height: 80,
        quality: 80
      };
      
      $cordovaImagePicker.getPictures(options)
        .then(
          success => {
            const filename = success[0].replace(/^.*[\\\/]/, '');
      
            $cordovaFile.readAsArrayBuffer(cordova.file.tempDirectory, filename)
              .then(
                success => {
                  const imageBlob = new Blob([success], {type: 'image/jpeg'});
                  
                  saveToFirebase(imageBlob, filename);
                  
                  $cordovaFile.copyFile(cordova.file.tempDirectory, filename, cordova.file.dataDirectory, filename)
                    .then(
                      success => {},
                      error => alert('Error copying image')
                    );
                },
                error => alert('Error reading image')
              );
          },
          error => alert('Error picking image')
        );
    }
  })
  
  .controller('NotificationsController', function ($scope, $stateParams, $ionicHistory, $http) {
    $http.get('http://localhost:8000/api/messages')
      .then(res => $scope.messages = res.data.messages);
    
    $scope.goBack = () => $ionicHistory.goBack();
  });
