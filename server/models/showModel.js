const mongoose=require('mongoose')

const showSchema=new mongoose.Schema({
    name:{type:String, required:true},
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true},
    time:{type:String, required:true},
    movie:{type:mongoose.Schema.Types.ObjectId,ref:'movies'},
    theatre:{type:mongoose.Schema.Types.ObjectId,ref:'theatres'},
    price:{type:Number,required:true},
    seats:{type:Number,required:true},
    bookedSeats:{type:Number,required:true},
},{timestamps:true})

const showModel=mongoose.model('shows',showSchema)

module.exports=showModel