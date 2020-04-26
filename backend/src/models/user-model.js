const Sequelize  = require('sequelize');
const Connection = require("../helpers/connection");

// ... Connection
const connection = new Connection();
const sequelize  = connection.postgres();

const User = sequelize.define("user", {
    userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    spotifyId: {
        type: Sequelize.INTEGER
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
    country: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    displayName: {
        type: Sequelize.STRING(255),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(255),
        allowNull: true,
    },
    explicitContent: {
        type: Sequelize.JSON,
    },
    externalUrls: {
        type: Sequelize.JSON
    },
    followers: {
        type: Sequelize.JSON
    },
    href: {
        type: Sequelize.STRING(128)
    },
    images: {
        type: Sequelize.JSON
    },
    product: {
        type: Sequelize.STRING(128)
    },
    type: {
        type: Sequelize.STRING(128)
    },
    uri: {
        type: Sequelize.STRING(128)
    },
    createOn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
}, { timestamps: false });

module.exports = User;