const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Javi',
  password: 'J4vier2022',
  database: 'comision24135'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = connection;