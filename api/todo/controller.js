const Todo = require('./model.js');

class Controller {
  async getTodo(req,res){
    try {
      const uid = req.session.uid;
      const result = await Todo.find({uid});
      res.json({ok:true,todo:result});
    } catch (e) {
      //console.log(e);
      res.json({ok:false,msg:"An error occured!"});
    }
  }
  async addTodo(req,res){
    try {
      const uid = req.session.uid;
      const {heading} = req.body;
      const todo = new Todo({
        heading,uid
      })
      const result = await todo.save();
      res.json({ok:true,todo:result})
    } catch (e) {
      //console.log(e);
      res.json({ok:false,msg:"An error occured!"});
    }
  }
  async updateTodo(req,res){
    try {
      const uid = req.session.uid;
      const {id} = req.params;
      const {heading} = req.body;
      const result = await Todo.findOneAndUpdate({_id:id,uid},{
        heading
      },{new:true});
      res.json({ok:true,todo:result});
    } catch (e) {
      //console.log(e);
      res.json({ok:false,msg:"An error occured!"});
    }
  }
  async updateComplete(req,res){
    try {
      const uid = req.session.uid;
      const {id} = req.params;
      
      const result = await Todo.findOneAndUpdate({_id:id,uid},{
        isComplete: true
      },{new:true});
      res.json({ok:true,todo:result});
    } catch (e) {
      //console.log(e);
      res.json({ok:false,msg:"An error occured!"});
    }
  }
  async deleteTodo(req,res){
    try {
      const uid = req.session.uid;
      const {id} = req.params;
      const result = await Todo.findOneAndDelete({_id:id,uid});
      res.json({ok:true,todo:result});
    } catch (e) {
      //console.log(e);
      res.json({ok:false,msg:"An error occured!"});
    }
  }
}

const obj = new Controller();

module.exports = {
  getTodo: obj.getTodo,
  addTodo: obj.addTodo,
  updateTodo: obj.updateTodo,
  deleteTodo: obj.deleteTodo,
  updateComplete: obj.updateComplete
}