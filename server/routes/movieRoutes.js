const express=require('express')
const movieRouter=express.Router()
const {addMovie,getAllMovies,updateMovie,deleteMovie}=require('../Controller/movieController')

movieRouter.post('/addMovie',addMovie)
movieRouter.get('/getAllMovies',getAllMovies)
movieRouter.put('/updateMovie',updateMovie)
movieRouter.put('/deleteMovie',deleteMovie)

module.exports=movieRouter