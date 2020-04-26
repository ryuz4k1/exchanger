"use strict";

const axios   = require("axios");
const Types   = require("../helpers/types");
const config  = require("../config.json"); 


class DataService {

    async createPlaylist(body) {

        let url = process.env.SPOTIFY_API_URL + process.env.SPOTIFY_USER_ID  + "/playlists"
        console.log(url);
        const options = {
            url: url,
            data: body,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.SPOTIFY_TOKEN
            },
            method: "POST"
        }

        const response = await axios(options);
        return response.data;
    }

}

module.exports = DataService;