"use strict";

const Sequelize = require("sequelize");

class Connection {

    // ... Postgres sequelize
    postgres() {
        const sequelize = new Sequelize(process.env.DB_URL, {
            host: process.env.HOST,
            dialect: "postgres",
            dialectOptions: { decimalNumbers: true },
            operatorsAliases: false,
            logging:false, //Showing query
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },

            define: {
                freezeTableName: true,
                defaultScope: {
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            }
        });
        return sequelize;
    }
}

module.exports = Connection;