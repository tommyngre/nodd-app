require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

let command = process.argv[2];
let commandParams = process.argv;
commandParams.splice(0, 3);
let paramStr = commandParams.join(' ');

console.log("paramStr ", paramStr);

function printTweet(tweet) {
  console.log("/================================================================/")
  console.log(` ${tweet.user.name.toUpperCase()} tweeted on ${tweet.created_at}:`) 
  console.log(` "${tweet.text}"`) 
  console.log("/================================================================/")

}

function printSong(song) {
  console.log("/================================================================/")
  console.log(` "${song.name}" by ${song.artist}`) 
  console.log(` From: ${song.album}`)
  console.log(` Listen @ ${song.link}`)
  console.log("/================================================================/")
}

function handler() {
  switch (command) {

    //twitter===============================================
    case "my-tweets":
      //set request params
      var params =
        {
          screen_name: 'bimpmeister',
          count: 1,
        };
      //request
      client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
          console.log(error)
        } else {
          //print tweet deets
          tweets.forEach(tweet => {
            printTweet(tweet);
          });
        }
      });

      break;

    //spotify===============================================
    case "spotify-this-song":
      //request
      spotify.search({ type: 'track', query: paramStr }, function (err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else {
          let track = data.tracks.items[0];

          let artists = track.artists.map(x => x.name)
            .join(', ');

          let song =
            {
              artist: artists,
              name: track.name,
              link: track.external_urls.spotify,
              album: track.album.name
            }
          printSong(song);
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