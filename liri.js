// DEPENDENCIES
require("dotenv").config();
var keys = require("./keys.js");
//spotify dependencies
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
//twitter dependencies
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
//omdb dependencies
var request = require("request");
//"do-what-it-says" dependencies
var fs = require("fs");

//designate commands and param
let command = process.argv[2];
let commandParams = process.argv;
commandParams.splice(0, 3);
let paramStr = commandParams.join(' ');

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

function printMovie(movie) {
  console.log("/================================================================/")
  //console.log(` "${song.name}" by ${song.artist}`)
  //console.log(` From: ${song.album}`)
  //console.log(` Listen @ ${song.link}`)
  console.log("/================================================================/")
}

function handler(command,paramStr) {
  switch (command) {

    //twitter===============================================
    case "my-tweets":
      //set req params
      var params =
        {
          screen_name: 'bimpmeister',
          count: 1,
        };
      //req
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
      //req
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
      //default to Mr. Nobody
      if (paramStr = '') {
        paramStr = "Mr. Nobody";
      }

      //req
      request("https://www.omdbapi.com/?t=" + paramStr + "&plot=short&apikey=trilogy", function (error, response, body) {

        if (error) {
          console.log(error);
        } else {
          console.log(body);

          let movie = {
            title: '',
            year: '',
            imdb: '',
            rottenTomatoes: '',
            country: '',
            language: '',
            plot: '',
            actors: ''
          }

          printMovie(movie)
        }
      });
      break;

    //random================================================
    case "do-what-it-says":

      fs.readFile('random.txt','utf8', function(error, data) {
        if (error) {
          console.log(error);
        } else {
          //split text into command and params
          dataAry = data.split(',')

          //call main handle function w/random.txt params
          handler(dataAry[0],dataAry[1].trim());
        }
      });
      break;

    default:
      console.log("No known command... Sad!");
  }
}

handler(command);