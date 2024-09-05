const express=require('express')
const theatreRouter=express.Router()
const {addTheatre,updateTheatre,deleteTheatre,getAllTheatres,getAllTheatresByOwnerId}=require('../Controller/theatreController')

theatreRouter.get('/getAllTheatres',getAllTheatres)
theatreRouter.post('/addTheatre',addTheatre)
theatreRouter.put('/updateTheatre',updateTheatre)
theatreRouter.delete('/deleteTheatre/:theatreId',deleteTheatre)
theatreRouter.get('/getAllTheatresByOwnerId/:ownerId',getAllTheatresByOwnerId)

module.exports=theatreRouter