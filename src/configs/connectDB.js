// get the client
// import mysql from "mysql2/promise";
const mysql = require("mysql2/promise");

// create the connection to database
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  database: "nodejsbasic",
  port: "3306",
});

export default pool;
