const User = require('../models/User');

exports.getPortfolioPage = async (req, res, next) => {
    const username = req.params.username;

    try {
        const foundUser = await User.findOne({ username: username }, { password: 0 }).lean().exec();

        if (!foundUser) return next();

        let firstWordOfName;

        if (!foundUser.image_url) {
            const words = foundUser.name.split(' ');

            // Get the last word
            const lastWord = words[words.length - 1];

            // Get the first character of the last word
            firstWordOfName = lastWord.charAt(0);
        }

        console.log({ foundUser, firstWordOfName });

        res.render('app/portfolio', { foundUser, firstWordOfName });
    } catch (error) {
        res.json({ message: error });
    }
};

exports.getEditPage = async (req, res, next) => {
    const username = req.params.username;

    try {
        const foundUser = await User.findOne({ username: username }, { password: 0 }).lean().exec();

        if (!foundUser) return next();

        let firstWordOfName;

        if (!foundUser.image_url) {
            const words = foundUser.name.split(' ');

            // Get the last word
            const lastWord = words[words.length - 1];

            // Get the first character of the last word
            firstWordOfName = lastWord.charAt(0);
        }

        console.log({ foundUser, firstWordOfName });

        res.render('app/edit', {
            foundUser,
            firstWordOfName,
            success: req.flash('success'),
            error: req.flash('error'),
        });
    } catch (error) {
        res.json({ message: error });
    }
};

exports.getEditHeaderPage = (req, res, next) => {
    res.render('app/edit-header');
};

exports.editUsername = async (req, res, next) => {
    const username = req.params.username;
    const newUsername = req.body.username;

    if (username === newUsername) {
        req.flash('success', 'Updated username successfully.');
        return res.redirect('back');
    }

    const foundUser = await User.findOne({ username: newUsername });

    if (foundUser) {
        req.flash('error', 'Given username has been used.');
        return res.redirect('back');
    }

    try {
        await User.findOneAndUpdate({ username }, { username: newUsername });

        req.flash('success', 'Updated username successfully.');
        res.redirect(`/@${newUsername}/edit`);
    } catch (error) {
        req.flash('error', 'Something went wrong.');
        res.redirect('back');
    }
};

exports.editDetails = async (req, res, next) => {
    const data = req.body;
    const username = req.params.username;

    try {
        await User.findOneAndUpdate({ username }, data);

        req.flash('success', 'Updated details successfully.');
        res.redirect('back');
    } catch (error) {
        req.flash('error', 'Something went wrong.');
        res.redirect('back');
    }
};
