const jwt = require('jsonwebtoken'); //npm install jsonwebtoken

const secretKey = "celzene"

//middleware happens between request and response
//next is a node js function which triggers the API flow to move forwaed when our task is completed successfullu in middleware

const protect = async (req, res, next) => {
    let token;

    //the bearer tokrn is stored as: "Bearer 76sjfbskugfiusegfjbhzdbgfkhdxbdkbvl"
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))   {
        try{
            token = req.headers.authorization.split(' ')[1]; //saying i dont want the bearer word but i want key
            const decoded = jwt.verify(token, secretKey)
            req.user = decoded;
            next();
        } catch(error) {
            res.status(401).json({
                success: false,
                message: 'Token is invalid or expired'
            })
        }
    }
    if(!token) {
        res.status(401).json({
            message: 'Token is invalid or expired'
        })
    }
}

//create a middleware to authorisw access to apis based on the roles of users
const authorize = (role) => {
    return (req,res,next) => {
        if(req.user.role == role) {
            next();
        } else {
            return res.status(403).json({
                message:'This user is not authorised to call this specific API'
            })
        }
    }
}

module.exports = {protect , authorize}