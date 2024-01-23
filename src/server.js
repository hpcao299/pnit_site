require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const methodOverride = require('method-override');

const route = require('./routes');
const db = require('./db');

const app = express();
const port = process.env.PORT || 8000;

// Connect to MongoDB
db.connect();

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: true,
        resave: true,
    }),
);
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Init route
route(app);

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});
