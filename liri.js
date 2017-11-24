var inquirer = require("inquirer");
var fs = require("fs");

var apiKeys = require("./secrets/apiKeys.js");
var twitter = require("./twitter.js");
var spotify = require("./spotify.js");
var omdb = require("./omdb.js");

inquirer
    // prompt user with initial options
    .prompt([

        {
            type: "list",
            message: "What would you like to do?",
            choices: ["Get Tweets", "Search Spotify", "Search Movies", "Surprise Me!"],
            name: "userAction"
        }
    ])
    .then(function (inquirerResponse) {
        //invoke twitter function
        if (inquirerResponse.userAction === "Get Tweets") {
            twitter.getTweets(apiKeys);
        }

        //if search spotify then prompt for song title
        if (inquirerResponse.userAction === "Search Spotify") {
            inquirer
                .prompt([{
                    type: "input",
                    message: "What song are you searching for?",
                    name: "spotifySong"
                }])
                .then(function (inquirerSpotifyResponse) {
                    //call function in spotify.js
                    //arguments: apiKeys, random.txt song, song limit, DON'T print full song url
                    spotify.searchSong(apiKeys, inquirerSpotifyResponse.spotifySong, 10, false);

                })
        }

        if (inquirerResponse.userAction === "Search Movies") {
            //if search Movies then prompt for movie title
            inquirer
                .prompt([{
                    type: "input",
                    message: "What movie are you searching for?",
                    name: "movieTitle"
                }])
                .then(function (inquirerMovieResponse) {
                    omdb.searchMovie(inquirerMovieResponse.movieTitle);

                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        //if user selects Surprise Me choice the song in the Random.txt file will be consoled
        if (inquirerResponse.userAction === "Surprise Me!") {

            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) throw error

                //arguments: apiKeys, random.txt song, song limit, print full song url
                spotify.searchSong(apiKeys, data, 1, true);

            })
        }
    });