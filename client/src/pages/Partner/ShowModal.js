import React, { useEffect, useState} from 'react'
import loaderSlice from '../../Redux/loaderSlice'
import { Button, Form, message, Modal, Table } from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import { getAllMovies } from '../../api/movies'
import { getAllShowsByTheatreId } from '../../api/shows'
import Loader from '../../Components/loader'
import moment from 'moment'

const {showLoading,hideLoading}=loaderSlice.actions

function ShowModal({isShowModalOpen,setIsShowModalOpen,selectedTheatre,setSelectedTheatre}) {
    const loader=useSelector(store=>store.loaderState.loading)
    const dispatch=useDispatch()

    const [view,setView]=useState('list')
    const [movies,setMovies]=useState(null)
    const [selectedMovie,setSelectedMovie]=useState(null)
    const [shows,setShows]=useState(null)
    const [selectedShow,setSelectedShow]=useState(null)


    const getData=async()=>{
        try{

            const movieResponse=await getAllMovies()
            if(movieResponse.success)
            {
                setMovies(movieResponse.data)
            }
            else
            {
                message.error(movieResponse.message)
            }

            const showResponse=await getAllShowsByTheatreId({theatreId:selectedTheatre._id})
            if(showResponse.success)
            {
                setShows(showResponse.data)
            }else
            {
                message.error(showResponse.message)
            }
        }catch(err){
            console.log(err.message)
        }
    }

    useEffect(()=>{
        getData()
    },[])

    const onFinish=async()=>{
        setIsShowModalOpen(false)
    }

    const onCancel=()=>{
        setIsShowModalOpen(false)
        setSelectedTheatre(null)
    }

    const tableCols=[
        {
          title: "Show Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Show Date",
          dataIndex: "date",
          render: (text, data) => {
            return moment(text).format("MMM Do YYYY");
          },
        },
        {
          title: "Show Time",
          dataIndex: "time",
          render: (text, data) => {
            return moment(text, "HH:mm").format("hh:mm A");
          },
        },
        {
          title: "Movie",
          dataIndex: "movie",
          render: (text, data) => {
            return data.movie.title;
          },
        },
        {
          title: "Ticket Price",
          dataIndex: "ticketPrice",
          key: "ticketPrice",
        },
        {
          title: "Total Seats",
          dataIndex: "totalSeats",
          key: "totalSeats",
        },
        {
          title: "Available Seats",
          dataIndex: "seats",
          render: (text, data) => {
            return data.totalSeats - data.bookedSeats.length;
          },
        },
      ];

  return (
    <div>
        {
        loader ? <Loader /> :
        <Modal 
        open={isShowModalOpen}
        title={selectedTheatre.name}
        onCancel={onCancel}
        footer={null}
        >
        <div>
        <h3>{view==='list' ? "List of Shows" : view==='add' ? "Add Show" : "Edit Show"}</h3>
        {view==='list' && <Button type='primary' onClick={()=>{setView('add')}}>Add Show</Button>}
        </div>
        <div>{view==='list' && <Table dataSource={shows} columns={tableCols} />}</div>
        <div>
        {
        (view==='add' || view==='edit') && 
        <Form 
        layout='vertical'
        initialValues={(view==='edit')? selectedShow:null}
        onFinish={onFinish}
        >
        <Form.Item></Form.Item>
        </Form>
            
        }</div>
        

        </Modal>
        }
    </div>
  )
}

export default ShowModal