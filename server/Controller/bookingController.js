const bookingModel=require('../models/bookingModel')
const showModel = require('../models/showModel')
const movieModel=require('../models/movieModel')
const { getShowByShowId } = require('./showController')
const { sendEmail } = require('../utils/emailService')
const stripe=require("stripe")(process.env.STRIPE_KEY)

const makePayment=async(req,res)=>{
    try{
        const {token,amount}=req.body
    
        const customer=await stripe.customers.create({
            email:token.email,
            source:token.id
        })

        const paymentIntent=await stripe.paymentIntents.create({
            amount:amount,
            currency:'usd',
            customer:customer.id,
            payment_method_types:['card'],
            receipt_email:token.email,
            description:"Payment for Booking movie ticket",
            confirm:true,
        })

        const transactionId=paymentIntent.id

        res.send({
            success:true,
            message:'Payment successful',
            data:transactionId
        })
    }catch(err){
        res.send({
            status:500,
            success:false,
            message:err.message
        })
    }
}

const bookShowTickets=async(req,res)=>{
    try{
        const newBooking =new bookingModel(req.body) 
        await newBooking.save()
        const show=await showModel.findById(req.body.show).populate('movie')
        const updatedBookedSeats=[...show.bookedSeats,...req.body.seats]
        await showModel.findByIdAndUpdate(show._id,{bookedSeats:updatedBookedSeats})
        const populatedBooking=await bookingModel.findById(newBooking._id)
        .populate('user')
        .populate('show')
        .populate({path:'show',
            populate:{
                path:'movie',
                model:'movies'
        }})
        .populate({path:'show',
            populate:{
            path:'theatre',
            model:'theatres'
        }
        })

        await sendEmail(populatedBooking.user.email, `Tickets for ${populatedBooking.show.movie.title}`,"ticket_template.html",
            {
                movie:populatedBooking.show.movie.title,
                name:populatedBooking.user.name,
                theatre:populatedBooking.show.theatre.name,
                date:populatedBooking.show.date,
                time:populatedBooking.show.time,
                seats:populatedBooking.seats,
                amount:populatedBooking.seats.length*populatedBooking.show.price,
                transactionId:populatedBooking.transactionId
            }
        )

        res.send({
            success:true,
            message:"Booking successful",
            data:newBooking
        })
    }catch(err)
    {
        res.send({
            status:500,
            success:false,
            message:err.message
        })
    }
}

const sendBookingEmail=async(req,res)=>{
    try{
        const populatedBooking=await bookingModel.findById(req.params.bookingId)
        .populate('user')
        .populate('show')
        .populate({path:'show',
            populate:{
                path:'movie',
                model:'movies'
        }})
        .populate({path:'show',
            populate:{
            path:'theatre',
            model:'theatres'
        }
        })

        await sendEmail(populatedBooking.user.email, `Tickets for ${populatedBooking.show.movie.title}`,"ticket_template.html",
            {
                movie:populatedBooking.show.movie.title,
                name:populatedBooking.user.name,
                theatre:populatedBooking.show.theatre.name,
                date:populatedBooking.show.date,
                time:populatedBooking.show.time,
                seats:populatedBooking.seats,
                amount:populatedBooking.seats.length*populatedBooking.show.price,
                transactionId:populatedBooking.transactionId
            }
        )

        res.send({
            success:true,
            message:`Tickets have been forwarded succesfully to registered email id ${populatedBooking.user.email}`,
            data:populatedBooking
        })
    }catch(err)
    {
        res.send({
            status:500,
            success:false,
            message:err.message
        })
    }
}

const getAllBookings=async(req,res)=>{
    try{
        const bookings=await bookingModel.find({user:req.params.userId})
        .populate('user')
        .populate('show')
        .populate({path:'show',
            populate:{
                path:'movie',
                model:'movies'
        }})
        .populate({path:'show',
            populate:{
            path:'theatre',
            model:'theatres'
        }
        })

        res.send({
            success:true,
            message:"All bookings fetched for the given user",
            data:bookings
        })
    }catch(err){
        res.send({
            status:500,
            message:err.message,
            success:false
        })
    }
}

module.exports={makePayment,bookShowTickets,getAllBookings,sendBookingEmail}