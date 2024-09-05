const express=require('express')
const showRouter=express.Router()
const {addShow,deleteShow,updateShow,getAllShowsByTheatreId,getShowByShowId,getAllShowsMoviesView}=require('../Controller/showController')

showRouter.post('/addShow',addShow)
showRouter.delete('/deleteShow/:showId',deleteShow)
showRouter.put('/updateShow',updateShow)
showRouter.get('/getAllShowsByTheatreId/:theatreId',getAllShowsByTheatreId)
showRouter.get('/getShowByShowId/:showId',getShowByShowId)
showRouter.get('/getAllShowsMoviesView/:movie/:date',getAllShowsMoviesView)

module.exports=showRouter