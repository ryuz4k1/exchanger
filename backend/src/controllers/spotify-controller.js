const config            = require('../config.json');
const Utils             = require("../helpers/utils");
const Types             = require("../helpers/types");
const SportifyService   = require("../services/spotify.service");
const User              = require("../models/user-model");
const UserToken         = require("../models/user-token-model");

class SpotifyController{
    constructor(router){
        this.router = router;
        this.routes();
        
        this.utils = new Utils();
        this.spotifyService = new SportifyService();
    }

    // async create(req, res) {
    //     try {
    //         let fakeBody = {
    //             name: "Youtube Liked Vids",
    //             description: "All Liked Youtube Videos",
    //             public: true
    //         };
    //         let result = await this.spotifyService.createPlaylist(fakeBody);

    //         return res.send(this.utils.setResult(Types.Status.SUCCESS, 'success', result));
    //     } 
    //     catch (error) {
    //         return res.send(this.utils.setResult(Types.Status.ERROR, 'error', error));
    //     }
    // }


    async getUrl(req, res) {
        try {
            let result = await UserToken.findOne({
                where: {
                    accessToken: req.body.accessToken
                }
            });

            let user = await User.findOne({
                where: {
                    userId: result.userId
                }
            });

            let myBody = {
                "name": "New Playlist",
                "description": "New playlist description",
                "public": true
            }
            if(req.body.optional){
                myBody = {
                    "name": req.body.optional,
                    "description": req.body.optional + " description",
                    "public": true
                  }
            }   

            const playlistResult = await this.spotifyService.createPlaylist(user.displayName, myBody, req.body.accessToken);
            //console.log(playlistResult);

            return res.send(this.utils.setResult(Types.Status.SUCCESS, 'success', playlistResult));

        } 
        catch (error) {
            console.log(error);
            return res.send(this.utils.setResult(Types.Status.ERROR, 'error', error));
        }
    }


    routes(){
        //this.router.get("/", this.create.bind(this));
        this.router.post("/url", this.getUrl.bind(this));
    };

};

module.exports = SpotifyController;