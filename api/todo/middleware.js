const { check,validationResult } = require('express-validator');
const User = require("./model.js");
const jwt = require("jsonwebtoken");

class UserMiddleware{
  validation(){
    return [
      check('heading').trim().not().isEmpty().withMessage("Heading cannot be empty!").escape().isLength({max:100}).withMessage("Heading is too long!"),
      check('description').trim().not().isEmpty().withMessage('Description cannot be empty!').isLength({max:800}).withMessage("Description is too long!"),
    ]
  }
  
  async validateTodo(req,res,next){
    const errors = validationResult(req).mapped()
    
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
      console.log(e);
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