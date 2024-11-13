const theatreModel=require('../models/theatreModel')
const showModel=require('../models/showModel')

const addTheatre=async(req,res)=>{
    try{
        const newTheatre=new theatreModel(req.body)
        await newTheatre.save()
        res.send({success:true,message:"A new theatre has been created"})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

const getAllTheatres=async(req,res)=>{
    try{
        const allTheatres=await theatreModel.find().populate('owner')
        res.send(
            {success:true,
            data:allTheatres,
            message:"All theatres have been fetched"})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

const updateTheatre=async(req,res)=>{
    try{
        console.log("server try")
        const updated=await theatreModel.findByIdAndUpdate(req.body._id,req.body,{new:true})
        console.log(updated)
        res.send({success:true,message:"The theatre has been updated"})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

const deleteTheatre=async(req,res)=>{
    try{
        const shows=await showModel.find({theatre:req.params.theatreId})
        if(shows.length>0)
        {
           const totalBookedSeats=shows.reduce((sum,ele)=>sum+ele.bookedSeats.length,0)
           if(totalBookedSeats>0)
           {
                return res.send({success:false,message:"The theatre cannot be deleted now as tickets have been booked"})
           }else
           {
                const showId=shows.map(show=>show._id)
                await showModel.deleteMany({_id:{$in:showId}})
           }
        }
        await theatreModel.findByIdAndDelete(req.params.theatreId)
        res.send({success:true,message:"The theatre has been deleted along with the shows"})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

const getAllTheatresByOwnerId=async(req,res)=>{
    try{
        const theatresByOwnerId=await theatreModel.find({owner:req.params.ownerId})
        res.send({
            success:true,
            data:theatresByOwnerId,
            message:"All theatres ownded by owner have been fetched"
        })
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}


module.exports={addTheatre,updateTheatre,deleteTheatre,getAllTheatres,getAllTheatresByOwnerId}