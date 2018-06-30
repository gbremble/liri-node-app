require('dotenv').config();

var keys = require('./keys.js');
// npm packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var hr = "=========================###=========================\n"

var command = process.argv[2];
var searchQuery = "";

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
    // code
} else if (command === "do-what-it-says") {
    // code
} else {
    console.log("I'm sorry, I didn't understand what you said.")
}

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
        // var data = data.tracks.items;

        for (var i = 0; i < data.tracks.items.length; i++) {
            console.log(hr + "Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Song Title: " + data.tracks.items[i].name);
            console.log("Preview Link: " + data.tracks.items[i].preview_url);
            console.log("Album Title: " + data.tracks.items[i].album.name);
            console.log(hr);
        }
        console.log("\n*=================* END OF DATA *==================*\n");
    });
}