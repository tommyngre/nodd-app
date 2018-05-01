# node-app
node-app executes 4 different commands, each with different parameters:

### my-tweets
No parameters.

Returns tweets for a twitter account which authenticates via keys in a .env file which export to keys.js.

Tweets are formatted like so:
```
COMMAND: my-tweets 
*-----------------------------------------------------------------*
  BIMPMEISTER tweeted on Sat Apr 21 20:23:00 +0000 2018:
    "That I may detect the inmost force
Which binds the world, and guides its course;
Its germs, productive powers explo… https://t.co/oleb5NslZN"
*-----------------------------------------------------------------*  
```

### spotify-this-song
One parameter which represents a song title.

`spotify-this-song all the things she said` calls the spotify API search method for the iconic t.A.T.u. song "All The Things She Said." It requires a spotify account which authenticates via keys in a .env file which export to keys.js.

It's return is formatted like so:
```
COMMAND: spotify-this-song all the things she said
*-----------------------------------------------------------------*
  SONG: "All The Things She Said" by t.A.T.u.
    From the album: 200 KM/H In The Wrong Lane (10th Anniversary Edition)

    Preview @ https://open.spotify.com/track/4bJygwUKrRgq1stlNXcgMg
*-----------------------------------------------------------------*
```

### movie-this
One parameter which represents a movie title.

`movie-this the matrix` queries the Open Movie Database using the request npm package for information about the movie The Matrix. 

It returns is formatted like:
```
COMMAND: movie-this the matrix
*-----------------------------------------------------------------*
  MOVIE: "The Matrix" (1999), Country: USA, Language: English
     
  PLOT: A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.
    
  ACTORS: Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving
     
  RATINGS: IMDB: 8.7/10 ; Rotten Tomatoes: 87%
*-----------------------------------------------------------------*
```

### do-what-it-says
No parameters.

`do-what-it-says` reads a command from a text file, random.txt, which currently contains this comma-delimited command and parameter (`spotify-this-song,"I Want it That Way"`). As such, its return resembles the `spotify-this-song` return:
```
COMMAND: do-what-it-says 
*-----------------------------------------------------------------*
  SONG: "I Want It That Way" by Backstreet Boys
    From the album: The Hits--Chapter One

    Preview @ https://open.spotify.com/track/6e40mgJiCid5HRAGrbpGA6
*-----------------------------------------------------------------*
```

### Unknown commands
Return something like this:

```
COMMAND: m.ovie-this the matrix
*-----------------------------------------------------------------*
 "No known command. Sad!"
*-----------------------------------------------------------------*
```

## Dependencies
1. https://www.npmjs.com/package/node-spotify-api
2. https://www.npmjs.com/package/twitter
3. https://www.npmjs.com/package/request
4. https://www.npmjs.com/package/dotenv