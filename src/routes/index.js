const staticRoute = require('./staticRoute');
const appRoute = require('./appRoute');
const authRoute = require('./authRoute');

function route(app) {
    app.use('', staticRoute);
    app.use('/auth', authRoute);
    app.use('', appRoute);

    app.use((req, res, next) => {
        res.render('not-found');
    });
}

module.exports = route;
