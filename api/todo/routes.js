const router = require('express').Router();
const {getTodo,addTodo,updateTodo,updateComplete,deleteTodo} = require('./controller.js');
const {validation,validateTodo,auth} = require('./middleware.js');

router.get('/',auth,getTodo);
router.post('/',auth,validation(),validateTodo,addTodo);
router.patch('/:id',auth,updateTodo);
router.patch('/complete/:id',auth,updateComplete);
router.delete('/:id',auth,deleteTodo);

module.exports = router;