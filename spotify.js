var Spotify = require('node-spotify-api');

module.exports = {
    searchSong: function searchSpotify(apiKeys, songName, limit, printSongUrl) {
        var spotify = new Spotify({
            id: apiKeys.spotifyKeys.client_id,
            secret: apiKeys.spotifyKeys.client_secret
        });

        spotify
            .search({
                type: 'track',
                query: String(songName),
                limit: limit
            })
            .then(function (response) {
                //log out the song attributes from each track in array response
                response.tracks.items.forEach(element => {
                    console.log("---------------------------")
                    console.log("Artist: " + element.artists[0].name);
                    console.log("Song Title: " + element.name);
                    console.log("Preview Link: " + element.preview_url);
                    console.log("Album: " + element.album.name);
                    console.log("---------------------------");

                    //if Surprise Me choice was selected, printSongURL = true
                    if (printSongUrl) {
                        console.log("Full Song: " + element.external_urls.spotify);
                    }

                });

            })
            .catch(function (err) {
                console.log(err);
            });

    }
}