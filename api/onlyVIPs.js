

const onlyVIPS = () => (req, res, next) => {
      if(req.decodedJWT.role_name === 'organizer'){
        next()
      }
      else{
        next({status: 403, message: 'This is not for you'})
      }
      
  }

module.exports = onlyVIPS