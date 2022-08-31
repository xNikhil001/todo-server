const { check,validationResult } = require('express-validator');
const User = require("./model.js");
const jwt = require("jsonwebtoken");

class UserMiddleware{
  validation(){
    return [
      check('heading').trim().not().isEmpty().withMessage("Heading cannot be empty!").escape().isLength({max:100}).withMessage("Heading is too long!")
    ]
  }
  
  async validateTodo(req,res,next){
    const error = validationResult(req).mapped()
    const fn = (obj)=>{
      const x = Object.keys(obj)
      let a = {}
      const msg = x.map((item)=>{
        return a[obj[item].param] = obj[item].msg
      })
      return a
    }
    const errors = fn(error)
    //console.log(errors)
    
    if(Object.keys(errors).length > 0){
      return res.json({ok:false,errors});
    }
    next()
  }
  
  async auth(req,res,next){
    //console.log(req.session)
    const token = req.session.access_token
    //console.log(token);
    if(!token) return res.json({ok:false,msg:"Unauthorised User!"});
    
    try {
      const data = jwt.verify(token,process.env.SECRET);
      const result = await User.findById(data.id);
      //console.log(result)
      if(!data){
        return res.json({ok:false,msg:"Unauthorised access!"});
      }
      next()
    } catch (e) {
      //console.log(e);
      res.json({ok:false,msg:"An error occured!"})
    }
  }
}

const obj = new UserMiddleware();

module.exports = {
  validation: obj.validation,
  validateTodo: obj.validateTodo,
  auth: obj.auth
}