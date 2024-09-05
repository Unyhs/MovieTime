const express=require('express')
const app=express()

//middlewares
app.use(express.json())

//DB Connection
require ('dotenv').config()
const connectDB=require("./config/db")
connectDB();

//entity routers
const userRouter=require("./routes/userRoutes")
const movieRouter=require('./routes/movieRoutes')
const theatreRouter=require('./routes/theatreRoutes')
const showRouter=require('./routes/showRoutes')

//all calls for users will go through here
app.use("/api/users",userRouter)
app.use("/api/movies",movieRouter)
app.use("/api/theatres",theatreRouter)
app.use("/api/shows",showRouter)

//listening to requests
const serverPort=8082
app.listen(serverPort,()=>{
    console.log(`Server is running at port ${serverPort}`)
})
