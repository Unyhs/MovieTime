import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table } from 'antd'
import {EditOutlined,DeleteOutlined,PlusOutlined} from '@ant-design/icons'
import TheatreModal from './TheatreModal'
import TheatreDelete from './TheatreDelete'
import loaderSlice from '../../Redux/loaderSlice'
import ShowModal from './ShowModal'

import { getAllTheatresByOwnerId } from '../../api/theatres'
import Loader from '../../Components/loader'

const {showLoading,hideLoading}=loaderSlice.actions

function TheatreList() {
    const dispatch=useDispatch()
    const user=useSelector(store=>store.userState.user)
    const loader=useSelector(store=>store.loaderState.loading)

    const [isModalOpen,setIsModalOpen]=useState(false)
    const [isDltModalOpen,setIsDltModalOpen]=useState(false)
    const [isShowModalOpen, setIsShowModalOpen]=useState(false)
    const [selectedTheatre,setSelectedTheatre]=useState(null)
    const [theatres,setTheatres]=useState(null)
    const [formType,setFormType]=useState(null)

    const tablecols=[
        {title:'Theatre Name', dataIndex:'name'},
        {title:'Theatre Address', dataIndex:'address'},
        {title:'Phone Number', dataIndex:'phone'},
        {title:'Email Address', dataIndex:'email'},
        {title:'Status', dataIndex:'isActive', render:((text,data)=>(data.isActive)? "Approved":"Pending/Blocked")},
        {title:'Actions',dataIndex:'actions', render:((text,data)=>(
            <>
            <Button onClick={()=>{
                setFormType('Edit')
                setIsModalOpen(true)
                setSelectedTheatre(data)
            }}><EditOutlined /></Button>

            <Button onClick={()=>{
                setIsDltModalOpen(true)
                setSelectedTheatre(data)
            }}><DeleteOutlined /></Button>


            <Button 
            onClick={()=>{
                if(data.isActive)
                {
                    setIsShowModalOpen(true)
                    setSelectedTheatre(data)
                }}}
            style={{
                color:(data.isActive)? 'black' : 'white',
                backgroundColor:(data.isActive)? 'white' : 'lightgrey',
                cursor: (data.isActive) ? 'pointer' : 'not-allowed'
            }}
            ><PlusOutlined />Add Shows</Button>
            </>
        ))}
    ]

    const getData=async()=>{
        try{
            dispatch(showLoading())
            const response=await getAllTheatresByOwnerId(user._id)
            const allTheatres=response.data
            setTheatres(allTheatres.map(ele=>{
                return {...ele, key:ele._id}
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
    { loader ? <Loader /> :
    <div>
        
     <Table dataSource={theatres} columns={tablecols} />
        <Button onClick={()=>{
                setFormType('Add')
                setIsModalOpen(true)
        }}> <PlusOutlined /> Add Theatre</Button>

        {isModalOpen && <TheatreModal 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formType={formType}
        setFormType={setFormType}
        selectedTheatre={selectedTheatre}
        setSelectedTheatre={setSelectedTheatre}
        getData={getData}
        />}

        {isDltModalOpen && <TheatreDelete
        isDltModalOpen={isDltModalOpen}
        setIsDltModalOpen={setIsDltModalOpen}
        selectedTheatre={selectedTheatre}
        setSelectedTheatre={setSelectedTheatre}
        getData={getData}
         />}

        {isShowModalOpen && <ShowModal 
        isShowModalOpen={isShowModalOpen}
        setIsShowModalOpen={setIsShowModalOpen}
        selectedTheatre={selectedTheatre}
        setSelectedTheatre={setSelectedTheatre}
        />
        }
    </div>
    }
    </>
  )
}

export default TheatreList