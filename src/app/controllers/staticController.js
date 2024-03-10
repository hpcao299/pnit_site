const gfs = require('../../db').gfs;

exports.getHomePage = (req, res, next) => {
    res.render('home', { layout: 'homeLayout.hbs' });
};

exports.getStaticImage = async (req, res, next) => {
    const dbGFS = gfs();

    const downloadStream = dbGFS.openDownloadStreamByName(req.params.filename);

    downloadStream.on('data', chunk => {
        res.write(chunk);
    });

    downloadStream.on('end', () => {
        res.end();
    });

    downloadStream.on('error', error => {
        res.status(404).json({ code: 404, message: 'Image not found' });
    });
};
