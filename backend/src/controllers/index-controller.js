const config = require('../config.json');
const Utils = require("../helpers/utils");
const Types = require("../helpers/types");

class IndexController{
    constructor(router){
        this.router = router;
        this.routes();
        
        this.utils = new Utils();
    }

    async index(req, res) {
        try {
            return res.send(this.utils.setResult(Types.Status.SUCCESS, 'success', "Index Page"));
        } 
        catch (error) {
            return res.send(this.utils.setResult(Types.Status.ERROR, 'error', error));
        }
    }

    async enviroment(req, res, next){
        try {
            const envData = await config[process.env.NODE_ENV || 'production'];
            return res.send(this.utils.setResult(Types.Status.SUCCESS, 'success', envData));
        } 
        catch (error) {
            return res.send(this.utils.setResult(Types.Status.ERROR, 'error', error));
        }
    }

    routes(){
        this.router.get("/", this.index.bind(this));
        this.router.get("/enviroment", this.enviroment.bind(this));
    };

};

module.exports = IndexController;