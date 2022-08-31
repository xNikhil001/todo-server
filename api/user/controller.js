const jwt = require("jsonwebtoken");
const User = require("./model.js");
const bcrypt = require("bcryptjs");
const [store] = require("../../config/mongoStore.js")

class UserController{
  async loginUser(req,res){
    try {
      const {email,password} = req.body;
      const fields = {
        email,password
      }
      const result = await User.findOne({email});
      //console.log
      if(!result){
        return res.json({ok:false,msg:"User doesn't exist!"});
      }
      const check = await bcrypt.compare(password,result.password);
      //console.log(check)
      if(!check){
        return res.json({ok:false,msg:"Invalid credentials!"});
      }
      const token = jwt.sign({id:result._id,email:result.email}, process.env.SECRET, { expiresIn: '24h' });
      //console.log(token);
      
      req.session.access_token = token;
      req.session.uid = result._id.toString();
      //console.log(req.session)
      res.json({ok:true,msg:"Login Successfull!"})
    } catch (e) {
      //console.log(e)
      res.json({ok:false,msg:"An error occured!"})
    }
  }
  async addUser(req,res){
    try {
      const {name,email,password} = req.body;
  
      const check = await User.findOne({email});
      
      if(check){
        return res.json({ok:false,msg:"User already exists!"});
      }
  
      const userData = new User({name,email, password})
      const result = await userData.save();
      res.json({ok:true,msg:"Registered successfull!"})
    } catch (e) {
      //console.log(e)
      res.json({ok:false,msg:"An error occured!"})
    }
  }
  async logout(req,res){
    try {
      req.session.destroy();
      req.sessionStore.destroy(req.sessionId,(err)=>{
        if(err) console.log(err)
      })
      res.json({ok:true,msg:'Logged out sucessfully!'});
    } catch (e) {
      //console.log(e)
      res.json({ok:false,msg:"An error occured!"})
    }
  }
}

const obj = new UserController();

module.exports = {
  loginUser: obj.loginUser,
  addUser: obj.addUser,
  logout: obj.logout
}