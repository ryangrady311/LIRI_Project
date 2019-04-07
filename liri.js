

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var axios = require('axios')
axios.get('https://api.github.com/users/codeheaven-io');

var moment = require('moment');
moment().format();

const fs = require('fs');
var content;
 
var command = process.argv[2];
var request = process.argv.splice(3).join("+").toString();


switch(command) {
  case 'spotify-this-song':
   
var spotify = new Spotify({
  id: keys.Spotify.id,
  secret: keys.Spotify.secret
});
 
spotify.search({ type: 'track', query: request }, function(err, data) {
  if (err) {
    return console.log("That's not a real song... Try entering a real song next time \n" );
    
  }
 
console.log("\n");


console.log(data.tracks.items[0].artists[0].name);
console.log(data.tracks.items[0].name); 
console.log(data.tracks.items[0].external_urls.spotify); 
console.log(data.tracks.items[0].album.name); 

console.log("\n");

});
    break;
  case 'concert-this':
  
  

    axios.get("https://rest.bandsintown.com/artists/"+request+"/events?app_id=codingbootcamp")
    .then(function (response) {


      if (response.data.length != 0){
      for (var i=0;i<response.data.length; i++){

      console.log("\n");
      console.log(response.data[i].venue.name);
      console.log(response.data[i].venue.city);
      console.log(moment(response.data[i].datetime).format('MM/DD/YYYY'));

     
      }
      console.log("\n");
    }
else{
  console.log("No upcoming concerts :(");

}

    })
    .catch(function (error) {
      console.log(error);
    });
   

    break;
    case 'movie-this':
     

 

axios.get(" https://www.omdbapi.com/?apikey=trilogy&t="+request+"")
    .then(function (response) {
      
      if (response.data.Response != 'False'){
      console.log("\n");
      console.log(response.data.Title);
      console.log(response.data.Year);
      console.log(response.data.Rated);
      console.log(response.data.Ratings[1].Value);
      console.log(response.data.Country);
      console.log(response.data.Language);
      console.log(response.data.Plot);
      console.log(response.data.Actors);
      console.log("\n");
      }
      else{

      console.log("\n");
      console.log("That movie does not exist :(");
      console.log("\n");

      }

    })

     
    break;

    case 'do-what-it-says':

 
    // macOS, Linux, and Windows
   
    // First I want to read the file
    fs.readFile('./random.txt', 'utf8',  function read(err, data) {
      if (err) {
          throw err;
      }
      
      contentArr=data.split('\n');

//////////////////////////////////////////////////////////////////////////////////////////////////
 //Embedded Switch Starts here
      for (var i=0;i<contentArr.length;i++){

      content = contentArr[i].split(',');
      
      var textCommand = content[0];
      var textRequest = content[1].replace(" ", "%20");

      //formats the text request to remove quotes for the concert call

      var concertTextRequest= textRequest.replace(/['"]+/g, '');


      switch(textCommand) {
        case 'spotify-this-song':
         
      var spotify = new Spotify({
        id: keys.Spotify.id,
        secret: keys.Spotify.secret
      });
       
      spotify.search({ type: 'track', query: textRequest }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      
      console.log("\n");
      console.log(data.tracks.items[0].artists[0].name);
      console.log(data.tracks.items[0].name); 
      console.log(data.tracks.items[0].external_urls.spotify); 
      console.log(data.tracks.items[0].album.name); 
      console.log("\n");
      
      });
          break;
        case 'concert-this':
        
        
      
          axios.get("https://rest.bandsintown.com/artists/"+concertTextRequest+"/events?app_id=codingbootcamp")
          .then(function (response) {
          
      
            if (response.data.length != 0){
            for (var i=0;i<response.data.length; i++){
              console.log("\n");
            console.log(response.data[i].venue.name);
            console.log(response.data[i].venue.city);
            console.log(moment(response.data[i].datetime).format('MM/DD/YYYY'));
      
           
            }
            console.log("\n");
          }
      else{
        console.log("No upcoming concerts :(");
      
      }
      
          })
          .catch(function (error) {
            console.log(error);
          });
         
      
          break;
          case 'movie-this':
           
      
       
      
      axios.get(" https://www.omdbapi.com/?apikey=trilogy&t="+textRequest+"")
          .then(function (response) {

            if (response.data.Response != 'False'){
              console.log("\n");
              console.log(response.data.Title);
              console.log(response.data.Year);
              console.log(response.data.Rated);
              console.log(response.data.Ratings[1].Value);
              console.log(response.data.Country);
              console.log(response.data.Language);
              console.log(response.data.Plot);
              console.log(response.data.Actors);
              console.log("\n");
              }
              else{
        
              console.log("\n");
              console.log("That movie does not exist :(");
              console.log("\n");
        
              }
          })
      
           
          break;
      
         
        default:
          console.log("Text Line "+i+" Not Valid");
      
          
      
      }
      
      }
//Embedded switch ends here!
/////////////////////////////////////////////////////////////////////////////
    

      


  });


    break;

  default:
  console.log("\n");
    console.log("Not a valid command, valid commands are 'concert-this' 'spotify-this-song' 'movie-this' and 'do-what-it-says");
    console.log("\n");
    

}
