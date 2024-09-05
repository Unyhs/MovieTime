const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')

const registerNewUser=async(req,res)=>{
    try{
        const userExists=await userModel.findOne({email:req.body.email})
        if(userExists) return res.send({success:false,message:"Email already exists"})

        const newUser=new userModel(req.body)
        await newUser.save()
        return res.send({success:true,message:`User with email ${newUser.email} is registered succesfully`})
    }catch(err){
        return res.status(400).json({message:err.message})
    }   
}

const loginUser=async(req,res)=>{
    try{
        const userExists=await userModel.findOne({email:req.body.email})
        if(!userExists) return res.send({success:false,message:"User not found. Please register."})
        if(userExists.password!==req.body.password) return res.send({success:false,message:"Incorrect Password."})
        const token=jwt.sign({userId:userExists._id},process.env.jwt_secret,{expiresIn:'1d'})
        return res.send({success:true,message:`You have been logged in.`,data:token})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

const getCurrentUser=async(req,res)=>{
    try{
    const user=await userModel.findById(req.body.userId).select("-password")
    res.send({success:true,data:user,message:"You are authorized"})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

module.exports={registerNewUser,loginUser,getCurrentUser}