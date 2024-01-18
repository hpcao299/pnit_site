const staticRoute = require('./staticRoute');

function route(app) {
    app.use('', staticRoute);
}

module.exports = route;
