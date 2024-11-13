import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import loaderSlice from '../../Redux/loaderSlice'
import { getAllBookings, sendBookingEmail } from '../../api/bookings'
import { Button, message, Table } from 'antd'
import moment from 'moment'
import {EyeOutlined,MailOutlined} from '@ant-design/icons'
import BookingPage from './BookingPage'
const {showLoading,hideLoading}=loaderSlice.actions

function MyBookings() {
    const [bookings,setBookings]=useState([])
    const [isViewModalOpen,setIsViewModalOpen]=useState(false)
    const [booking,setBooking]=useState(null)
    const user=useSelector(store=>store.userState.user)
    const dispatch=useDispatch()


    useEffect(()=>{
        const getData=async()=>{
            try{
                dispatch(showLoading())
                const response=await getAllBookings(user._id)

                if(response.success)
                {
                    const bookings=response.data
                    //message.success(response.message)
                    setBookings(bookings.map((ele,idx)=>{return {...ele,rowNum:idx+1}}))
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
        getData()
    },[])

    const handleMail=async(bookingId)=>{
        try{
            dispatch(showLoading())
            const response=await sendBookingEmail(bookingId)

            if(response.success)
            {
                message.success(response.message)
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

    const cols=[
        {title:'Serial No',dataIndex:'rowNum'},
        {title:'Movie Name',dataIndex:'show',render:((text,data)=>data.show.movie.title)},
        {title:'Date',dataIndex:'bookingDate',render:((text,data)=>(<div>{`${moment(data.bookingDate).format("MMM Do YYYY")}`}</div>))},
        {title:'Time',dataIndex:'show',render:((text,data)=>(<div>{`${moment(data.show.time, "HH:mm").format("hh:mm A")}`}</div>))},
        {title:'Theatre',dataIndex:'show',render:((text,data)=>(<div>{`${data.show.theatre.name} , ${data.show.theatre.address}`}</div>))},
        {title:'Seat Nos.', dataIndex:'seats',render:((text,data)=>(
            <div>
                {
                    data.seats.join(", ")
                }
            </div>
        ))},
        {title:'Actions', dataIndex:'actions',render:((text,data)=>(
            <div>
                {
                    <>
                        <Button onClick={()=>{
                            setBooking(data)
                            setIsViewModalOpen(true)
                            }}><EyeOutlined /></Button>
                        <Button onClick={()=>handleMail(data._id)}><MailOutlined /></Button>
                    </>
                }
            </div>
        ))}, 
    
    ]

  return (
    <div>
        <Table dataSource={bookings} columns={cols} rowKey={'_id'} />
        {booking && isViewModalOpen && <BookingPage booking={booking} setBooking={setBooking} isViewModalOpen={isViewModalOpen} setIsViewModalOpen={setIsViewModalOpen} />}  
    </div>
  )
}

export default MyBookings