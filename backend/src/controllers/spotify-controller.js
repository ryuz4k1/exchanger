const config            = require('../config.json');
const Utils             = require("../helpers/utils");
const Types             = require("../helpers/types");
const SportifyService   = require("../services/spotify.service")

class SpotifyController{
    constructor(router){
        this.router = router;
        this.routes();
        
        this.utils = new Utils();
        this.spotifyService = new SportifyService();
    }

    async create(req, res) {
        try {
            let fakeBody = {
                name: "Youtube Liked Vids",
                description: "All Liked Youtube Videos",
                public: true
            };
            let result = await this.spotifyService.createPlaylist(fakeBody);

            return res.send(this.utils.setResult(Types.Status.SUCCESS, 'success', result));
        } 
        catch (error) {
            return res.send(this.utils.setResult(Types.Status.ERROR, 'error', error));
        }
    }


    routes(){
        this.router.get("/", this.create.bind(this));
    };

};

module.exports = SpotifyController;