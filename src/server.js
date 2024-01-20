require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors');
const path = require('path');

const route = require('./routes');
const db = require('./db');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Init route
route(app);

// Connect to MongoDB
db.connect();

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});
