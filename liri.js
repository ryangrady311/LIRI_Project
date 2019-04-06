

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require('axios')
axios.get('https://api.github.com/users/codeheaven-io');
 
var command = process.argv[2];



switch(command) {
  case 'spotify-this-song':
    console.log("SPOTIFY!!!");
var spotify = new Spotify({
  id: keys.Spotify.id,
  secret: keys.Spotify.secret
});
 
spotify.search({ type: 'track', query: 'all the small things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data.tracks.items[0]); 
console.log(data.tracks.items[0].artists[0].name);
console.log(data.tracks.items[0].name); 
console.log(data.tracks.items[0].external_urls.spotify); 
console.log(data.tracks.items[0].album.name); 

});
    break;
  case 'concert-this':
  
    console.log("CONCERT!!!");

    axios.get("https://rest.bandsintown.com/artists/Lady Gaga/events?app_id=codingbootcamp")
    .then(function (response) {
      console.log(response.data[0]);
      console.log(response.data[0].venue.name);
      console.log(response.data[0].venue.city);
      console.log(response.data[0].datetime);

    })
    .catch(function (error) {
      console.log(error);
    });
   

    break;
    case 'movie-this':
      console.log("MOVIE!!!")

    var omdbkey = keys.OMBD.id;

axios.get(" https://www.omdbapi.com/?apikey="+omdbkey+"&t=inception")
    .then(function (response) {
      console.log(response.data);

    })

     
    break;
  default:
    console.log("Not a valid command, valid commands are 'concert-this' 'spotify-this-song' and 'movie-this'");
}
