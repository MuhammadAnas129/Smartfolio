const { Pool } = require("pg");
require("dotenv").config();
const fs = require("fs");

const pool = new Pool ({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER_NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,         
    max: process.env.MAX
});
pool.on('error', (err)=>{
    console.log("Unexpected error on idle client : ", err);
    process.exit(-1);
});

// when database is connected
pool.connect((err, client, release)=>{
    if(err){
        console.log("Error while connecting to database : " , err)
    }
    else{
        release();
    }
});

const initSql = fs.readFileSync("app/models/init.sql").toString();

pool.query(initSql, (err, result)=>{
    if(err){
        console.log("error occurred while initializing database tables");
    }
});
module.exports = {pool};