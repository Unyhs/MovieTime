const movieModel=require('../models/movieModel')

const addMovie=async(req,res)=>{
    try{
        const newMovie=new movieModel(req.body)
        await newMovie.save()
        res.send({success:true,message:"A new movie has been created"})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

const getAllMovies=async(req,res)=>{
    try{
        const allMovies=await movieModel.find()
        res.send({success:true,data:allMovies,message:"All movies have been fetched"})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

const updateMovie=async(req,res)=>{
    try{
        await movieModel.findByIdAndUpdate(req.body.movieId,req.body)
        res.send({success:true,message:"The movie has been updated"})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

const deleteMovie=async(req,res)=>{
    try{
        await movieModel.findByIdAndDelete(req.body.movieId)
        res.send({success:true,message:"The movie has been deleted"})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

module.exports={addMovie,getAllMovies,updateMovie,deleteMovie}