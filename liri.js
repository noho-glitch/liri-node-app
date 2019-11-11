require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios")

// capture the command the user puts in

var userCommand = process.argv[2];

//userRequest = index of [3] and beyond
var userRequest = process.argv.slice(3)
var userRequest = userRequest.join("+")

console.log(userCommand)
console.log(userRequest);
//check is userComman is "consert-this"
var searchResult;



//run API call using axios to the bands-intown API

var bandsInTown = function() {

    var queryURL = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function(response) {
    console.log(response);
  })
    
}

//inject the user's search term in the queryURL

// display the name of venue, location, and date
//format date mm/dd/yyyy

var movieThis = function() {

    var queryURL = "http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy";

    console.log(queryURL);

    axios.get(queryURL).then(
        function(response) {
    console.log(response);
    console.log("Release Year: " + response.data.Year);
  })

}

switch(userCommand) {
    case "concert-this":
        bandsInTown();
        break;
    case "spotify-this-song":
       spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays()
}

