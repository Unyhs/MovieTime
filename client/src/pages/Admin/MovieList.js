import React, { useEffect, useState } from 'react'
import { Table,Button } from 'antd';
import moment from 'moment'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import loaderSlice from '../../Redux/loaderSlice'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMovies } from '../../api/movies';
import MovieForm from './MovieForm';
import DeleteMovieModal from './DeleteMovieModal';
import Loader from '../../Components/loader';

const {hideLoading,showLoading}=loaderSlice.actions

function MovieList() {
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [movies,setMovies]=useState([])
  const [selectedMovie,setSelectedMovie]=useState(null)
  const [formType,setFormType]=useState("Add")
  const [isDltModalOpen,setIsDltModalOpen]=useState(false)
  const dispatch=useDispatch()
  const loader=useSelector(store=>store.loaderState.loading)
  const tableHeaders=[
    {title:"",dataIndex:"poster",render:((text,data)=>
      (<img 
        src={data.poster}
        alt='image'
        style={{objectFit:'cover'}}
        height="75" 
        width="60"/>)
      )},
    {title:"Movie Name", dataIndex:"title"},
    {title:"Description", dataIndex:"description"},
    {title:"Duration", dataIndex:"duration",render:(text)=>`${text} mins`},
    {title:"Genre", dataIndex:"genre"},
    {title:"Language", dataIndex:"language"},
    {title:"Release Date", dataIndex:"releaseDate",render:(text,data)=>(moment(data.releaseDate).format('DD-MM-YYYY'))},
    {title:"Action",render:(text,data)=>(
      <>
        <Button onClick={()=>{
            setIsModalOpen(true)
            setSelectedMovie(data)
            setFormType("Edit")
          }}>
          <EditOutlined  />
        </Button>
        <Button onClick={()=>{
            setIsDltModalOpen(true)
            setSelectedMovie(data)
          }}>
          <DeleteOutlined  />
        </Button>
      </>
    )}
  ]

  const getData=async()=>{
    try{
      dispatch(showLoading())
      const response=await getAllMovies()
      const allMovies=response.data
      setMovies(allMovies.map(ele=>{
        return {...ele,key:ele._id}
      }))
      dispatch(hideLoading())
    }catch(err)
    {
      console.log(err.message)
    } 
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
    {(loader)? <Loader /> : 
    
    <div>
      <Button onClick={()=>{
        setIsModalOpen(true)
        setFormType("Add")
      }}>
        Add Movie
      </Button>
      <Table dataSource={movies} columns={tableHeaders} />

      {isModalOpen && (<MovieForm 
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      selectedMovie={selectedMovie}
      setSelectedMovie={setSelectedMovie}
      formType={formType}
      getData={getData} 
      />)}

    {isDltModalOpen && (<DeleteMovieModal
      isDltModalOpen={isDltModalOpen}
      setIsDltModalOpen={setIsDltModalOpen}
      selectedMovie={selectedMovie}
      setSelectedMovie={setSelectedMovie}
      getData={getData} 
      />)}
    </div>
}
    </>
  )
}

export default MovieList