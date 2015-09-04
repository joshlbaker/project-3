
var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

$ionicPlatform.ready,
angular.module('starter', ['ionic','ngCordova','starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
 
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "menu.html",
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "browse.html"
        }
      }
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});


app.controller("MediaCtrl", function($scope, $cordovaMedia) 

  {

    var src = "soundPlanet/www/audio/audio.mp3";
    var media = $cordovaMedia.newMedia(src);


    var iOSPlayOptions = {
      numberOfLoops: 2,
      playAudioWhenScreenIsLocked : false
    }

    media.play(options); // iOS only!
    media.play(); // Android

    media.pause();

    media.stop();

    media.release();

    media.seekTo(5000); // milliseconds value

    media.setVolume(0.5);

    media.startRecord();

    media.stopRecord();

    // media.getDuration(media); not working yet

    // media.getCurrentPosition().then(...); not working yet
  });

// });




