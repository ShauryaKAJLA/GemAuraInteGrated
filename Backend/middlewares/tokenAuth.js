const  jwt =require ('jsonwebtoken')

const tokenAuth = (req, res, next) => {
    try {
        let {token} = req.body
        // console.log({token})
        if(!token){ // means token is sent through GET request
           token = req.query.token
        }
        if(!token){
            return res.status(401).json({success:false , err: "Authentication failed , no JWT token found"})
        }
        const { user } = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = { ...user };
        next();
    } catch (err) {
        console.log("Invalid token:", err.message);    
    }
};


module.exports = {tokenAuth}