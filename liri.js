require('dotevnv').config();

var keys = require('./keys.js');
// npm packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var action = "";

var nodeArgv = process.argv;
for (var i = 3; i < nodeArgv.length; i++) {
    if (i > 3 && i < nodeArgv.length) {
        action = nodeArgv + "+" + nodeArgv[i];
    } else {
        action += nodeArgv[i];
    }
}

if (command === "my-tweets") {
    displayTweets();
} else if (command === "spotify-this-song") {
    // code
} else if (command === "movie-this") {
    // code
} else if (command === "do-what-it-says") {
    // code
} else {
    console.log("I'm sorry, I didn't understand what you said.")
}

function displayTweets() {
    var params = {
        screen_name: 'nodejs',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });
}