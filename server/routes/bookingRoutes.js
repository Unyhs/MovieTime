const express=require('express')
const bookingRouter=express.Router()
const authMiddleware=require("../Middleware/authMiddleware")
const {makePayment,bookShowTickets,getAllBookings,sendBookingEmail}=require('../Controller/bookingController')


bookingRouter.post("/makePayment",authMiddleware,makePayment)
bookingRouter.post('/bookShowTickets',authMiddleware,bookShowTickets)
bookingRouter.get('/getAllBookings/:userId',authMiddleware,getAllBookings)
bookingRouter.get('/sendBookingEmail/:bookingId',sendBookingEmail)


module.exports=bookingRouter