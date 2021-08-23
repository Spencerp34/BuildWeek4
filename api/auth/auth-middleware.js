const db = require('../data/db-config')
const bcrypt = require('bcryptjs')
const { JWT_SECRET } = require("../secrets");
const jwt = require('jsonwebtoken')

const checkUsernameExists = async(req, res, next) => {
    if(!req.body.username || !req.body.password){
        next({status: 401, message: 'username and password required'})
    }else{
        const {username} = req.body
        const result = await db('users')
            .where({username}).select('user_id', 'username')
        const exists = result[0]

        if(exists){
            next({status: 401, message: 'username taken'})
        }else{
            if(req.body.role !== 'organizer' && req.body.role !== 'guest'){
                next({status: 401, message: 'Must have a valid role.'})
            }else{
                next()
            }
        } 
    }
    
    
}

const isRealUser = async (req, res, next) => {
    if(!req.body.username || !req.body.password){
        next({status: 401, message: 'username and password required'})
    }else{
        const {username, password} = req.body
        const result = await db('users').where('username', username).select('username', 'password')
        const exists = result[0]
        if(!exists){
            next({status: 401, message: 'invalid credentials'})
        }else{
            const hash = exists.password
            const verified = bcrypt.compareSync(password, hash)
            if(exists && verified){
                req.user = exists
                next()
            }else{
                next({status: 401, message: 'invalid credentials'})
            }
        }
    }
}
  

const restrictedAccess = async(req, res, next) => {
    const token = req.headers.authorization

    if(token){
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err){
          next({status: 401, message: `token invalid`})
        }else{
          req.decodedJWT = decoded
          console.log(req)
          next()
        }
      })
    }else{
      next({status: 401, message: 'token required'})
    }
}
  

  
module.exports = {
    checkUsernameExists,
    isRealUser,
    restrictedAccess
}