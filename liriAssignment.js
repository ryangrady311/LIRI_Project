
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: '11de402ab10549c6b53cb4a40a5cc9be',
  secret: 'e84fc80ea4444170a77465acf02d7753'
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