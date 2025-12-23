const jsonwebtoken = require('jsonwebtoken')

const auth = (req,res,next) => {
    const token = req.headers.authorization;
    if(!token) {
        return res.status(401).json({ message : "Unauthorized User"})
    }

    try {
        const bearerToken = token.split(" ")[1]
        const decoded = jsonwebtoken.verify( bearerToken , process.env.SECRET_KEY || 'your-secret-key')
        req.userData = {id : decoded.id , email : decoded.email}
        next()
    } catch(err) {
        return res.status(401).json({ message : "Unauthorized User" , error : err.message})
    }
}

module.exports = auth