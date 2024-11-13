import React, { useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import loaderSlice from '../../Redux/loaderSlice'
import { getAllMovies } from '../../api/movies'
import Loader from '../../Components/loader'
import { Col, Input, message, Row } from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import moment from 'moment'

const {hideLoading,showLoading}=loaderSlice.actions

function Home() {
  const [movies,setMovies]=useState([])
  const [searchText,setSearchText]=useState("")
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const loader=useSelector(store=>store.loaderState.loading)

  const getData=async()=>{
    try{
      dispatch(showLoading())
      const response=await getAllMovies()
      if(response.success)
      {
        let movies=response.data
        setMovies(movies.map(ele=>{
          return {...ele,key:ele._id}
        }))
      }else
      {
        message.error(response.message)
      }
      dispatch(hideLoading())
    }catch(err)
    {
        message.error(err.message)
        dispatch(hideLoading())
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const handleSearch=(e)=>{
    setSearchText(e.target.value)
  }

  return (
    <>
      {
        loader ? <Loader />:
        <div>
          <Row style={{
            display:'flex',
            justifyContent:'center'
          }}>
            <Col xs={{span:24}} lg={{span:12}}>
            <Input
              placeholder='Search for Movies'
              suffix={<SearchOutlined />}
              onChange={handleSearch}
            />
            <br />
            <br />
            <br />
            </Col>
          </Row>
          <Row gutter={{ xs:8, sm:16, md:24, lg:32 }}> 
            {movies && 
            movies.filter(ele=>ele.title.toLowerCase().includes(searchText.toLowerCase()))
            .map(ele=>
              (
              <Col key={ele.key}>
                    <div>
                      <img 
                      src={ele.poster} 
                      alt='movie poster' 
                      style={{marginBottom:'10px', cursor:'pointer', width:'200px', borderRadius:'8px'}}
                      onClick={()=>{
                        navigate(`/movies/${ele._id}/${moment().format('YYYY-MM-DD')}`)
                        }}/>
                      <h3>{ele.title}</h3>
                    </div>
              </Col>
              )
            )
            }
          </Row>
        </div>
      }
    </>
  )
}

export default Home