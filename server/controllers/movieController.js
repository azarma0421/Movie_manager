const mysql = require('mysql');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// View movie
exports.view = (req, res) => {
    // Connect to DB
    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);
        // Use the connection
        connection.query('SELECT * FROM movie', (err, rows) => {
            // when done with connection, realease
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from movie table: \n', rows);
        })
    });
};

// View movie by serch
exports.find = (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);

        let searchTerm = req.body.search;

        // Use the connection
        connection.query('SELECT * FROM movie WHERE name LIKE ?', ['%' + searchTerm + '%'], (err, rows) => {
            // when done with connection, realease
            connection.release();
            if (!err) {
                res.render('home', { rows });
            } else {
                console.log(err);
            }
            console.log('The data from movie table: \n', rows);
        })
    });
};