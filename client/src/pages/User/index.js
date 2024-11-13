import React from 'react'
import {Tabs} from 'antd'
import MyBookings from './MyBookings'

function Profile() {
  const tabItems=[{key:"1",label:"My Bookings",children:<MyBookings />}]
    return (
    <>
    <Tabs items={tabItems}/>
    </>
    )
}

export default Profile
