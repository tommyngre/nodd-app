require("dotenv").config();
var keys = require("./keys.js");

//import keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//liri should take these commands
///my-tweets
///spotify-this-song
///movie-this
///do-what-it-says
