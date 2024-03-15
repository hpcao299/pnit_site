const User = require('../app/models/User');

const checkAuth = async (req, res, next) => {
    const username = req.params.username;

    // If req.user object doesn't exist
    if (!req.user) {
        return res.redirect('/auth/login');
    }

    if (req.user?.username === username) {
        return next();
    } else {
        const foundUser = await User.findOne({ username: username }, { password: 0 }).lean().exec();
        let firstWordOfName;

        if (!foundUser) return res.render('not-found');

        if (!foundUser.image_url) {
            const words = foundUser.name.split(' ');

            // Get the last word
            const lastWord = words[words.length - 1];

            // Get the first character of the last word
            firstWordOfName = lastWord.charAt(0);
        }

        return res.render('app/wrong-profile', {
            foundUser,
            firstWordOfName,
            username: req.user?.username,
        });
    }
};

module.exports = checkAuth;
