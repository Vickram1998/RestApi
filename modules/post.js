const mongoose =require("mongoose")

const Schema =mongoose.Schema;
 
const postSchema=new Schema({
    title:{type:String ,required:true },
    body:{type:String ,required:true },
    user:{type:Schema.Types.ObjectId, ref:"User"}
},{timestamps:true})

const PostUser=mongoose.model("PostUser",postSchema)

module.exports= PostUser;