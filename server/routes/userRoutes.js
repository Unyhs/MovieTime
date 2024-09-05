const express=require('express')
const userRouter=express.Router()
const {loginUser, registerNewUser,getCurrentUser} =require( '../Controller/userController')
const authMiddleware=require('../Middleware/authMiddleware')

userRouter.post("/register",registerNewUser)
userRouter.post("/login",loginUser)
userRouter.get('/getCurrentUser', authMiddleware, getCurrentUser)

module.exports=userRouter