import React from 'react'
import Modal from 'antd/es/modal/Modal'
import loaderSlice from '../../Redux/loaderSlice'
import {useDispatch, useSelector} from 'react-redux'
import { deleteTheatre } from '../../api/theatres'
import { message } from 'antd'
import Loader from '../../Components/loader'

const {hideLoading,showLoading}=loaderSlice.actions

function TheatreDelete({
  isDltModalOpen,
  setIsDltModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  getData
}) 
{
  const dispatch=useDispatch()
  const loader=useSelector(store=>store.loaderState.loading)

  const onOk=async()=>{
    try{
      dispatch(showLoading())
      const response=await deleteTheatre(selectedTheatre._id)

      if(response.success)
      {
        message.success(response.message)
        getData()
      }else
      {
        message.error(response.message)
      }

      setIsDltModalOpen(false)
      setSelectedTheatre(null)
      dispatch(hideLoading())
    }catch(err)
    {
        dispatch(hideLoading())
        setIsDltModalOpen(false)
        message.error(err.message)
    }
  }

  const onCancel=()=>{
    setIsDltModalOpen(false)
    setSelectedTheatre(null)
  }

  return (
    <>
    {loader ? <Loader /> :
    <Modal 
    open={isDltModalOpen}
    onOk={onOk}
    onCancel={onCancel}
    >
      <p>Are you sure you wish to delete this Theatre?</p>
      <p>All corresponding shows ,if unbooked, will be deleted and cannot be reversed.</p>
    </Modal>
    }
    </>
  )
}

export default TheatreDelete