const config            = require('../config.json');
const Utils             = require("../helpers/utils");
const Types             = require("../helpers/types");
const request           = require('request');
const querystring       = require('querystring');
const User              = require("../models/user-model");
const UserToken         = require("../models/user-token-model");

class IndexController {
    constructor(router) {
        this.router = router;
        this.routes();

        this.utils = new Utils();
    }

    async login(req, res) {
        let randomState = this.utils.generateRandomString(16);
        res.cookie(process.env.SPOTIFY_STATE_KEY, randomState);

        // your application requests authorization
        let scope = 'user-read-private user-read-email';
        res.redirect(process.env.SPOTIFY_AUTH_URL +
            querystring.stringify({
                response_type: 'code',
                client_id: process.env.SPOTIFY_CLIENT_ID,
                scope: scope,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
                state: process.env.SPOTIFY_STATE_KEY
            }));
    }


    async callback(req, res) {
        // your application requests refresh and access tokens
        // after checking the state parameter

        let code = req.query.code || null;
        let state = req.query.state || null;
        let storedState = req.cookies ? req.cookies[process.env.SPOTIFY_STATE_KEY] : null;

        console.log("code --> ", code);
        console.log("state --> ", state);
        console.log("storedState --> ", storedState);

        console.log("req.cookies --> ", req.cookies);
        console.log("req.cookies[process.env.SPOTIFY_STATE_KEY]  --> ", req.cookies[process.env.SPOTIFY_STATE_KEY]);

        if (state === null) {
            res.redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }));
        } else {
            res.clearCookie(process.env.SPOTIFY_STATE_KEY);
            let authOptions = {
                url: process.env.SPOTIFY_TOKEN_URL,
                form: {
                    code: code,
                    redirect_uri: process.env.SPOTIFY_REDIRECT_URL,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
                },
                json: true
            };

            request.post(authOptions, function (error, response, body) {
                if (!error && response.statusCode === 200) {

                    let access_token = body.access_token,
                        refresh_token = body.refresh_token;

                    let options = {
                        url: process.env.SPOTIFY_API_URL,
                        headers: { 'Authorization': 'Bearer ' + access_token },
                        json: true
                    };

                    // use the access token to access the Spotify Web API
                    request.get(options, async function (error, response, body) {
                        console.log(body);

                        let user = await User.findOne({ where: { email: body.email }});

                        if (user == null) {
        
                            user = await User.create({
                                isActive: true,
                                isDeleted: false,
                                spotifyId: body.spotifyId,
                                country: body.country,
                                displayName: body.display_name,
                                email: body.email,
                                explicitContent: body.explicit_content,
                                externalUrls: body.external_urls,
                                followers: body.followers,
                                href: body.href,
                                images: body.images,
                                product: body.product,
                                type: body.type,
                                uri: body.uri
                            });

                            await UserToken.create({
                                isActive: true,
                                isDeleted: false,
                                userId: user.userId,
                                spotifyId: user.spotifyId,
                                accessToken: access_token,
                                refreshToken: refresh_token
                            });
                        }
                        UserToken.update({ 
                            isActive: true,
                            isDeleted: false,
                            userId: user.userId,
                            spotifyId: user.spotifyId,
                            accessToken: access_token,
                            refreshToken: refresh_token
                        }, 
                        { 
                            where: { 
                                userId: user.userId
                            }
                        })
                    });

                    res.redirect('http://localhost:4200/home/' + access_token + '/' + refresh_token);

                } else {
                    res.redirect('/#' +
                        querystring.stringify({
                            error: 'invalid_token'
                        }));
                }
            });
        }
    }


    async refreshToken(req, res) {
        // requesting access token from refresh token
        let refresh_token = req.query.refresh_token;
        let authOptions = {
            url: process.env.SPOTIFY_TOKEN_URL,
            headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')) },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let access_token = body.access_token;
                return res.send({
                    'access_token': access_token
                });
            }
        });
    }


    

    routes() {
        this.router.get("/login", this.login.bind(this));
        this.router.get("/callback", this.callback.bind(this));
    };

};

module.exports = IndexController;