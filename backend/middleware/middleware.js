import jwt from 'jsonwebtoken';
const SECRET_KEY=process.env.JWT_KEY;

function authenticateJWT(req,res,next){
    if(req.path==='/login'){
        return next();
    }

    const jwtToken = req.header('Authorization')?.replace('Bearer ', '');
    if (!jwtToken) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try{
        const decodedToken = jwt.verify(jwtToken,SECRET_KEY);
        req.user=decodedToken;
        console.log("Middleware Passed")
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).json({ message: 'Invalid or expired token.' });
    }
};

export default authenticateJWT;