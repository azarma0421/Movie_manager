const read = require('body-parser/lib/read');
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

// find movie by serch
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

exports.form = (req, res) => {
    res.render('add-movie');
}

// Add movie
exports.create = (req, res) => {

    const { name, category, date, rate, comment } = req.body;

    pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log('Connected as ID' + connection.threadId);

        // Use the connection
        connection.query('INSERT INTO movie SET name = ?, category = ?, date = ?, rate = ?, comment = ?', [name, category, date, rate, comment], (err, rows) => {
            // when done with connection, realease
            connection.release();
            if (!err) {
                res.render('add-movie', { alert: 'Movie added successfully.' });
                // res.render('home', { alert: 'Movie added successfully.' });
            } else {
                console.log(err);
            }
            console.log('The data from movie table: \n', rows);
        })
    });
}

// Edit movie
exports.edit = (req, res) => {
    res.render('edit-movie');
}