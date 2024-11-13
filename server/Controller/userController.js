const userModel=require('../models/userModel')
const jwt=require('jsonwebtoken')
const {sendEmail}=require('../utils/emailService')
const bcrypt=require('bcrypt')
const saltRounds=10

const registerNewUser=async(req,res)=>{
    try{
        const userExists=await userModel.findOne({email:req.body.email})
        if(userExists) return res.send({success:false,message:"Email already exists"})
        
        const hashedPW=await bcrypt.hash(req.body.password,saltRounds)
        const newUser=new userModel({...req.body,password:hashedPW})
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
        const isMatch=await bcrypt.compare(req.body.password,userExists.password)
        if(!isMatch) return res.send({success:false,message:"Incorrect Password."})
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

const otpGenerator=()=>{
    return Math.floor(100000+Math.random()*900000)
}

const forgotPassword=async(req,res)=>{
    try{
        if(req.body.email===undefined)
        {
            return res.status(400).json({success:false,message:"Email is required"})
        }   
        const user=await userModel.findOne({email:req.body.email})
        if(user===null)
        {
            return res.status(401).json({success:false,message:"No user with given email id exists"})
        }
        const otp=otpGenerator()
        user.otp=otp
        user.otpExpiry=Date.now()+1000*60*10
        await user.save()
        await sendEmail(req.body.email, "Password Reset Email OTP","otp.html",{name:user.name, otp:user.otp})
        return res.status(200).json({success:true,message:"OTP sent to givem email id "})

    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}

const resetPassword=async(req,res)=>{
    try{
        const {otp,password,email}=req.body
        if(!password||!otp|| !email)
        {
            return res.status(401).json({success:false,message:"Email,OTP and Password are all required"})
        }
        const user=await userModel.findOne({email:email})
        if(!user)
        {
            return res.status(402).json({success:false,message:`No user exists for Email ID: ${email}`})
        }
        if(!user.otp)
        {
            return res.status(403).json({success:false,message:"OTP not generated"})
        }
        if(user.otp && user.otp!==otp)
        {
            return res.status(405).json({success:false,message:"OTP Mismatch"})
        }

        if(user.otp && user.otp===otp && user.otpExpiry < Date.now())
        {
            return res.status(406).json({success:false,message:"OTP expired"})
        }

        user.password=await bcrypt.hash(password,saltRounds)
        user.otp=undefined
        user.otpExpiry=undefined
        await user.save()

        return res.status(200).json({success:true,message:"Password reset succesfully"})
    }catch(err){
        return res.status(500).json({success:false,message:err.message})
    }
}


module.exports={registerNewUser,loginUser,getCurrentUser,forgotPassword,resetPassword}