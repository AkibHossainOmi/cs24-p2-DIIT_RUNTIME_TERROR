const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  // password: '123456',
  database: 'ecosync',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// const pool = mysql.createPool({
//     host: 'ecosyncdb',
//     user: 'root',
//     password: '123456',
//     database: 'ecosync',
//     port: 3306,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
//   });

module.exports = pool;
