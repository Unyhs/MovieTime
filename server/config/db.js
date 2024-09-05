const mongoose=require('mongoose')
const dbURL=process.env.db_url;
console.log(dbURL)

const connectDB=async()=>{
    try{
        await mongoose.connect(dbURL)
        console.log("Connected to DB")
    }catch(err)
    {
        console.log(err)
    }
}

module.exports=connectDB;