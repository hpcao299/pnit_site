const checkApiAuth = (req, res, next) => {
    const username = req.params.username;
    const authUsername = req.user.username;

    if (username !== authUsername) {
        return res.code(401).json({ code: 401, message: 'Unauthorized' });
    }

    next();
};

module.exports = checkApiAuth;
