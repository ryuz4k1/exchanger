"use strict";

const axios   = require("axios");
const request = require("request");
const Types   = require("../helpers/types");
const config  = require("../config.json"); 


class SpotifyService {

    async createPlaylist(userId, myBody, token) {
        // console.log(userId,body,token)
        let url = process.env.SPOTIYF_API_URL_PLAYLIST + '/'  + userId  + "/playlists"
        const options = {
            url: url,
            data: myBody,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            method: "POST"
        }
        const response = await request.post(options);
        console.log(response.data);
        return response.data;
    }

}

module.exports = SpotifyService;