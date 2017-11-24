var Twitter = require('twitter');
var moment = require('moment');

module.exports = {
    getTweets: function getTweets(apiKeys) {
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
                //console.log(String(element.created_at))
                console.log("Posted: " + moment(element.created_at, "ddd MMM DD").format("dddd MM-DD-YYYY hh:mm a"));
                console.log(element.text);
                console.log("---------------------------")

            });

            if (tweets.length < 20) {
                console.log("Well this is awkward...");
                console.log("We set the query count upper limit to 20 but we have fewer than 20 Tweets #antisocial");
            }

        });
    }
}