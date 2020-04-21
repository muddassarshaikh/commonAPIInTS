// MYSQL Database file

import mysql from 'mysql';
import config from '../../config';

const con = mysql.createPool({
  connectionLimit: 10,
  host: config.databaseHost,
  user: config.databaseUser,
  password: config.databasePassword,
  database: config.databaseDatabaseName,
  port: config.databasePort,
});

con.getConnection(function (err, connection) {
  if (err) {
    console.log(err);
    console.log('Error connecting to Database');
    return;
  }
  console.log('Connection established');
});

export default con;
