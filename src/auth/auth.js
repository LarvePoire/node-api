const jwt = require('jsonwebtoken');
const privatekey = require('../auth/private_key');

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader){
        const message = "JWT not found";
        return res.status(401).json({ message });
    }
    const token = authorizationHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, privatekey, (error, decodedToken) => {
        if(error){
            const message = "Forbiden";
            return res.status(401).json( {message, data: error } );
        }

        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId == userId){
            const message = 'Invalide Authenticate';
            res.status(401).json({ message });
        } else {
            next()
        }
    })
}









