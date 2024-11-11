require("dotenv").config();

const {DataSource} = require("typeorm");
// const { UserModel } = require("../models/user.model");

const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: "newdb",
    synchronize: true, // make it false when in production
    logging: false,
    entities:[]
})

module.exports = {
    AppDataSource
}