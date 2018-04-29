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
let border = "*-----------------------------------------------------------------*";

let log = 'log.txt';

function logResult(result) {
  fs.appendFile(log, result, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Results logged")
    }
  });
}

function printTweet(tweet) {
  let result = `  ${tweet.user.name.toUpperCase()} tweeted on ${tweet.created_at}:
    "${tweet.text}"
${border}  
`;

  return result;
}

function printSong(song) {
  let result = `COMMAND: ${command} ${paramStr}
${border}
  SONG: "${song.name}" by ${song.artist}
    From the album: ${song.album}

    Preview @ ${song.link}
${border}

`;

  console.log(result);

  logResult(result);
}

function printMovie(movie) {
  let result = `COMMAND: ${command} ${paramStr}
${border}
  MOVIE: "${movie.title}" (${movie.year}), Country: ${movie.country}, Language: ${movie.language}
     
  PLOT: ${movie.plot}
    
  ACTORS: ${movie.actors}
     
  RATINGS: ${movie.imdb} ; ${movie.rottenTomatoes}
${border}

`;

  console.log(result);

  logResult(result);
}

function handler(command, paramStr) {

  switch (command) {

    //TWITTER
    case "my-tweets":
      //set req params
      var params =
        {
          screen_name: 'bimpmeister',
          count: 20,
        };
      //req
      client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
          console.log(error)
        } else {
          //print tweet deets

          let result = `COMMAND: ${command} ${paramStr}
${border}
`;

          tweets.forEach(tweet => {
            result += printTweet(tweet);
          });

          //carriage return
          result += `
`;
          console.log(result);
          logResult(result);
        }
      });
      break;

    //SPOTIFY
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

    //OMDB
    case "movie-this":
      //default to Mr. Nobody
      if (paramStr == '') {
        paramStr = "Mr. Nobody";
      }

      //req
      let url = "https://www.omdbapi.com/?t=" + paramStr + "&apikey=trilogy";

      request(url, function (error, response, body) {

        if (error) {
          return;
        } else {
          let obj = JSON.parse(body);

          let imdb = '';
          let rottenTomatoes = '';

          obj.Ratings.forEach(rating => {
            if (rating.Source == "Internet Movie Database") {
              imdb = obj.Ratings.indexOf(rating);
            }
            else if (rating.Source == "Rotten Tomatoes") {
              rottenTomatoes = obj.Ratings.indexOf(rating);
            }
          })

          let movie = {
            title: obj.Title,
            year: obj.Year,
            imdb: 'IMDB: ' + obj.Ratings[imdb].Value,
            rottenTomatoes: 'Rotten Tomatoes: ' + obj.Ratings[rottenTomatoes].Value,
            country: obj.Country,
            language: obj.Language,
            plot: obj.Plot,
            actors: obj.Actors,
          }

          printMovie(movie);
        }
      });
      break;

    //RANDOM.TXT
    case "do-what-it-says":

      fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
          console.log(error);
        } else {
          //split text into command and params
          dataAry = data.split(',')

          //call main handle function w/random.txt params
          handler(dataAry[0], dataAry[1].trim());
        }
      });
      break;

    default:
      let result = `COMMAND: ${command} ${paramStr}
${border}
 "No known command. Sad!"
${border}

`;
      console.log(result);
      logResult(result);
  }
}

handler(command, paramStr);