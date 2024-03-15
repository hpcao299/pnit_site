exports.getLoginPage = (req, res, next) => {
    const error = req.query.error;

    res.render('login', {
        pageTitle: 'Đăng nhập | PNIT - CLB Tin Học Trường THPT Phú Nhuận',
        pageDescription:
            'Đăng nhập vào trang web của PNIT để trải nghiệm các tính năng tiện ích, được tạo bởi các thành viên câu lạc bộ.',
        pageCanonical: 'https://pnit.site/auth/login',
        error,
    });
};

exports.logOut = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
};
