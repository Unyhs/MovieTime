const {axiosInstance}=require('./index')

export const makePayment=async(value)=>{
    try{
        const response=await axiosInstance.post('/api/bookings/makePayment',value)
        return response.data
    }catch(err){
        console.log(err.message)
    }
}

export const bookShowTickets=async(value)=>{
    try{
        const response=await axiosInstance.post('/api/bookings/bookShowTickets',value)
        return response.data
    }catch(err)
    {
        console.log(err.message)
    }
}

export const getAllBookings=async(userId)=>{
    try{
        const response=await axiosInstance.get(`/api/bookings/getAllBookings/${userId}`)
        return response.data
    }catch(err)
    {
        console.log(err.message)
    }
}

export const sendBookingEmail=async(bookingId)=>{
    try{
        const response=await axiosInstance.get(`/api/bookings/sendBookingEmail/${bookingId}`)
        return response.data
    }catch(err)
    {
        console.log(err.message)
    }
}

