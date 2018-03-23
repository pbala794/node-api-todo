var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
   name: {
       type: String,
       required: 'You must give a name to Your task'
   },
   completed: {
       type: Boolean,
       default: false
   },
   created_date: {
       type: Date,
       default: Date.now
   }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;