exports.getLoginPage = (req, res, next) => {
    res.render('login');
};

exports.logOut = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/auth/login');
    });
};
