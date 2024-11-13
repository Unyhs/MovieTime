import React from 'react'
import { resetPassword } from '../../api/users'
import { message,Form, Input,Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
  const nav=useNavigate()

  const onFinish=async(value)=>{
    try{
      const response =await resetPassword(value)

      if(response.success)
      {
        message.success(response.message)
        nav('/login')
      }else
      {
        message.error(response.message)
      }
    }catch(err){
      message.error(err.message)
    }
  }

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
      justifyContent:'center',
      alignItems:'center',
      height:'450px',
      width:'400px',
      borderRadius:'30px',
      boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
      }}>
    <main>
        <h2 style={{margin:'20px 10px'}}>Reset Password</h2>
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
            label="OTP"
            htmlFor='otp'
            name='otp'
            style={{color:'white'}}
            rules={[{required: true, message:"OTP is mandatory"},{type:'String',message:"Please enter a valid OTP"}]}
            >
            <Input type='String' id='otp' placeholder='Enter your One Time Password' />
            </Form.Item>

            <Form.Item
            label="Password"
            htmlFor='password'
            name='password'
            style={{color:'white'}}
            rules={[{required: true, message:"Password is mandatory"},{type:'String',message:"Please enter a valid password"}]}
            >
            <Input type='String' id='password' placeholder='Enter your new password' />
            </Form.Item>

            <Form.Item>
            <Button type='primary' 
              block
              htmlType='submit'
              >Set new password</Button>
            </Form.Item>

          </Form>
        </section>
      </main>
    </div>
    </div>
    </>
  )
}

export default ResetPassword