'use strict';

const config                      = require("./config.json");
const express                     = require('express');
const cors                        = require('cors')
const bodyParser                  = require('body-parser');
const cookieParser                = require('cookie-parser');
const Utils                       = require('../src/helpers/utils');
const dotenv                      = require('dotenv').config();

//Controllers
const IndexController             = require('../src/controllers/index-controller');
const LoginController             = require('../src/controllers/login-controller');
const SpotifyController           = require('../src/controllers/spotify-controller');

// Middleware
const ExceptionMiddleware         = require('./middleware/exception-middleware');


class App {
  constructor() {
      this.app = express();
      this.app.use(cors());
      this.app.use(cookieParser());

      this.config();
      this.controllers();

      //this.Connection = new Connection().mongoDB();
  }

  config() {

    //enables cors
    this.app.use(cors({
      'allowedHeaders': ['sessionId', 'Content-Type'],
      'exposedHeaders': ['sessionId'],
      'origin': '*',
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'preflightContinue': false
    }));

    // Add headers
    this.app.use(function (req, res, next) {

      // Website you wish to allow to connect
      res.setHeader('Access-Control-Allow-Origin', '*');

       // Request methods you wish to allow
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

      // Request headers you wish to allow
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', true);

      // Pass to next layer of middleware
      next();
    });


    
    // ... Body parser
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json()); 
    this.app.use(cookieParser());

  }

  controllers(){
    this.app.use('/public', express.static('public'));
    
    // ... Index Controller
    let router = express.Router();
    this.app.use('/', router);
    new IndexController(router);

    router = express.Router();
    this.app.use('/auth', router);
    new LoginController(router);
    
    router = express.Router();
    this.app.use('/spotify', router);
    new SpotifyController(router);

     // ... Exception middleware
     const exceptionMiddleware = new ExceptionMiddleware();
     this.app.use(exceptionMiddleware.errorHandler);
  };

  getApp() {
    return this.app;
  }

}

module.exports = App;
