// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  //Back button listener
  $ionicPlatform.onHardwareBackButton(function(event){
    if($ionicHistory.currentStateName() == "welcome"){
      ionic.Platform.exitApp();
    }
    else{
      $ionicHistory.goBack();
    }
  }, 100);
})

// Disable Animation
.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.transition('none');
})

// UI Routers
.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('welcome',{
      cache:false,
      url:"/welcome",
      templateUrl:"welcome.html"   
    })
    .state('upload_images', {
      url: "/upload_images",
      templateUrl: "upload_images.html",
    })
    .state('user_signin', {
      cache:false,
      url:"/user_signin",
      templateUrl:"user/signin.html"   
    })
    .state('user_register', {
      cache:false,
      url:"/user_register",
      templateUrl:"user/register.html"
    })
    .state('stylist_signin',{
      cache:false,
      url:"/stylist_signin",
      templateUrl:"stylist/signin.html"
    })
    .state('stylist_register', {
      cache:false,
      url:"/stylist_register",
      templateUrl:"stylist/register.html"   
    })
    .state('user_main', {
      cache:false,
      url:"/user_main",
      templateUrl:"user/user_main.html",    
      controller: "user_main_controller"
    })
    .state('user_recommend', {
      cache:false,
      url:"/user_recommend",
      templateUrl:"user/user_recommend.html"             
    })    
    .state('stylist_main',{
      cache:false,
      url:"/stylist_main",
      templateUrl:"stylist/stylist_main.html",   
      controller: "stylist_main_controller"  
    })
    ;

    $urlRouterProvider.otherwise("/welcome");
})

.controller("user_main_controller", [function(){

}])
.controller("stylist_main_controller", ['$scope', '$ionicPopup', function($scope, $ionicPopup){
  $scope.clientList = [
    {
      name: "ClientName1",
      imgUrl: "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-finn.png",
      notes: "How you say broke in Spanish"
    },
    {
      name: "ClientName2",
      imgUrl: "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-finn.png",
      notes: "Client 2 is here"
    },
    {
      name: "ClientName3",
      imgUrl: "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-finn.png",
      notes: "Client 3 is herebababab"
    },
  ];

  $scope.addUser = function(){
    var popUp = $ionicPopup.show({
      template:"<input type='text' ng-model='data.model'>",
      title: "Title",
      subTitle: "Subtitle",
      scope: $scope,
      buttons:[
        {
          text:"Cancel"
        },
        {
          text:"Add User",
          type: "button-positive",
          onTap: function(e){
            if(!$scope.data.model){
              e.preventDefault();
            }else{
              return $scope.data.model;
            }
          }
        },
        ]
    });
    var newClient = {
      name: $scope.data.model,
      imgUrl: "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-finn.png",
      notes: "adding new client"
    };
    $scope.clientList.push(newClient);
  };

  $scope.edit = function() {
    $scope.delete_button = !$scope.delete_button;
  }

}])

.controller("user_signin_controller", ['$scope', '$location' , function($scope, $location){

  $scope.formSubmit = function(){

    $location.path("/user_main");
  }

}])

.controller("user_register_controller", ['$scope', '$location' , function($scope, $location){

  $scope.formSubmit = function(){
    $location.path("/user_main");
  };

  $scope.isValid = function(){
    if($scope.pword != $scope.re_pword){
      return false;
    }
    else{
      return true;
    }
  };

}])
.controller("stylist_signin_controller", ['$scope', '$location' , function($scope, $location){

  $scope.formSubmit = function(){
    $location.path("/stylist_main");
  }

}])
.controller("stylist_register_controller", ['$scope', '$location' , function($scope, $location){

  $scope.formSubmit = function(){
    $location.path("/stylist_main");
  }

}])
.service("network", function(){
  this.checkConnection = function(){
    var networkState = navigator.connection.type;

    var states = {};
   states[Connection.UNKNOWN]  = 'Unknown connection';
   states[Connection.ETHERNET] = 'Ethernet connection';
   states[Connection.WIFI]     = 'WiFi connection';
   states[Connection.CELL_2G]  = 'Cell 2G connection';
   states[Connection.CELL_3G]  = 'Cell 3G connection';
   states[Connection.CELL_4G]  = 'Cell 4G connection';
   states[Connection.CELL]     = 'Cell generic connection';
   states[Connection.NONE]     = 'No network connection';

   //alert('Connection type: ' + states[networkState]);
  };
})
.factory('Camera', function($q){
  return {
    getPicture: function(options){
      var q = $q.defer();
      navigator.camera.getPicture(function(result){
        q.resolve(result);
      },
      function(err){
        q.reject(err);
      },
      options);

      return q.promise;
    }
  }
})
.controller("images_controller", ["$scope", "Camera", function($scope, Camera){
  $scope.replaceURI = "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-finn.png";

  $scope.takePhoto = function(){
    var options = {
      quality:75,
      // destinationType: Camera.DestinationType.FILE_URI,
      // sourceType: Camera.PictureSourceType.CAMERA,
      // mediaType: Camera.MediaType.PICTURE,
      // allowEdit: true,
      // correctOrientation: true
      targetWidth: 200,
      targetHeight: 200,
      sourceType: 1
    };

    Camera.getPicture(options).then(function(imageData){
      $scope.imgURI = imageData;
    },
    function(err){
      console.log(err);
    });
    // var func = createNewFileEntry;
    // navigator.camera.getPicture(function cameraSuccess(imageUri){
    //   $scope.imgURI = imageUri;
    //   func(imageUri);
    // }, function cameraError(err){

    // }, options); 
  };

}])
;



