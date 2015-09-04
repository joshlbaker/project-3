
var app = angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

// $ionicPlatform.ready,
// angular.module('starter', ['ionic','ngCordova','starter.controllers'])

// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
 
//     if (window.cordova && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if (window.StatusBar) {
//       // org.apache.cordova.statusbar required
//       StatusBar.styleDefault();
//     }
//   });
// })

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


app.controller("MediaCtrl", function($scope, $cordovaMedia) { 

  function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

  $(function() {
      $("form").on("submit", function(e) {
         e.preventDefault();
         // prepare the request
         var request = gapi.client.youtube.search.list({
              part: "snippet",
              type: "video",
              q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
              maxResults: 3,
              order: "viewCount",
              publishedAfter: "2015-01-01T00:00:00Z"
         }); 
         // execute the request
         request.execute(function(response) {
            var results = response.result;
            $("#results").html("");
            $.each(results.items, function(index, item) {
              $.get("tpl/item.html", function(data) {
                  $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
              });
            });
            resetVideoHeight();
         });
      });
      
      $(window).on("resize", resetVideoHeight);
  });

  function resetVideoHeight() {
      $(".video").css("height", $("#results").width() * 9/16);
  }

  function init() {
      gapi.client.setApiKey("AIzaSyDsRwiLO7a5XTXAJrGoClmuZ765NpDygHc");
      gapi.client.load("youtube", "v3", function() {
          // yt api is ready
      });
  }

});




