const express=require('express')
const app=express()
app.set('trust proxy', 'loopback');
const rateLimit = require("express-rate-limit");
const helmet=require('helmet')
const mongoSanitize=require('express-mongo-sanitize')

//DB Connection
require ('dotenv').config()
const connectDB=require("./config/db")
connectDB();


const apiLimiter=rateLimit({
    windowMs:15*60*1000,
    max:100,
    message:"Too many requests from this IP, please try again after 15 minutes",
})

//middlewares
app.use(express.json())
app.use(helmet())
app.use(mongoSanitize())

//entity routers
const userRouter=require("./routes/userRoutes")
const movieRouter=require('./routes/movieRoutes')
const theatreRouter=require('./routes/theatreRoutes')
const showRouter=require('./routes/showRoutes')
const bookingRouter = require('./routes/bookingRoutes')

//rate limiter middleware
app.use('/api',apiLimiter)

//all calls for entities will go through here
app.use("/api/users",userRouter)
app.use("/api/movies",movieRouter)
app.use("/api/theatres",theatreRouter)
app.use("/api/shows",showRouter)
app.use("/api/bookings",bookingRouter)

//listening to requests
const serverPort=8082
app.listen(serverPort,()=>{
    console.log(`Server is running at port ${serverPort}`)
})
