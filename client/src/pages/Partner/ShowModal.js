import React, { useEffect, useState} from 'react'
import loaderSlice from '../../Redux/loaderSlice'
import { Button, Form, Input, message, Modal, Table, Row,Col,Select } from 'antd'
import {useSelector, useDispatch} from 'react-redux'
import { getAllMovies } from '../../api/movies'
import { addShow, deleteShow, getAllShowsByTheatreId, updateShow } from '../../api/shows'
import Loader from '../../Components/loader'
import moment from 'moment'
import {EditOutlined,DeleteOutlined,PlusOutlined,ArrowLeftOutlined} from '@ant-design/icons'
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
            //dispatch(showLoading())
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
            //dispatch(hideLoading())
        }catch(err){
            console.log(err.message)
            //dispatch(hideLoading())
        }
    }

    useEffect(()=>{
        getData()
    },[])

    const onFinish=async(values)=>{
      try{
        let response
        if(view==='add')
        {
        response=await addShow({...values,theatre:selectedTheatre._id})
        }
        else
        {
        response=await updateShow({...values,showId:selectedShow._id,theatre:selectedTheatre._id})
        }
        if(response.success)
        {
          message.success(response.message)
          getData()
          setView('list')
        }else
        {
          message.error(response.message)
        } 
      }catch(err){
        message.error(err.message)
      }
      
    }

    const onCancel=()=>{
        setIsShowModalOpen(false)
        setSelectedTheatre(null)
    }

    const handleDelete=async(showId)=>{
      try{
        const response=await deleteShow(showId)
        if(response.success)
        {
          message.success(response.message)
          getData()
        }else
        {
          message.error(response.message)
        }
      }catch(err)
      {
        message.error(err.message)
      }
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
            return moment(text).format('YYYY-MM-DD');
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
          dataIndex: "price",
          key: "price",
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
        {
          title:"Actions",
          dataIndex:"actions",
          render:(text,data)=>(
            <>
            <Button onClick={()=>{
              if(data.bookedSeats.length===0)
              {
                setView('edit')
                setSelectedMovie(data.movie)
                setSelectedShow({...data,
                date: moment(data.date).format('YYYY-MM-DD'),})
              }else
              {
                message.error("This show cannot be edited as tickets have already been booked by customers.")
              }   
            }}><EditOutlined /></Button>
            <Button onClick={()=>handleDelete(data._id)}><DeleteOutlined /></Button>
            </>
          )
        }
      ];

    const validateMultipleOfTen=(_,value)=>{
      if(value%10!==0)
      {
        return Promise.reject(new Error("Value must be a multiple of 10"))
      }
      return Promise.resolve()
    }

  return (
    <div>
        {
        loader ? <Loader /> :
        <Modal 
        open={isShowModalOpen}
        title={
        <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
          <br />
          <br />
          <span style={{fontSize:'24px',textDecorationLine:'underline',textDecorationColor:'gold'}}>{`${selectedTheatre.name}`}</span>
          <span>{view==='list' ? `List of Shows` : view==='add' ? `Add Show` : `Edit Show`}</span>
          <br />
        </div>
        }
        onCancel={onCancel}
        footer={null}
        width={800}
        >

        {view==='list' && <Table dataSource={shows} columns={tableCols} rowKey={'_id'} />}
        <div style={{display:'flex',justifyContent:'center'}}>
        {view==='list' && <Button type='primary' onClick={()=>{setView('add')}}>Add Show</Button>}
        </div>
        <div>
          {
          (view==='add' || view==='edit') && 
          <Form
            layout="vertical"
            style={{ width: "100%" }}
            initialValues={view === "edit" ? selectedShow : null}
            onFinish={onFinish}
            onCancel={() => {setView("list")}}
          >
            <Row
              gutter={{
                xs: 6,
                sm: 10,
                md: 12,
                lg: 16,
              }}
            >
              <Col span={24}>
                <Row
                  gutter={{
                    xs: 6,
                    sm: 10,
                    md: 12,
                    lg: 16,
                  }}
                >
                  <Col span={8}>
                    <Form.Item
                      label="Show Name"
                      htmlFor="name"
                      name="name"
                      rules={[
                        { required: true, message: "Show name is required!" },
                      ]}
                    >
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter the show name"
                      ></Input>
                    </Form.Item>
                  </Col>
                
                  <Col span={8}>
                    <Form.Item
                      label="Show Date"
                      htmlFor="date"
                      name="date"
                      rules={[
                        { required: true, message: "Show date is required!" },
                      ]}
                    >
                      <Input
                        id="date"
                        type="date"
                        placeholder="Enter the show date"
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Show Timing"
                      htmlFor="time"
                      name="time"
                      rules={[
                        { required: true, message: "Show time is required!" },
                      ]}
                    >
                      <Input
                        id="time"
                        type="time"
                        placeholder="Enter the show time"
                      ></Input>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <Row
                  gutter={{
                    xs: 6,
                    sm: 10,
                    md: 12,
                    lg: 16,
                  }}
                >
                  <Col span={8}>
                    <Form.Item
                      label="Select the Movie"
                      htmlFor="movie"
                      name="movie"
                      rules={[{ required: true, message: "Movie  is required!" }]}
                    >
                      <Select
                        id="movie"
                        placeholder="Select Movie"
                        style={{ width: "100%", height: "45px" }}
                        options={movies.map((movie) => ({
                          key: movie._id,
                          value: movie._id,
                          label: movie.title,
                        }))}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Ticket Price"
                      htmlFor="price"
                      name="price"
                      rules={[
                        { required: true, message: "Ticket price is required!" },
                      ]}
                    >
                      <Input
                        id="price"
                        type="number"
                        placeholder="Enter the ticket price"
                        min={0}
                      ></Input>
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Total Seats"
                      htmlFor="totalSeats"
                      name="totalSeats"
                      rules={[
                        { required: true, message: "Total seats are required!" },
                        {validator:validateMultipleOfTen}
                      ]}
                    >
                      <Input
                        id="totalSeats"
                        type="number"
                        placeholder="Enter the number of total seats"
                        min={0}
                        max={1000}
                        step={10}
                      ></Input>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          <div style={{display:'flex',justifyContent:'center'}}>
            <span>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              {view === "add" ? "Add the Show" : "Edit the Show"}
            </Button></span>
          </div>
          </Form>     
          }
        </div>
        </Modal>
        }
    </div>
  )
}

export default ShowModal