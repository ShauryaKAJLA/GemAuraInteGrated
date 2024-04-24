const jwt = require('jsonwebtoken')

const getToken = (user) =>{
    const token = jwt.sign({user} , process.env.JWT_SECRET_KEY)
    return token
}


module.exports = {getToken}