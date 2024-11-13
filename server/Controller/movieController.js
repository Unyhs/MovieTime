const movieModel=require('../models/movieModel')
const showModel = require('../models/showModel')

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
        //check if any shows exist for given movie Id
        const shows=await showModel.find({movie:req.body.movieId})
        if(shows.length>0)
        {
           const totalBookedSeats=shows.reduce((sum,ele)=>sum+ele.bookedSeats.length,0)
           if(totalBookedSeats>0)
           {
                return res.send({success:false,message:"The movie cannot be deleted now as tickets have been booked"})
           }else
           {
                const showId=shows.map(show=>show._id)
                await showModel.deleteMany({_id:{$in:showId}})
           }
        }
        await movieModel.findByIdAndDelete(req.body.movieId)
        res.send({success:true,message:"The movie has been deleted along with its shows"})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

const getMovieById=async(req,res)=>{
    try{
        const movieExists=await movieModel.findById(req.params.movieId)
        res.send({success:true,message:"The movie has been fetched",data:movieExists})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

module.exports={addMovie,getAllMovies,updateMovie,deleteMovie,getMovieById}