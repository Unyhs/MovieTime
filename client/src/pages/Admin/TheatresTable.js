import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getAllTheatresForAdmin, updateTheatre} from '../../api/theatres'
import {CloseCircleOutlined,CheckCircleOutlined} from '@ant-design/icons'
import loaderSlice from '../../Redux/loaderSlice'
import {message,Button,Table} from 'antd'
import Loader from '../../Components/loader'


const {hideLoading,showLoading}=loaderSlice.actions

function TheatresTable() {
  const loader=useSelector(store=>store.loaderState.loading)
  const dispatch=useDispatch()
  const [theatres,setTheatres]=useState(null)

  const getData=async()=>{
    try{
      dispatch(showLoading())
      const response=await getAllTheatresForAdmin()

      if(response.success)
      {
        const t=response.data
        setTheatres(t.map(ele=>{
        return {...ele,key:`theatre${ele._id}`}
        }))
        dispatch(hideLoading())
      }else
      {
        dispatch(hideLoading())
        message.error(response.message)
      }
    }catch(err)
    {
        console.log(err)
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const handleStatusChange=async(theatre)=>{
    try{
      dispatch(showLoading())
      const values={...theatre, isActive:!theatre.isActive}
      const response=await updateTheatre(values)
      if(response.success)
      {
        getData()
        message.success(response.message)
      }else
      {
        message.error(response.message)
      }
      dispatch(hideLoading())
    }catch(err)
    {
      console.log(err)
    }
  }


  const tablecols=[
    {title:'Theatre Name', dataIndex:'name'},
    {title:'Theatre Address', dataIndex:'address'},
    {title:'Phone Number', dataIndex:'phone'},
    {title:'Email Address', dataIndex:'email'},
    {title:'Status', dataIndex:'isActive', render:((text,data)=>(data.isActive)? "Approved":"Pending/Blocked")},
    {title:'Actions',dataIndex:'actions', render:((text,data)=>(
        <div>
        {
          data.isActive?
          (<Button onClick={()=>{handleStatusChange(data)}}><CloseCircleOutlined />Block</Button>):
          (<Button onClick={()=>{handleStatusChange(data)}}><CheckCircleOutlined />Approve</Button>)
        }
        </div>
    ))}
]
  
  return (
    <>
      {(loader)? <Loader/> :
      <Table dataSource={theatres} columns={tablecols} />}
    </>
  )
}

export default TheatresTable