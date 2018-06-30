require('dotenv').config();

var keys = require('./keys.js');
// npm packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
// set up keys with dotenv
var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
// reusable CLI "<hr> element"
var hr = "=========================###=========================\n"
// take user command
var command = process.argv[2];
var searchQuery = "";
// take user search query (if any)
var nodeArgv = process.argv;
for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        searchQuery = searchQuery + "+" + nodeArgv[i];
    } else {
        searchQuery += nodeArgv[i];
    }
}
// IF STATEMENT to determine what to do
if (command === "my-tweets") {
    displayTweets();
} else if (command === "spotify-this-song") {
    searchSpotify();
} else if (command === "movie-this") {
    searchMovie();
} else if (command === "do-what-it-says") {
    readTextFileCommand();
} else {
    console.log("I'm sorry, I don't understand what you said.")
}

// ### FUNCTIONS ###
function displayTweets() {
    var params = {
        screen_name: 'SimpsonsQOTD',
        count: 20
    };
    twitter.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(hr + "Date Created: " + JSON.stringify(tweets[i].created_at) + "\n\nTweet:\n" + JSON.stringify(tweets[i].text) + "\n" + hr)
            }
        }
    });
}

function searchSpotify() {
    if (searchQuery === "") {
        searchQuery = "The Sign Ace of Base";
    }
    spotify.search({
        type: 'track',
        limit: 3,
        query: searchQuery
    }, function (error, data) {
        console.log("Searching Spotify for " + searchQuery + "...\n")
        if (error) {
            return console.log('Error occurred: ' + error);
        }
        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log(hr + "Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Song Title: " + data.tracks.items[i].name);
            console.log("Preview Link: " + data.tracks.items[i].preview_url);
            console.log("Album Title: " + data.tracks.items[i].album.name);
            console.log(hr);
        }
        console.log("\n*================# END OF RESULTS #=================*\n");
    });
}

function searchMovie() {
    if (searchQuery === "") {
        searchQuery = "Mr Nobody";
    }
    console.log("Searching OMDb for " + searchQuery + "...\n")
    var url = 'http://www.omdbapi.com/?apikey=trilogy&t=' + searchQuery;
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(hr + "Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDb Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
            console.log("Produced: " + JSON.parse(body).Country);
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log(hr);
        }
    });
}

function readTextFileCommand() {
    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            console.log(error);
        }
        dataArray = data.split(',');

        var txtCommand = dataArray[0];
        searchQuery = dataArray[1];

        if (txtCommand === "my-tweets") {
            displayTweets();
        } else if (txtCommand === "spotify-this-song") {
            searchSpotify();
        } else if (txtCommand === "movie-this") {
            searchMovie();
        } else if (txtCommand === "do-what-it-says") {
            console.log("Nice try. No infinite loops allowed here.")
        } else {
            console.log("I'm sorry, I don't understand what you said.")
        }
    });
}