require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const methodOverride = require('method-override');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./app/models/User');

const route = require('./routes');
const db = require('./db');
const extractUsername = require('./utils/extractUsername');

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
app.use(passport.authenticate('session'));

app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/login/google/callback',
        },
        async (req, accessToken, refreshToken, profile, cb) => {
            const profileJson = profile._json;

            try {
                const foundUser = await User.findOne({ email: profileJson.email });
                // console.log('findOne: ', foundUser);

                if (!foundUser) {
                    const createdUser = await User.create({
                        email: profileJson.email,
                        name: profileJson.name,
                        image_url: profileJson.picture,
                        username: extractUsername(profileJson.email),
                        password: 'password',
                    });

                    // console.log('create: ', createdUser);

                    cb(null, { id: createdUser._id });
                    return;
                }
                cb(null, { id: foundUser._id });
            } catch (error) {
                console.error(error);
            }
        },
    ),
);

passport.serializeUser(async (user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);

        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Template engine
app.engine('.hbs', exphbs.engine({ extname: '.hbs', defaultLayout: 'main' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Init route
route(app);

app.listen(port, () => {
    console.log(`App is listening on port: ${port}`);
});
