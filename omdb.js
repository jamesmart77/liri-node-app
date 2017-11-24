var request = require("request");

module.exports = {
    searchMovie: function searchMovie(movieTitle) {
        request("http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=full&apikey=40e9cece", function (error, response, body) {

            // If the request is successful (i.e. if the response status code is 200)

            if (!error && response.statusCode === 200) {

                // Parse the body of the site and recover just the imdbRating
                // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
                let body = JSON.parse(response.body)
                console.log("Movie Title: " + body.Title);
                console.log("Release Year: " + body.Year);
                console.log("IMDB Rating: " + body.imdbRating);

                //set default value and overwrite if rottem tomatoes exists
                let rTomatoes = "N/A";
                body.Ratings.forEach(element => {
                    if (element.Source === "Rotten Tomatoes") {
                        rTomatoes = element.Value;
                    }
                })

                console.log("Rotten Tomatoes Score: " + rTomatoes);
                console.log("Produced in: " + body.Country);
                console.log("Language: " + body.Language);
                console.log("Plot: " + body.Plot);
                console.log("Actors: " + body.Actors);
            } else {
                console.log(("Whoops! Try searching for a different movie. Below is the error produced..."))
                throw error;
            }
        })
    }
}