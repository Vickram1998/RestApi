const express=require("express")
const {body,validationResult}=require('express-validator')
const User= require('../modules/user')
const PostUser= require("../modules/post")
const bcrypt = require('bcrypt'); 
const { message } = require("statuses");
var jwt = require('jsonwebtoken');
const secret ="RestAPI"


const router=express.Router();

router.get('/',async(req,res)=>{
    const post =await PostUser.find();
    const userName=await User.findById(post._id)
    console.log(userName)
    res.json({
        status:'sucess',
        post
    })
})

router.post('/',async(req,res)=>{
    
    const posts = await PostUser.create({
        title:req.body.title,
        body:req.body.body,
        user:req.user

    });
    res.json({
        status:"Sucess",
        posts
    })
})

router.put('/',async(req,res)=>{
    try{
        const user = req.params.postId ;
        const update = await PostUser.updateOne({user},{
            title:req.body.title,
            body:req.body.body,
        });
        res.json({
            status:"Sucess",
            update
        })

    }catch(e){
        res.status(400),
        res.json({
            status:failed,
            message:e.message
        })
    }
})
router.delete('/',async(req,res)=>{
    try{
        const user = req.params.postId ;
        const deletedPost = await PostUser.findByIdAndDelete(user);
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
          }
        res.json({
            status:"Sucess",
            message:"Post Deleted sucessfull"
        })

    }catch(e){
        res.status(400),
        res.json({
            status:failed,
            message:e.message
        })
    }
})


module.exports= router