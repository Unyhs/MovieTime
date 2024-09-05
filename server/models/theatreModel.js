const mongoose=require('mongoose')

const theatreSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        min:1000000000,
        max:9999999999
    },
    email:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    isActive:{
        type:Boolean,
        required:true,
        default:false
    }},
    {timestamps:true}
)

const theatreModel=mongoose.model("theatres",theatreSchema)

module.exports=theatreModel