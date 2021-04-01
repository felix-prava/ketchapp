const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).send('Access denied!');

    try{
        const userId = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = userId;
    } catch (error){
        res.status(400).send('Invalid token!');
    }
    next();
}