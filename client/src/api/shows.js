import { axiosInstance } from "./index";

export const addShow=async(value)=>{
    try{
        const response=await axiosInstance.post('/api/shows/addShow',value)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const deleteShow=async(showId)=>{
    try{
        const response=await axiosInstance.delete(`/api/shows/deleteShow/${showId}`)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const updateShow=async(value)=>{
    try{
        const response=await axiosInstance.put('/api/shows/updateShow',value)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const getAllShowsByTheatreId=async(value)=>{
    try{
        const response=await axiosInstance.get(`/api/shows/getAllShowsByTheatreId/${value.theatreId}`)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const getShowByShowId=async(value)=>{
    try{
        const response=await axiosInstance.get(`/api/shows/getShowByShowId/${value.showId}`)
        return response.data
    }catch(err){
        console.log(err)
    }
}
export const getAllShowsMoviesView=async({movie,date})=>{
    try{
        const response=await axiosInstance.get(`/api/shows/getAllShowsMoviesView/${movie}/${date}`)
        return response.data
    }catch(err){
        console.log(err)
    }
}