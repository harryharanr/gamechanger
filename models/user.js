const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {type:String , required:true},
    username : {type:String , required:true , unique:true},
    password: {type:String , required:true},
    hospitalName : {type:String},
    hospitalId:{type:String},
    branchName: {type:String},
    branchId:{type:String},
    userType: {type:String}
},{collection:'user'});

module.exports = mongoose.model('user' , userSchema);