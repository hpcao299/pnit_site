exports.getPortfolioPage = (req, res, next) => {
    res.render('app/portfolio');
};

exports.getEditPage = (req, res, next) => {
    res.render('app/edit');
};