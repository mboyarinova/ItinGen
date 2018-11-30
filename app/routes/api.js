var User = require("../models/user");
var Itinerary = require("../models/itinerary");
var mongoose = require("mongoose");
var spawn = require("child_process").spawn;
var app = require("express");
var jwt = require('jsonwebtoken'); // Import JWT Package
var router = app.Router();
var secret = 'itingen'; // Create custom secret to use with JWT

var oneItin = [[{'_id': mongoose.Types.ObjectId('5c00a923598dfe6df780eeb9'), 'tags': ['hookah_bars', 'nightlife', 'vapeshops', 'nightlife', 'tobaccoshops', 'nightlife'], 'venue_id': 'yelp0-1Vds_QPGLm_Y-TkTe81g', 'event_name': 'Smokes & Vapes', 'event_id': 'yelp0-1Vds_QPGLm_Y-TkTe81g', 'mon_start': 540, 'mon_end': 1260, 'tues_start': 540, 'tues_end': 1260, 'wed_start': 540, 'wed_end': 1260, 'thurs_start': 540, 'thurs_end': 1260, 'fri_start': 540, 'fri_end': 1260, 'sat_start': 540, 'sat_end': 1260, 'sun_start': 540, 'sun_end': 1260, 'price': -10, '__v': 0}, {'_id': mongoose.Types.ObjectId('5c00a925598dfe6df7810e85'), 'venue_id': 'yelp0-1Vds_QPGLm_Y-TkTe81g', 'venue_name': 'Smokes & Vapes', 'latitude': 41.8208815902472, 'longitude': -87.802647203207, 'address1': '3914 Harlem Ave', 'address2': '', 'address3': '', 'city': 'Berwyn', 'state': 'IL', 'zip_code': '60402', '__v': 0}, 569, 659], [{'_id': mongoose.Types.ObjectId('5c00a923598dfe6df780e9cc'), 'tags': ['newamerican', 'nightlife', 'breakfast_brunch', 'nightlife', 'divebars', 'nightlife'], 'venue_id': 'yelpU0srsr4F2BxU_5599fsHUg', 'event_name': 'Jefferson Park Grill', 'event_id': 'yelpU0srsr4F2BxU_5599fsHUg', 'mon_start': 300, 'mon_end': 1260, 'tues_start': 300, 'tues_end': 1260, 'wed_start': 300, 'wed_end': 1260, 'thurs_start': 300, 'thurs_end': 1260, 'fri_start': 300, 'fri_end': 1260, 'sat_start': 360, 'sat_end': 900, 'sun_start': 0, 'sun_end': 0, 'price': -1, '__v': 0}, {'_id': mongoose.Types.ObjectId('5c00a924598dfe6df7810703'), 'venue_id': 'yelpU0srsr4F2BxU_5599fsHUg', 'venue_name': 'Jefferson Park Grill', 'latitude': 41.9704818725586, 'longitude': -87.7627716064453, 'address1': '5364 W Gale St', 'address2': '', 'address3': '', 'city': 'Chicago', 'state': 'IL', 'zip_code': '60630', '__v': 0}, 690, 780], [{'_id': mongoose.Types.ObjectId('5c00a923598dfe6df780e7e0'), 'tags': ['empanadas', 'nightlife', 'creperies', 'nightlife', 'icecream', 'nightlife'], 'venue_id': 'yelpfLfZI4FtJhOT0U7NzfVr-Q', 'event_name': 'Bistro 6050', 'event_id': 'yelpfLfZI4FtJhOT0U7NzfVr-Q', 'mon_start': 960, 'mon_end': 1350, 'tues_start': 960, 'tues_end': 1350, 'wed_start': 720, 'wed_end': 1350, 'thurs_start': 720, 'thurs_end': 1350, 'fri_start': 720, 'fri_end': 1380, 'sat_start': 720, 'sat_end': 1380, 'sun_start': 720, 'sun_end': 1140, 'price': -1, '__v': 0}, {'_id': mongoose.Types.ObjectId('5c00a924598dfe6df7810364'), 'venue_id': 'yelpfLfZI4FtJhOT0U7NzfVr-Q', 'venue_name': 'Bistro 6050', 'latitude': 41.953133, 'longitude': -87.778753, 'address1': '6050 W Irving Park Rd', 'address2': '', 'address3': None, 'city': 'Chicago', 'state': 'IL', 'zip_code': '60634', '__v': 0}, 784, 914], [{'_id': mongoose.Types.ObjectId('5c00a923598dfe6df780eace'), 'tags': ['seafoodmarkets', 'seafood', 'scandinavian'], 'venue_id': 'yelpArFuhXxp9n0_pGlbYY8_zA', 'event_name': "Hagen's Fish Market", 'event_id': 'yelpArFuhXxp9n0_pGlbYY8_zA', 'mon_start': 480, 'mon_end': 1320, 'tues_start': 480, 'tues_end': 1320, 'wed_start': 480, 'wed_end': 1320, 'thurs_start': 480, 'thurs_end': 1320, 'fri_start': 480, 'fri_end': 1380, 'sat_start': 480, 'sat_end': 1320, 'sun_start': 600, 'sun_end': 1200, 'price': -2, '__v': 0}, {'_id': mongoose.Types.ObjectId('5c00a924598dfe6df78104cd'), 'venue_id': 'yelpArFuhXxp9n0_pGlbYY8_zA', 'venue_name': "Hagen's Fish Market", 'latitude': 41.96019, 'longitude': -87.76876, 'address1': '5635 W Montrose Ave', 'address2': '', 'address3': '', 'city': 'Chicago', 'state': 'IL', 'zip_code': '60634', '__v': 0}, 916, 1026], [{'_id': mongoose.Types.ObjectId('5c00a923598dfe6df780ec38'), 'tags': ['grocery', 'gourmet'], 'venue_id': 'yelpw_Eh8zL9UwNWsnTHk-MQCg', 'event_name': 'Fresh Farms International Market', 'event_id': 'yelpw_Eh8zL9UwNWsnTHk-MQCg', 'mon_start': 420, 'mon_end': 1320, 'tues_start': 420, 'tues_end': 1320, 'wed_start': 420, 'wed_end': 1320, 'thurs_start': 420, 'thurs_end': 1320, 'fri_start': 420, 'fri_end': 1320, 'sat_start': 420, 'sat_end': 1320, 'sun_start': 420, 'sun_end': 1320, 'price': -1, '__v': 0}, {'_id': mongoose.Types.ObjectId('5c00a924598dfe6df7810baf'), 'venue_id': 'yelpw_Eh8zL9UwNWsnTHk-MQCg', 'venue_name': 'Fresh Farms International Market', 'latitude': 41.9978866577148, 'longitude': -87.6957244873047, 'address1': '2626 W Devon Ave', 'address2': None, 'address3': '', 'city': 'Chicago', 'state': 'IL', 'zip_code': '60659', '__v': 0}, 1039, 1189], [{'_id': mongoose.Types.ObjectId('5c00a923598dfe6df780f4bb'), 'tags': [''], 'venue_id': 'EB_27848995', 'event_name': "Nature's 10 Secrets to Staying Healthy for the Holidays!", 'event_id': 'EB_52408027822', 'start': 1110, 'end': 1230, 'date': '11-13-2018', 'price': 0, '__v': 0}, {'_id': mongoose.Types.ObjectId('5c00a924598dfe6df7810028'), 'venue_id': 'EB_27848995', 'venue_name': '2112 Chicago', 'latitude': 41.9583542, 'longitude': -87.74412710000001, 'address1': '4245 N Knox Ave', 'address2': '', 'address3': '', 'city': 'Chicago', 'state': 'Il', 'zip_code': '60641', '__v': 0}, 1200, 1230], [{'_id': mongoose.Types.ObjectId('5c00a923598dfe6df780f184'), 'tags': ['mexican', 'misc', 'breakfast_brunch', 'misc', 'cocktailbars', 'misc'], 'venue_id': 'yelp6a_deomxlTJf4oXKxnAG3Q', 'event_name': 'Mas Alla Del Sol', 'event_id': 'yelp6a_deomxlTJf4oXKxnAG3Q', 'mon_start': 960, 'mon_end': 1320, 'tues_start': 960, 'tues_end': 1320, 'wed_start': 960, 'wed_end': 1320, 'thurs_start': 960, 'thurs_end': 1380, 'fri_start': 600, 'fri_end': 1380, 'sat_start': 600, 'sat_end': 1260, 'sun_start': 0, 'sun_end': 0, 'price': -2, '__v': 0}, {'_id': mongoose.Types.ObjectId('5c00a924598dfe6df78103fb'), 'venue_id': 'yelp6a_deomxlTJf4oXKxnAG3Q', 'venue_name': 'Mas Alla Del Sol', 'latitude': 41.9884118474889, 'longitude': -87.6604411700977, 'address1': '5848 N Broadway St', 'address2': '', 'address3': '', 'city': 'Chicago', 'state': 'IL', 'zip_code': '60660', '__v': 0}, 1244, 1380]]


router.post('/getitinerary', function(req, res) {
	var userSettings = req.body.settings;
	console.log(userSettings);
	var startTime = userSettings.startTime;
	var startLocation = userSettings.startLocation;
	var lat = startLocation.lat;
	var lon = startLocation.lon;
	var free = userSettings.free;
	var radius = userSettings.radius;
	var transport = userSettings.transport;
	res.json({success: true, itinerary: oneItin});
	// var pythonProcess = spawn('py',["script.py", "startTime", startTime, 
	// 									"lat", lat, "lon", lon, "free", 
	// 									free, "radius", radius, "transport", transport]);
	// pythonProcess.stdout.on('data', (data) => {
	// 	// Do something with the data returned from python script

	// 	console.log("GOT DATA");
	// 	console.log(data);
	});



// Middleware for Routes that checks for token - Place all routes after this route that require the user to already be logged in
router.use(function(req, res, next) {
	var token = req.body.token || req.body.query || req.headers['x-access-token']; // Check for token in body, URL, or headers

	// Check if token is valid and not expired  
	if (token) {
		// Function to verify token
		jwt.verify(token, secret, function(err, decoded) {
			if (err) {
				res.json({ success: false, message: 'Token invalid' }); // Token has expired or is invalid
			} else {
				req.decoded = decoded; 
				next(); // Required to leave middleware
			}
		});
	} else {
		res.json({ success: false, message: 'No token provided' }); // Return error if no token was provided in the request
	}
});

// Route to get the currently logged in user    
router.post('/me', function(req, res) {
	console.log("in /me");
	console.log(req.decoded);
	res.send(req.decoded); // Return the token acquired from middleware
});

// Route to get users liked itineraries
router.get('/getliked', function(req, res) {
	console.log("GOT HERE");
	User.findOne({ email: req.decoded.email}).exec(function(err, user) {
		if (err) {
			res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });	
		} else {
			if (!user) {
				console.log("IN HEREz");
				res.json({ success: false, message: 'No user was found' }); // Return error
			} else {
				if(user.liked.length > 0){
					res.json({ success: true, message: 'found itineraries', itineraries: user.liked});
				} else {
					console.log("IN HEREz");
					res.json({success: false, message: 'No itineraries were found'});	
				}
			}	
		}
	});
});

// Route to append to a users like itineraries
router.post('/putliked', (req, res) => {
	var itins = req.body.itineraries;
	var userEmail = req.decoded.email;
	let user = new User();
	user.liked = itins;
	user.userEmail = userEmail;
	User.findOneAndUpdate({email : userEmail}, user, function(err) {
		if (err) { 
			res.json({success : false});
			return; 
		}
		res.json({success : true});
	});
});

module.exports = router;