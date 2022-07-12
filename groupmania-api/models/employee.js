const mongoose= require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const employeeShema = mongoose.Schema({
  email : { type : String, required : true, unique : true},
  password : { type : String, required : true},
  name :{ type : String , required : true},
  admin :{ type : Boolean , required : false,default :false}
});

employeeShema.plugin(uniqueValidator);

module.exports = mongoose.model('Employee',employeeShema);