const User = require('../models/User');

exports.getCurrentUser = async (req, res, next) => {
    res.redirect(`/@${req.user.username}/edit`);
};

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

        res.render('app/portfolio', {
            foundUser,
            firstWordOfName,
            pageTitle: `Trang cá nhân của ${foundUser.name} | PNIT`,
            pageDescription: `Trang cá nhân của ${foundUser.name}. Tạo trang cá nhân miễn phí với PNIT.`,
            pageCanonical: `https://pnit.site/@${username}`,
        });
    } catch (error) {
        next();
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

        res.render('app/edit', {
            foundUser,
            firstWordOfName,
            success: req.flash('success'),
            error: req.flash('error'),
            pageTitle: `Trang cá nhân của ${foundUser.name} | PNIT`,
            pageDescription: `Trang cá nhân của ${foundUser.name}. Tạo trang cá nhân miễn phí với PNIT.`,
            pageCanonical: `https://pnit.site/@${username}/edit`,
        });
    } catch (error) {
        next();
    }
};

exports.getEditHeaderPage = async (req, res, next) => {
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

        res.render('app/edit-header', {
            foundUser,
            firstWordOfName,
            success: req.flash('success'),
            error: req.flash('error'),
            pageTitle: `Trang cá nhân của ${foundUser.name} | PNIT`,
            pageDescription: `Trang cá nhân của ${foundUser.name}. Tạo trang cá nhân miễn phí với PNIT.`,
            pageCanonical: `https://pnit.site/@${username}/edit/header`,
        });
    } catch (error) {
        next();
    }
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

exports.addSocialLink = async (req, res, next) => {
    const username = req.params.username;
    const urlName = req.params.name;
    const value = req.body[urlName];
    let newValue;

    switch (urlName) {
        case 'instagram_url':
            newValue = `https://www.instagram.com/${value}`;
            break;
        case 'facebook_url':
            newValue = value;
            break;
        case 'github_url':
            newValue = `https://github.com/${value}`;
            break;
        case 'discord_url':
            newValue = `https://discord.com/users/${value}`;
            break;
        default:
            req.flash('error', 'Something went wrong.');
            res.redirect('back');
            break;
    }

    try {
        await User.findOneAndUpdate({ username }, { [urlName]: newValue });

        req.flash('success', 'Added social link successfully.');
        res.redirect('back');
    } catch (error) {
        req.flash('error', 'Something went wrong.');
        res.redirect('back');
    }
};

exports.deleteSocialLink = async (req, res, next) => {
    const username = req.params.username;
    const urlName = req.params.name;

    try {
        await User.findOneAndUpdate({ username }, { [urlName]: '' });

        req.flash('success', 'Deleted social link successfully.');
        res.redirect('back');
    } catch (error) {
        req.flash('error', 'Something went wrong.');
        res.redirect('back');
    }
};

exports.editDetails = async (req, res, next) => {
    const data = req.body;
    const username = req.params.username;

    const file = req.file;

    let updatedData = data;

    if (file) {
        updatedData.image_url = `${process.env.BASE_STATIC_FILES_URL}/${file.filename}`;
    }

    try {
        await User.findOneAndUpdate({ username }, updatedData);

        req.flash('success', 'Updated details successfully.');
        res.redirect(`/@${username}/edit`);
    } catch (error) {
        req.flash('error', 'Something went wrong.');
        res.redirect(`/@${username}/edit`);
    }
};

exports.uploadAvatar = async (req, res, next) => {
    const file = req.file;
    // Respond with the file details
    res.send({
        message: 'Uploaded',
        id: file.id,
        name: file.filename,
        contentType: file.contentType,
    });
};
