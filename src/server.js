const express = require('express');
const exphbs = require('express-handlebars');
const cors = require('cors');
const path = require('path');
const route = require('./routes');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'hbs');

// Init route
route(app);

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});
