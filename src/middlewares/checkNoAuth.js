const checkNoAuth = (req, res, next) => {
    if (req.user) {
        return res.redirect(`/@${req.user.username}/edit`);
    }

    next();
};

module.exports = checkNoAuth;
