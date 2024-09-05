const showModel=require('../models/showModel')

const addShow=async(req,res)=>{
    try{
        const newShow=new showModel(req.body)
        await newShow.save()
        res.send({success:true,message:"A new show has been created"})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

const deleteShow=async(req,res)=>{
    try{
        const show=await showModel.findById(req.params.showId)
        if(!show) res.send({success:false,message:"No show exists for the given id"})
        await showModel.findByIdAndDelete(req.params.showId)
        res.send({success:true,message:"The show corresponding to given Id has been deleted"})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

const updateShow=async(req,res)=>{
    try{
        const show=await showModel.findById(req.body.showId)
        if(!show) res.send({success:false,message:"No show exists for the given id"})
        const updated=await showModel.findByIdAndUpdate(req.body.showId,req.body,{new:true})
        res.send({success:true,message:"The show corresponding to given Id has been updated",data:updated})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

const getShowByShowId=async(req,res)=>{
    try{
        const showId=req.params
        const queryShow=await showModel.findById(showId).populate('movie').populate('theatre')
        res.send({
            success:true,
            message:"show by showId fetched",
            data:queryShow
        })
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

const getAllShowsByTheatreId=async(req,res)=>{
    try{
        const shows=await showModel.find({theatre:req.params.theatreId}).populate('movie')
        console.log(shows)
        res.send({success:true,message:"All shows pertaining to given theatreId fetched",data:shows})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

const getAllShowsMoviesView=async(req,res)=>{
    //will give all shows of a given movie on a particular date sorted by the theatre
    try{
    const {currmovie,currdate}=req.params
    let uniqueTheatres=[]
    const shows=await showModel.find({movie:currmovie,startDate:{$lte:currdate},endDate:{$gte:currdate}}).populate('movie')
    shows.forEach(ele=>{
        let isThere=uniqueTheatres.find(t=>{ele.theatre._id===t._id})
        if(!isThere)
        {
            let showOfTheatres=shows.filter(s=>{s.theatre._id===ele.theatre._id})
            uniqueTheatres.push({...ele.theatre._id,shows:showOfTheatres})
        }
    })
    console.log(uniqueTheatres)
    res.send({success:true,message:"All theatre shows pertaining to given movie fetched",data:uniqueTheatres})
    }catch(err)
    {
        return res.status(400).json({message:err.message})
    }
}

module.exports={addShow,deleteShow,updateShow,getAllShowsByTheatreId,getShowByShowId,getAllShowsMoviesView}