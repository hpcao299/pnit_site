const staticRoute = require('./staticRoute');
const appRoute = require('./appRoute');

function route(app) {
    app.use('', staticRoute);
    app.use('', appRoute);

    app.use((req, res, next) => {
        res.render('not-found');
    });
}

module.exports = route;
