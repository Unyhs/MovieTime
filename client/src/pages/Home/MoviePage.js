import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import loaderSlice from '../../Redux/loaderSlice'
import { getMovieById } from '../../api/movies'
import {getAllShowsMoviesView} from '../../api/shows'
import {Button, Col, message} from 'antd'
import Loader from '../../Components/loader'
import { Form,Descriptions,Input,List,Card} from 'antd';
import {CalendarOutlined} from '@ant-design/icons'
import moment from 'moment'


  const imageStyle = {
    width: '90%', // Scale the width to 100% of the Sider
    height: '90%', // Scale the height to 100% of the Sider
    objectFit: 'contain', // Ensure the image fits within the container while maintaining its aspect ratio
    whiteSpace:'nowrap'
};

const buttonStyle={
    cursor:'pointer',
    color:'orange',
    transition:'all 0.1s ease-in',
}

const {showLoading,hideLoading}=loaderSlice.actions

function MoviePage() {
    const {movieId,currDate}=useParams()
    const [currMovie,setCurrMovie]=useState()
    const [selectedDate,setSelectedDate]=useState(moment(currDate).format('YYYY-MM-DD'))
    const [theatres,setTheatres]=useState([])
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const loader=useSelector(store=>store.loaderState.loading)
    const user=useSelector(store=>store.userState.user)

    useEffect(()=>{
        const getData=async()=>{
            try{
                dispatch(showLoading())
                const response=await getMovieById(movieId)
                if(response.success)
                {
                    let movie=response.data
                    setCurrMovie(movie)
                }
                else
                {
                    message.error(response.message)
                }
                dispatch(hideLoading())
            }catch(err){
                message.error(err.message)
                dispatch(hideLoading())
            }
        }
        getData()
    },[])

    useEffect(()=>{
        const getAllTheatresForMovieAndDate=async()=>{
            try{
                dispatch(showLoading())
                const response=await getAllShowsMoviesView({movie:movieId,date:selectedDate})
    
                if(response.success)
                {
                    setTheatres(response.data)
                }else
                {
                    message.error(response.message)
                }
                dispatch(hideLoading())
            }catch(err){
                message.error(err.message)
                dispatch(hideLoading())
            }
        }
        if(currMovie)
      {getAllTheatresForMovieAndDate()}
    },[selectedDate,currMovie])

    const handleDate=(e)=>{
        if(e.target.value!=='')
        {
            setSelectedDate(moment(e.target.value).format('YYYY-MM-DD'));
            navigate(`/movies/${movieId}/${e.target.value}`);
        } 
    }

    const items=[
        {key:'1', label:'Genre',children:currMovie && currMovie.genre},
        {key:'2', label:'Language',children:currMovie && currMovie.language},
        {key:'3', label:'Duration',children:currMovie &&`${currMovie.duration} mins`},
        {key:'4', label:'Description',children:currMovie && currMovie.description},
    ]

  return (
    <div>
      {loader ? (<Loader />) : (currMovie && 
        (<div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <div>
                <h2>{currMovie && currMovie.title}</h2>
            </div>
            <div style={{display:'flex',width:'80%',gap:'50px'}}>
                    <div style={{width:'20%'}}>
                        <img src={currMovie.poster} style={imageStyle}/>
                    </div>
                    <div style={{display:'flex',flexDirection:'column', alignItems:'center'}}>
                        <Descriptions 
                        layout="horizontal" 
                        bordered
                        column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3, xxl: 3 }}
                        labelStyle={{
                            color:'black',
                            backgroundColor:'snow'
                        }}
                        contentStyle={{
                            whiteSpace:'nowrap'
                        }}
                        items={items} />
                        <br/>
                        <br/>
                        <br/>
                        <div style={{width:'50%',display:'flex'}}>
                        <label style={{width:'50%'}}>Choose the date:</label>
                        <Input
                        onChange={handleDate}
                        type="date"
                        value={selectedDate}
                        defaultValue={selectedDate}
                        min={moment().format('YYYY-MM-DD')}
                        style={{width:'50%'}}
                        prefix={<CalendarOutlined />}/>
                        </div>
                    </div>
            </div>
            <div style={{width:'fit-content',display:'flex',padding:'25px'}}>
                {theatres.length===0 && <h2>No theatres are showing this movie on given date.</h2>}
                {theatres.length>0 && (
                <>
                <List
                    grid={{
                    column: theatres.length,
                    gutter:16
                    }}
                    dataSource={theatres}
                    rowKey={'_id'}
                    renderItem={(item) => (
                    <List.Item>
                        <Card title={item.name}>{item.shows.map(show=>(
                            <Button 
                            key={show._id}
                            className='button-show'
                            onClick={()=>{
                                if(user.role==='user')
                                {
                                navigate(`/bookShow/${show._id}/${selectedDate}`)
                                }else
                                {
                                    message.error('Ticket Booking is not allowed for partner/admin.')
                                }
                                }}>
                                {moment(show.time,'HH:mm').format('hh:mm A')}
                            </Button>
                            ))}</Card>
                    </List.Item>
                    )}
                />
                </>)}
            </div>
        </div>)
      )}
    </div>
  )
}

export default MoviePage