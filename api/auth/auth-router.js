const router = require("express").Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require("../secrets"); 
const User = require('./user-model')
const {checkUsernameExists, isRealUser, restrictedAccess} = require('./auth-middleware')


function buildToken(user){
  const payload = {
    id: user.user_id,
    username: user.username,
    role: user.role
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign({role: user.role}, JWT_SECRET, options)
}

router.get('/users', restrictedAccess,  async (req, res) => {
  res.status(200).json(await User.find())
})


router.post('/register', checkUsernameExists, async (req, res, next) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8)

  user.password = hash

  const newUser = await User.add(user)
  res.status(201).json(newUser)
});

router.post('/login', isRealUser,  (req, res) => {

  const token = buildToken(req.user)
  res.status(200).json({
    message: `welcome, ${req.user.username}!`,
    token
  })
});

module.exports = router;