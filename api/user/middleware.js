class UserMiddleware {
  async restrict(req,res,next){
    const {email} = req.body;
    if (email != 'user@gmail.com') {
      return res.json({ok:false,msg:'Please use provided credentials!'})
    }
    next()
  }
}

const obj = new UserMiddleware()

module.exports = {
  restrict: obj.restrict
}