
require("dotenv").config();
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");

// capture the command the user puts in

var userCommand = process.argv[2];

//userRequest = index of [3] and beyond
var userRequest = process.argv.slice(3);

//Joins search query items with a +
var userRequest = userRequest.join("+");


//Console logs our Search type and Search query
console.log("---------------------------\n");
console.log("Search Type: " + userCommand + "\n");
console.log("Your Search Query: " + userRequest);
console.log("---------------------------\n");


//run API call using axios to the bands-intown API

var bandsInTown = function() {
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    userRequest +
    "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(function(response) {
    // console.log(response.data[0])
    for (var i = 0; i < 5; i++) {
      console.log("Venue: " + response.data[i].venue.name);
      console.log("City: " + response.data[i].venue.city);
      console.log("Lineup: " + response.data[i].lineup);

      //Pull date of the event and sets it to a variable
      var date = response.data[i].datetime;

      //uses moment.js to convert our variable date to a new format
      console.log(
        "Date: " + moment(date, "YYYY-MM-DD HH:mm:ss").format("MM/DD/YYYY")
      );
      console.log("---------------------------");
    }
  });
};

//inject the user's search term in the queryURL

// display the name of venue, location, and date
//format date mm/dd/yyyy

var movieThis = function() {
  //sets default search for captain ron if the string(search) is left empty
  if (userRequest === "") {
    userRequest = "Captain Ron";

    var queryURL =
      "http://www.omdbapi.com/?t=" +
      userRequest +
      "&y=&plot=short&apikey=trilogy";

    console.log(queryURL);

    axios.get(queryURL).then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0][0]);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    });
  } else {
    var queryURL =
      "http://www.omdbapi.com/?t=" +
      userRequest +
      "&y=&plot=short&apikey=trilogy";

    console.log(queryURL);

    axios.get(queryURL).then(function(response) {
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0][0]);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    });
  }
};

//Spotify this song
//sets the spotify this song variable/function
var spotifyThisSong = function() {
  if (userRequest === "") {
    userRequest = "Our Lips Are Sealed";

    spotify.search({ type: "track", query: userRequest, limit: 10 }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Track Listing: " + data.tracks.items[0].name);
      console.log("Album Title: " + data.tracks.items[0].album.name);
      console.log(
        "Spotify Link: " + data.tracks.items[0].external_urls.spotify
      );
    });
  } else {
    spotify.search({ type: "track", query: userRequest, limit: 10 }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log("Artist: " + data.tracks.items[0].artists[0].name);
      console.log("Track Listing: " + data.tracks.items[0].name);
      console.log("Album Title: " + data.tracks.items[0].album.name);
      console.log(
        "Spotify Link: " + data.tracks.items[0].external_urls.spotify
      );
    });
  }
};

var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    // console.log(data);

    var output = data.split(",");

    // console.log(output)
    // console.log(output[0])
    // console.log(output[1])

    WHOLE(output[0], output[1]);

  });
};
function WHOLE(userCommand, userRequest){
  switch (userCommand) {
  case "concert-this":
    bandsInTown(userRequest);
    break;
  case "spotify-this-song":
    spotifyThisSong(userRequest);
    break;
  case "movie-this":
    movieThis(userRequest);
    break;
  case "do-what-it-says":
    doWhatItSays();
}
}

WHOLE(userCommand, userRequest);
