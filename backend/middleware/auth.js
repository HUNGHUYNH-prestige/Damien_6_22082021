const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        //console.log('decoded token is :');
        //console.log(decodedToken);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID incorrect';
        } else {
            next();
        }
    } catch (error) {
        res.status(403).json({error:error | '403 : unauthorized request'});
    }
};