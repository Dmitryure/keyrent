function checkSession(req, res, next) {
    if(!req.session.id) {
        res.redirect('/log')
    };
    next();
};


module.exports = checkSession;