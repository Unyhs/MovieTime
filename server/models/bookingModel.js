const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    show:{type:mongoose.Schema.Types.ObjectId,ref:'shows',required:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
    seats:{type:Array,required:true},
    transactionId:{type:String,required:true},
    bookingDate:{type:Date,required:true}
})

const bookingModel=mongoose.model('bookings', bookingSchema)

module.exports=bookingModel