require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

let command = process.argv[2];
let commandParams = process.argv;
commandParams.splice(0,3);
let paramStr = commandParams.join(' ');

console.log("paramStr ",paramStr);

function handler() {
  switch (command) {

    //twitter===============================================
    case "my-tweets":
      //set request params
      var params =
        {
          screen_name: 'bimpmeister',
          count: 10,
        };
      //request
      client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
          console.log(error)
        } else {
          //print tweet deets
          tweets.forEach(tweet => {
            console.log(tweet.text);
          });
        }
      });

      break;

    //spotify===============================================
    case "spotify-this-song":
      //request
      spotify.search({ type: 'track', query: paramStr }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else { 
          console.log(data.tracks.items[0]);

          let track = data.tracks.items[0];
          //let artists ==

          let song = 
          {
            artist: '',
            song: track.name,
            link: track.external_urls[0],
            album: track.album.name
          }

        } 
      });
      break;

    //omdb==================================================
    case "movie-this":

      break;

    //random================================================
    case "do-what-it-says":

      break;

    default:
      console.log("No command... Sad!");
  }
}


//liri should take these commands
///my-tweets
///spotify-this-song
///movie-this
///do-what-it-says

handler(command);