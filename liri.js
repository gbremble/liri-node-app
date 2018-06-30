require('dotevnv').config();

var keys = require('./keys.js');
// npm packages
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });