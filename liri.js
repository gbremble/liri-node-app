require('dotenv').config();

var keys = require('./keys.js');
// npm packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var twitter = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var hr = "=========================###========================="

var command = process.argv[2];
var searchQuery = "";

var nodeArgv = process.argv;
for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        searchQuery = nodeArgv + "+" + nodeArgv[i];
    } else {
        searchQuery += nodeArgv[i];
    }
}

if (command === "my-tweets") {
    displayTweets();
} else if (command === "spotify-this-song") {
    searchSpotify(searchQuery);
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
                console.log(hr + "\nDate Created: " + JSON.stringify(tweets[i].created_at) + "\n\nTweet:\n" + JSON.stringify(tweets[i].text) + "\n" + hr + "\n")
            }
        }
    });
}

function searchSpotify() {
    // code
}