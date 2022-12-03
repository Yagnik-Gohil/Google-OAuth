exports.protect = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/");
    }
}
exports.guest = (req,res,next) => {
    if(req.isAuthenticated()) {
        res.redirect("/dashboard");
    } else {
        return next();
    }
}