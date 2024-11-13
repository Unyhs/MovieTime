import React,{useState} from 'react'
import { Form,Input,Button, message, Tabs } from 'antd'
import { Link } from 'react-router-dom'
import { registerUser } from '../../api/users'

function Register() {
  const [activeTab,setActiveTab]=useState("user")

  const handleTabChange=()=>{
    if(activeTab==="user")
      setActiveTab("partner")
    else
      setActiveTab("user")
  }

  const onFinish=async(value)=>{
    try{
      let newvalue=(activeTab==="partner")? {...value,role:"partner"}:value
      const response=await registerUser(newvalue)
      if(response.success){
        message.success(response.message)
      }else
      {
        message.error(response.message)
      }
    }catch(err){
      message.error(err.message)
    }
  }

  const tabItems=[
    {key:"1",label:"Register as User",children:
    (<section>
        <Form layout='horizontal' onFinish={onFinish}>
        <Form.Item
          label="Name"
          htmlFor='name'
          name='name'
          style={{color:'white'}}
          rules={[{required: true, message:"Name is mandatory"}]}
          >
          <Input type='text' id='name' placeholder='Enter your name' />
          </Form.Item>

          <Form.Item
          label="Email Address"
          htmlFor='email'
          name='email'
          style={{color:'white'}}
          rules={[{required: true, message:"Email is mandatory"}]}
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
            htmlType='submit'>
            Register
          </Button>
          </Form.Item>
        </Form>
        <div>
          <p style={{fontSize:'1rem'}}> Already Registered? <Link to="/Login">Click here to login.</Link></p>
        </div>
      </section>
    )},
    {key:"2",label:"Register as Partner",children:
    (<section>
      <Form layout='horizontal' onFinish={onFinish}>
      <Form.Item
        label="Name"
        htmlFor='name'
        name='name'
        style={{color:'white'}}
        rules={[{required: true, message:"Name is mandatory"}]}
        >
        <Input type='text' id='name' placeholder='Enter your name' />
        </Form.Item>

        <Form.Item
        label="Email Address"
        htmlFor='email'
        name='email'
        style={{color:'white'}}
        rules={[{required: true, message:"Email is mandatory"}]}
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
          htmlType='submit'>
          Register
        </Button>
        </Form.Item>
      </Form>
      <div>
        <p style={{fontSize:'1rem'}}> Already Registered? <Link to="/Login">Click here to login.</Link></p>
      </div>
    </section>)
    }]

  return (
    <>
    <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      minHeight:'90vh'
    }}>
    <div style={{
      display:'flex', 
      flexDirection:'column',
      height:'450px',
      width:'400px',
      alignItems:'center',
      borderRadius:'30px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
    }}>
      <h2 style={{color:'black',padding:'10px'}}>Register to MovieTime</h2>
      <main style={{
        backgroundColor:'white', 
        height:'30vh', 
        width:'20vw', 
        display:'flex',
        flexDirection:'column',
        alignItems:'center'}}>
        <Tabs items={tabItems} onChange={handleTabChange}></Tabs>
      </main>
    </div>
    </div>
    </>
  )
}

export default Register