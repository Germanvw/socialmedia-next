import mysql2 from 'mysql2';

var con = mysql2.createConnection({
  host: process.env.HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

con.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('DB is connected');
  }
});

module.exports = con;
