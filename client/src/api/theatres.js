import { axiosInstance } from './index'

export const addTheatre=async(value)=>{
    try{
        const response=await axiosInstance.post('/api/theatres/addTheatre',value)
        return response.data
    }catch(err)
    {
        console.log(err)
    }
}

export const getAllTheatresForAdmin=async()=>{
    try{
        const response=await axiosInstance.get('/api/theatres/getAllTheatres')
        return response.data
    }catch(err)
    {
        console.log(err)
    }
}

export const updateTheatre=async(value)=>{
    try{

        const response=await axiosInstance.put('/api/theatres/updateTheatre',value)
        return response.data
    }catch(err)
    {

        console.log(err)
    }
}

export const deleteTheatre=async(theatreId)=>{
    try{
        const response=await axiosInstance.delete(`/api/theatres/deleteTheatre/${theatreId}`)
        return response.data
    }catch(err)
    {
        console.log(err)
    }
}

export const getAllTheatresByOwnerId=async(ownerId)=>{
    try{
        const response=await axiosInstance.get(`/api/theatres/getAllTheatresByOwnerId/${ownerId}`)
        return response.data
        }
    catch(err)
    {
        console.log(err)
    }
}
