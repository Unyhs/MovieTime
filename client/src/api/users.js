const {axiosInstance}=require('./index')

export const registerUser=async(value)=>{
    try{
        const response=await axiosInstance.post('/api/users/register',value)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const login=async(value)=>{
    try{
        const response=await axiosInstance.post('/api/users/login',value)
        return response.data
    }catch(err){
        console.log(err)
    }
}

export const getCurrentUser=async()=>{
    try{
        const response=await axiosInstance.get('/api/users/getCurrentUser')
        return response.data
    }catch(err){
        console.log(err)
    }
}