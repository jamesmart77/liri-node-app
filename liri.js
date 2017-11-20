var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var moment = require('moment');
var inquirer = require("inquirer");

var apiKeys = require("./secrets/apiKeys.js");

var spotify = new Spotify({
    id: apiKeys.spotifyKeys.client_id,
    secret: apiKeys.spotifyKeys.client_secret
});

inquirer
    .prompt([

        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Get Tweets", "Search Spotify", "Search Movies", "Surprise Me!"],
            name: "userAction"
        }
    ])
    .then(function (inquirerResponse) {

        if (inquirerResponse.userAction === "Get Tweets") {
            var client = new Twitter({
                consumer_key: apiKeys.twitterKeys.consumer_key,
                consumer_secret: apiKeys.twitterKeys.consumer_secret,
                access_token_key: apiKeys.twitterKeys.access_token_key,
                access_token_secret: apiKeys.twitterKeys.access_token_secret
            });

            var params = {
                count: 20
            };

            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (error) {
                    return console.log('Error occurred: ' + error);
                }

                //console.log("Response code: " + response);
                tweets.forEach(element => {
                    console.log("---------------------------")
                    console.log("Posted: " + moment(element.created_at).format("dddd MM-DD-YYYY hh:mm a"));
                    console.log(element.text);
                    console.log("---------------------------")
        
                });

            });
        }
    });



// console.log("id: " + spotify.credentials.id + "\nsecret: " + spotify.credentials.secret)

// spotify
//     .search({
//         type: 'track',
//         query: 'All the Small Things'
//     })
//     .then(function (response) {
//         console.log(response);
//     })
//     .catch(function (err) {
//         console.log(err);
//     });