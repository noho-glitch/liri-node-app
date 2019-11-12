require("dotenv").config();
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios")
var fs = require("fs");


// capture the command the user puts in

var userCommand = process.argv[2];

//userRequest = index of [3] and beyond
var userRequest = process.argv.slice(3)
var userRequest = userRequest.join("+")

console.log(userCommand)
console.log(userRequest);
//check is userComman is "consert-this"


//run API call using axios to the bands-intown API

var bandsInTown = function() {

    var queryURL = "https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function(response) {
            // console.log(response.data[0])
        for (var i=0; i < 5; i++) {
            console.log("Venue: " + response.data[i].venue.name);
            console.log("City: " + response.data[i].venue.city);
            console.log("Lineup: " + response.data[i].lineup);
            
            //Pull date of the event and sets it to a variable
            var date = response.data[i].datetime;

            //uses moment.js to convert our variable date to a new format
            console.log("Date: " + moment(date, "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY"));
            console.log("-------------");
        };
    });
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
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0][0]);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);

    if (userRequest === "") {
        userRequest === "Captain+Ron"
    };
  });

};

//Spotify this song
//sets the spotify this song variable/function
var spotifyThisSong = function() {
    
    var queryURL = "https://api.spotify.com/v1/search?q=" + userRequest + "&type=track&offset=0&limit=20";

    console.log(queryURL);

    axios.get(queryURL).then(
        function(response) {
            console.log(response);
            console.log(response.items.name)
            console.log(response.items.albums.artists.external_urls.spotify)
        });
};

var doWhatItSays = function() {

    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);

        var dataJoin = data.join(" ")

        console.log("node liri.js " + dataJoin);
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

