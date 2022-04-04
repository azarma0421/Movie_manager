const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

// Parsing middleware
// Parse application
app.use(bodyParser.urlencoded({ extended: false }));

// Parser application/json
app.use(bodyParser.json());

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Connect to DB
pool.getConnection((err, Connection) => {
    if (err) throw err;
    console.log('Connected as ID' + Connection.threadId);
});




// Router
app.get('', (req, res) => {
    res.render('home');
});


app.listen(port, () => console.log(`Listening on port ${port}`));