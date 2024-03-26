const fs = require('fs');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
});

const sqlFilePath = 'ecosync.sql';
const sqlStatements = fs.readFileSync(sqlFilePath, 'utf-8');

const sqlQueries = sqlStatements.split(';').filter(query => query.trim() !== '');

sqlQueries.forEach((sqlQuery, index) => {
  connection.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.error(`Error executing SQL statement ${index + 1}:`, error);
    } else {
      console.log(`SQL statement ${index + 1} executed successfully`);
    }
  });
});

connection.end();
