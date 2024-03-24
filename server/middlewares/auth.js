class AuthError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AuthError';
    }
}


function isLoggedIn(req, res, next) {
    if(!req.user){
        return next(new AuthError("Not logged in"))
    }
    next()
}

function isAdmin(req, res, next){
    if (req.user.status !== 'admin'){
        return next(new AuthError("Unauthorized: Admin access required"));
    }
    next()
}

function isStaff(req, res, next){
    if (req.user.status !== 'staff') {
        return next(new AuthError("Unauthorized: Staff access required"));
    }
    next()
}

function isSuperAdmin(req, res, next){
    if (req.user.status !== 'super') {
        return next(new AuthError("Unauthorized: Super Admin access required"));
    }
    next()
}

function isStudent(req, res, next){
    if (req.user.status !== 'student') {
        return next(new AuthError("Unauthorized: Only students can view"));
    }
    next()
}

module.exports = {
    isLoggedIn,
    isAdmin,
    isStaff,
    isSuperAdmin,
    isStudent
}