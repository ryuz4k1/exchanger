const Sequelize  = require('sequelize');
const Connection = require("../helpers/connection");

// ... Connection
const connection = new Connection();
const sequelize  = connection.postgres();

const UserToken = sequelize.define("userToken", {
    userTokenId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    userId: {
        type: Sequelize.INTEGER
    },
    spotifyId: {
        type: Sequelize.INTEGER
    },
    accessToken: {
        type: Sequelize.STRING(255),
    },
    refreshToken: {
        type: Sequelize.STRING(255),
    },
    createOn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
}, { timestamps: false });

module.exports = UserToken;