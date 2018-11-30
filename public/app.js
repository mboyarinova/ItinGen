'use strict';

// Declare app level module which depends on views, and core components

angular.module('ItinGen', [
  'appRoutes',
	'ldButtons',
	'itineraryFactory',
	'sideBar',
  'introduction',
  'authServices'
])

.controller('itinGenController', ['$scope', '$http', 'itineraryFactory', 'Auth', function($scope, $http, itineraryFactory, Auth) {
  
  var currentItinerary = {}
  var directionsService 
  var directionsDisplay
  $scope.test = "We got it!"
  var app = this;



  if (Auth.isLoggedIn()) {
    // Check if a the token expired
    Auth.getUser().then(function(data) {
        // Check if the returned user is undefined (expired)
        console.log("HERE");
        console.log(data.data);
        if (data.data.email === undefined) {
            Auth.logout(); // Log the user out
            app.isLoggedIn = false; // Set session to false
            $location.path('/'); // Redirect to home page
        } else {
          let likeditineraries = itineraryFactory.getLikedItineraries();
          console.log(likeditineraries);
          itineraryFactory.addToLikedItineraries();
        }
    });
  }




  
     $scope.map;
     $scope.location
     $scope.displayLocation
     $scope.displayLocationLoaded = false
     

    function initMap(x, y) {
      var center = {lat: x, lng: y}
      $scope.location = {lat: x, lng: y}
     	directionsService = new google.maps.DirectionsService();
     	directionsDisplay = new google.maps.DirectionsRenderer();
      $scope.map = new google.maps.Map(document.getElementById('map'), {
	        center: center,
	        zoom: 13
        });
        directionsDisplay.setMap($scope.map);
    }
    function onPositionRecieved(position){
      var coords = position.coords;
      initMap(coords.latitude, coords.longitude);
    }
    // error if initial position not recieved
    function locationNotRecieved(positionError){
      console.log(positionError);
      // if not location, center map on Chicago
      initMap(41.881855, -87.627115);
    }

    // set position on map when position tracking coords received
    function watchCoordinatesRecieved(pos) {
      var coords = pos.coords
      marker.setPosition({lat: coords.latitude, lng: coords.longitude})
    }

    // begin watch position for movement tracking
    function beginPositionWatch() {
      navigator.geolocation.watchPosition(watchCoordinatesRecieved, locationTrackNotRecieved, options)
    }

    // Check if DOM navigator object exists
    (function init() {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onPositionRecieved, locationNotRecieved);
      }
    })()


	function drawNewItinerary() {
	  	var waypoints = []
	  	for (event in currentItinerary) {
	  		var index = parseInt(event) + 1
	  		if (index != currentItinerary.length)
	  			waypoints.push({location: currentItinerary[index].venue.latlng}) 
	  	}

	  	var directionRequest = {
			origin: currentItinerary[0].venue.latlng,
			destination: currentItinerary[currentItinerary.length - 1].venue.latlng,
			travelMode: 'DRIVING',
			waypoints: waypoints
	  	}
	  	directionsService.route(directionRequest, function(result, status) {
	  		if (status == 'OK') {
	  			directionsDisplay.setDirections(result)
	  		}
	  	})
	  	
	  }

	  $scope.updateMapWithNewItinerary = async function() {
	  	currentItinerary = itineraryFactory.getNewItinerary()
	  	await drawNewItinerary()
	  	$scope.$broadcast('update')
	  }
}])

.controller('facebookCtrl', function($routeParams, Auth, $location) {
  console.log($routeParams.token);
  Auth.socialMedia($routeParams.token);
  $location.path('/'); 
})

.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptors');
})




