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
    const dispatch=useDispatch()
    const nav=useNavigate()

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

    useEffect(()=>{
        if(localStorage.getItem('token')){
            getValidUser()
        }else
        {
            nav('/login')
        }
        
    },[])

    const navItems=[
        {key:1,label:(<span onClick={()=>{nav('/home')}}><HomeOutlined /></span>)},
        {key:2,label:(<div onClick={()=>{
            if(user.role==='admin')
                nav('/admin')
            else if (user.role==='partner')
                nav('/partner')
            else
                nav('/profile')
        }}>
            <span>My Profile</span> 
            </div>)},
        {key:3,label:(<span><Link to="/login" 
            onClick={()=>{localStorage.removeItem('token')}}></Link></span>),icon:<LogoutOutlined />}
        ]

    return(
        <>
        <div>
        {user && (
            <>
            <Layout>
                <Header style={{display:"flex",alignItems:"center",width:'100%',justifyContent:'space-between',position:'sticky',zIndex:1,top:0}}>
                    <div style={{display:'flex', justifyContent:'space-around',width:'7%'}}>
                        <h3 style={{color:'white',padding:'10px'}}>MovieTime</h3>
                        {(user.role==='admin') && <h6 style={{color:'orange'}}>Admin</h6>}
                        {(user.role==='partner') && <h6 style={{color:'orange'}}>Partner</h6>}
                    </div>
                    <Menu items={navItems} theme='dark' mode='horizontal' style={{width:'11%'}}></Menu>
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