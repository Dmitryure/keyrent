function checkSession(req, res, next) {
    if(!req.session._id) {
        res.redirect('/reg')
    };
    next();
};


module.exports = checkSession;