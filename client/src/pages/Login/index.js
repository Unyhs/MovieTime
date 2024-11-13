import React, { useEffect } from 'react'
import {  Button, Form, Input,message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api/users'


function Login() {

  const nav=useNavigate();
  const onFinish=async(value)=>{
    try{
      const response=await login(value)
      if(response.success){
        message.success(response.message)
        localStorage.setItem("token",response.data)
        nav("/home")
      }else
      {
        message.error(response.message)
      }
    }catch(err){
      message.error(err.message)
    }
  }
  return (
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      minHeight:'90vh'
    }}>
      <div style={{
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        height:'450px',
        width:'400px',
        borderRadius:'30px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
        }}>
        <main>
          <h2 style={{margin:'20px 10px'}}>Login to MovieTime</h2>
          <section style={{
          backgroundColor:'white',
          width:'300px',
          margin:'10px'
          }}>
            <Form layout='vertical' onFinish={onFinish}>
              <Form.Item
              label="Email Address"
              htmlFor='email'
              name='email'
              style={{color:'white'}}
              rules={[{required: true, message:"Email is mandatory"},{type:'email',message:"Please enter a valid email ID"}]}
              >
              <Input type='email' id='email' placeholder='Enter your email' />
              </Form.Item>

              <Form.Item
              label="Password"
              htmlFor='password'
              name='password'
              style={{color:'white'}}
              rules={[{required: true, message:"Password is mandatory"}]}
              >
              <Input type='password' id='password' placeholder='Enter your password' />
              </Form.Item>

              <Form.Item>
              <Button type='primary' 
                block
                htmlType='submit'
                >Login</Button>
              </Form.Item>
            </Form>
            <div>
              <p style={{fontSize:'1rem'}}> New User? <Link to="/Register">Click here to register</Link></p>
              <p style={{fontSize:'1rem'}}> Forgot Password? <Link to="/forgetPassword">Reset password</Link></p>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default Login