const mysql = require('mysql');
const fs = require('fs');

const pool = mysql.createPool({
  host: 'ecosyncdb',
  user: ecosync,
  password: 123456,
  database: ecosync,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const sql = fs.readFileSync('ecosync.sql').toString();

// Acquire a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error acquiring connection from pool:', err);
    return;
  }

  connection.query(sql, (error, results, fields) => {
    connection.release();

    if (error) {
      console.error('Error executing SQL statements:', error);
      return;
    }
    console.log('SQL statements executed successfully:', results);
  });
});

pool.end((err) => {
  if (err) {
    console.error('Error closing connection pool:', err);
    return;
  }
  console.log('Connection pool closed');
});
