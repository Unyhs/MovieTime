import React, { useEffect,useState } from 'react'
import loaderSlice from '../../Redux/loaderSlice'
import { getShowByShowId } from '../../api/shows'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {message,Card,Row,Col,Divider, Button, Collapse} from 'antd'
import Loader from '../../Components/loader'
import moment from 'moment'
import StripeCheckout from 'react-stripe-checkout'
import {InfoCircleOutlined} from '@ant-design/icons'
import InfoModal from './InfoModal'
import { bookShowTickets, makePayment } from '../../api/bookings'

const {hideLoading,showLoading}=loaderSlice.actions

function BookShow() {
    const params=useParams()
    const showId=params.showId
    const selectedDate=params.selectedDate
    const loader=useSelector(store=>store.loaderState.loading)
    const dispatch=useDispatch()
    const [show,setShow]=useState(null)
    const [selectedSeats, setSelectedSeats]=useState([])
    const [isInfoOpen,setIsInfoOpen]=useState(false)
    const user=useSelector(store=>store.userState.user)
    const navigate=useNavigate()

    useEffect(()=>{
        const getData=async()=>{
            try{
                dispatch(showLoading())
                const response=await getShowByShowId(showId)
    
                if(response.success)
                {
                    setShow(response.data)
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

    const getSeats=()=>{
        let cols=10
        let seats=show && show.totalSeats
        let rows=Math.ceil(seats/cols)

        return (
        <div style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
        }}>
            <p style={{margin:'0'}}>The screen will be here</p>
            <Divider style={{
                border:'8px gray solid',
                width:'50%',
                margin:'0'
            }}></Divider>
            <br/>
            <br/>

            {Array.from(Array(rows).keys()).map((row)=>
            <>
            <div key={row} style={{ display: 'flex'}}>
                {Array.from(Array(cols).keys()).map((column)=>{
                    let seatNumber=row*cols+column+1

                    let seatClass='seat-btn'

                    if(selectedSeats.includes(seatNumber))
                        seatClass+=' selected'

                    if(show.bookedSeats.includes(seatNumber))
                        seatClass+=' booked'

                    if(seatNumber<=seats)
                    {
                        return (
                            <span key={seatNumber}>
                                <button 
                                className={seatClass}
                                onClick={()=>{
                                    if(!show.bookedSeats.includes(seatNumber))
                                    {
                                        if(selectedSeats.includes(seatNumber))
                                            {
                                                setSelectedSeats(selectedSeats.filter(currSeat=>currSeat!==seatNumber))
                                            }else
                                            {
                                                setSelectedSeats([...selectedSeats,seatNumber])
                                            }
                                    }
                                }}> {seatNumber} </button>
                            </span>
                        );
                    }
                })}
            </div>
            </>
            )}
        </div>
        )
    }

    const book=async(transactionId)=>{
        try{
            dispatch(showLoading())
            const response=await bookShowTickets({user:user._id,show:showId,seats:selectedSeats,transactionId:transactionId,bookingDate:selectedDate})

            if(response.success)
            {
                message.success("Your booking has been completed succesfully")
                
                navigate('/profile')
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

    const onToken=async(token)=>{
        console.log(token)
        try{
            dispatch(showLoading())
            let amount=selectedSeats.length*show.price
            const response=await makePayment({token:token, amount:(amount*100)})

            if(response.success)
            {
                let transactionId=response.data
                message.success(`Your transaction vide transaction Id : ${transactionId} for Rs. ${amount} has been completed successfully `)
                book(transactionId)
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

    const getInfo=()=>{
        setIsInfoOpen(true)
    }

  return (
    <div>
        {loader? <Loader /> : show && (
            <>
            <Row gutter={24}>   
                <Col span={24}>
                    <Card 
                        style={{ width: "100%"}}>
                        <h1>{show.movie.title}</h1>
                        <p style={{
                            textTransform:'capitalize'
                        }}>Theatre: {show.theatre.name}, {show.theatre.address}</p>
                        <p style={{
                            textTransform:'capitalize'
                        }}><span>Show Name:</span> {show.name}</p>
                        <p><span>Date & Time: </span>
                        <span>{moment(show.date).format("MMM Do YYYY")} at{" "}</span>
                        <span>{moment(show.time, "HH:mm").format("hh:mm A")}</span></p>
                        <span>Ticket Price:</span> Rs. {show.price}/-
                        <span> &nbsp;|&nbsp; Available Seats:</span>{" "}
                        <span>{show.totalSeats - show.bookedSeats.length}</span>
                        <Divider style={{
                            border:'1px solid #a0a0a0'
                        }} />
                        {getSeats()}
                        <p style={{fontSize:'1rem'}}>Selected Seats: {selectedSeats.length>0? selectedSeats.sort((a,b)=>a-b).join(", "):"None"}</p>
                        <p>{show && selectedSeats.length>0 && `Total Amount: Rs.${selectedSeats.length*show.price}`}   
                            <span onClick={getInfo}>{show && selectedSeats.length>0 && <InfoCircleOutlined />}</span>
                        </p>
                        
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    {selectedSeats.length>0 && 
                    <StripeCheckout
                        currency='USD'
                        stripeKey='pk_test_51PzZ8JE1woDbtklR7DkwFSNdJlcleJ619r3lqgu2fTch945FDAsrUlqKM3p45Y8EYX6pwxA7pvo5aXLOh6uN4IwJ00gGOcgc5I'
                        token={onToken}
                        amount={selectedSeats.length*show.price*100}
                         >
                        <div style={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
                            <Button type='primary' shape='round'>
                            {`Continue to pay Rs. ${selectedSeats.length*show.price}`}
                            </Button>
                        </div>
                    </StripeCheckout>}
                </Col>
                <Col span={8}></Col>
            </Row>

            {selectedSeats.length>0 && isInfoOpen && 
                        <InfoModal isInfoOpen={isInfoOpen} setIsInfoOpen={setIsInfoOpen} selectedSeatsLen={selectedSeats.length} price={show.price} />} 
            </>
    )}
    </div>
  )
}

export default BookShow