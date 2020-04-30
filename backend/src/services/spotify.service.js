"use strict";

const axios          = require("axios");
const request        = require("request");
const Types          = require("../helpers/types");
const config         = require("../config.json"); 
const YoutubeService = require("../services/youtube.service");

class SpotifyService {

    constructor(){
        this.youtubeService = new YoutubeService()
    }

    async createPlaylist(userId, myBody, token) {
        // console.log(userId,body,token)
        let url = process.env.SPOTIYF_API_URL_PLAYLIST + '/'  + userId  + "/playlists"
      
        const options = {
            url: url,
            data: myBody,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            method: "POST"
        }
        // console.log("Options: " , options);
        const response = await axios(options);
        console.log("Response: ", response.data.id);
        return response.id;
    }



    async getSpotifyUri(songInfo, token){
        let uris = [];
        let url = process.env.SPOTIFY_API_SEARCH_URL + '?' + "query=" + songInfo + "&type=track,artist&offset=0&limit=20" 
        //let fakeUrl = 'https://api.spotify.com/v1/search?query=muse&type=track,artist&offset=0&limit=20'
        const options = {
            url: url,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            transformRequest: [(data, headers) => {
                // transform the data
            
                return data;
            }],
            method: "GET"
        }

        const response = await axios(options);
        if(response.data.tracks.items[0].uri){
            uris.push(response.data.tracks.items[0].uri)
        }
        
        console.log(uris.length)
        //return uri
    }

    async addSongToPlaylist(videoUrl){
        // """Add all liked songs into a new Spotify playlist"""
        // # populate dictionary with our liked songs
        
        let playlistVideos = this.youtubeService.getPlaylistVideos()

        // # collect all of uri
        // uris = [info["spotify_uri"]for song, info in self.all_song_info.items()]

        // # create a new playlist
        playlist_id = self.create_playlist()

        // # add all songs into new playlist
        request_data = json.dumps(uris)

        query = "https://api.spotify.com/v1/playlists/{}/tracks".format(
            playlist_id)

        response = requests.post(
            query,
            data=request_data,
            headers={
                "Content-Type": "application/json",
                "Authorization": "Bearer {}".format(spotify_token)
            }
        )
    }

    

}

module.exports = SpotifyService;