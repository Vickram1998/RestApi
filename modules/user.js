const mongoose= require('mongoose')

const Schema=mongoose.Schema;

const Userschema= new Schema({
    name:{type:String},
    email:{type:String },
    password:{type:String},
},{timestamps:true})

const User = mongoose.model("User",Userschema)
 
module.exports=User