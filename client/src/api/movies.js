const {axiosInstance}=require('./index')

export const addMovie=async(value)=>{
    try{
        const response=await axiosInstance.post('/api/movies/addMovie',value)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const getAllMovies=async()=>{
    try{
        const response=await axiosInstance.get('/api/movies/getAllMovies')
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const updateMovie=async(value)=>{
    try{
        const response=await axiosInstance.put('/api/movies/updateMovie',value)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const deleteMovie=async(value)=>{
    try{
        const response=await axiosInstance.put('/api/movies/deleteMovie',value)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const getMovieById=async(movieId)=>{
    try{
        const response=await axiosInstance.get(`/api/movies/getMovieById/${movieId}`)
        return response.data
    }catch(err){
        console.log(err)
    }
}