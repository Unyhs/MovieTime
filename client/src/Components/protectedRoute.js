import  {useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {HomeOutlined, LogoutOutlined,UserOutlined,ProfileOutlined} from '@ant-design/icons'
import {getCurrentUser} from "../api/users"
import userSlice from '../Redux/usersSlice'
import loaderSlice from '../Redux/loaderSlice'
import {Layout, Menu, message} from 'antd'
import { Header } from 'antd/es/layout/layout'
import Loader from './loader'

const {setUser}=userSlice.actions
const {hideLoading,showLoading}=loaderSlice.actions

const ProtectedRoute=({children})=>{
    const user=useSelector(store=>store.userState.user)
    const loader=useSelector(store=>store.loaderState.loading)
    //console.log(user)
    const dispatch=useDispatch()
    const nav=useNavigate()

    useEffect(()=>{

        const getValidUser=async()=>{
            try{
            dispatch(showLoading())
            const response=await getCurrentUser()
            dispatch(setUser(response.data))
            dispatch(hideLoading())
            }catch(err)
            {
                console.log(err)
                message.error(err.message)
                dispatch(hideLoading())
            }
        }

        if(localStorage.getItem('token')){
            getValidUser()
        }else
        {
            nav('/login')
        }
        
    },[])

    const navItems=[
        {label: (<span onClick={()=>{nav('/')}}><HomeOutlined /></span>)},
        {label:`${user? user.name: "Guest" }`,icon:<UserOutlined />, children:[
            {label:(<span onClick={()=>{
                if(user.role==='admin')
                    nav('/Admin')
                else if (user.role==='partner')
                    nav('/partner')
                else
                    nav('/profile')
            }}>My Profile</span>),icon:<ProfileOutlined />},
            {label:(<span><Link to="/login" onClick={()=>{localStorage.removeItem('token')}}>Logout</Link></span>),icon:<LogoutOutlined />}
        ]}
    ]
    return(
        <>
        <div>
        {user && (
            <>
            <Layout>
                <Header style={{display:"flex",alignItems:"center",width:'100%',justifyContent:'space-between',position:'sticky',zIndex:1,top:0}}>
                    <h3 style={{color:'white'}}>BookMyShow</h3>
                    <Menu items={navItems} theme='dark' mode='horizontal' style={{width:'15%'}}></Menu>
                </Header>
                <div style={{ padding: 24, minHeight: 380, background: "white" }}>{children}</div>
            </Layout>
            </>
        )}
        </div>
        </>
    )
}

export default ProtectedRoute