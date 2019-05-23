function checkSession(req, res, next) {
    if(!req.session._id) {
        res.redirect('/log')
    };
    next();
};


module.exports = checkSession;