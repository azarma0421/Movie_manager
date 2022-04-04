const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

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

// Router
app.get('', (req, res) => {
    res.render('home');
});


app.listen(port, () => console.log(`Listening on port ${port}`));