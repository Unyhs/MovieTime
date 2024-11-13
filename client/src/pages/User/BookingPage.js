import React from 'react'
import { Descriptions, Modal } from 'antd'
import moment from 'moment'

function BookingPage({booking,setBooking,isViewModalOpen, setIsViewModalOpen}) {
  return (
    <div>
        <Modal 
        open={isViewModalOpen}
        title={<h2 style={{marginLeft:'25%',color:'orange'}}>MovieTime</h2>}
        onCancel={()=>{setIsViewModalOpen(false)
            setBooking(null)
        }}
        footer={null}
        width={'30%'}
        >
            <h3 style={{marginLeft:'20%'}}>{`Movie Tickets - ${booking.show.movie.title}`}</h3>
            <Descriptions bordered column={1} >
            <Descriptions.Item label="Theatre">{`${booking.show.theatre.name} , ${booking.show.theatre.address}`}</Descriptions.Item>
            <Descriptions.Item label="Date">{`${moment(booking.bookingDate).format("MMM Do YYYY")}`}</Descriptions.Item>
            <Descriptions.Item label="Time">{`${moment(booking.show.time, "HH:mm").format("hh:mm A")}`}</Descriptions.Item>
            <Descriptions.Item label="Seats">{`${booking.seats.length} ( ${booking.seats.join(", ")} )`}</Descriptions.Item>
            </Descriptions>
        </Modal>
    </div>
  )
}

export default BookingPage