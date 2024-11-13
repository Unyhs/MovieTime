const express=require('express')
const movieRouter=express.Router()
const {addMovie,getAllMovies,updateMovie,deleteMovie, getMovieById}=require('../Controller/movieController')

movieRouter.post('/addMovie',addMovie)
movieRouter.get('/getAllMovies',getAllMovies)
movieRouter.get('/getMovieById/:movieId',getMovieById)
movieRouter.put('/updateMovie',updateMovie)
movieRouter.put('/deleteMovie',deleteMovie)

module.exports=movieRouter