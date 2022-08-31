const {Schema,model} = require('mongoose');

const todoSchema = new Schema({
  heading: {type: String},
  isComplete: {
    type: Boolean,default: false
  },
  uid: String,
  date: {
    type: Date,default: Date.now
  }
});

const Todo = model('Todo',todoSchema);

module.exports = Todo;