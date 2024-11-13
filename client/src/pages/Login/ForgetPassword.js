import React, {useState} from 'react'
import { forgotPassword } from '../../api/users'
import { message,Form,Input,Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function ForgetPassword() {
  const [isButtonEnabled,setIsButtonEnabled]=useState(true)
  const [isRPEnabled,setIsRPEnabled]=useState(false)
  const nav=useNavigate()

  const onFinish=async(value)=>{
    try{
        const response = await forgotPassword(value)
        if(response.success)
        {
          message.success(response.message)
          alert ("OTP sent to your email ID.")
          setIsRPEnabled(true)
          setIsButtonEnabled(false)
          setTimeout(()=>{setIsButtonEnabled(true)},10*60*1000)
        }else
        {
          message.error(response.message)
        }
        
    }catch(err)
    {
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
        <h2 style={{margin:'20px 10px'}}>Forgot Password?</h2>
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

            <Form.Item>
            <Button type='primary' 
              block
              htmlType='submit'
              disabled={!isButtonEnabled}
              >Send OTP</Button>
            </Form.Item>
            <Form.Item>
            <Button type='primary' 
              block
              htmlType='button'
              disabled={!isRPEnabled}
              onClick={()=>{nav('/resetPassword')}}
              >Set New Password</Button>
            </Form.Item>
          </Form>
          <div>
            <p style={{fontSize:'1rem'}}> OTP not recieved? Resend after 10 mins</p>
          </div>
        </section>
      </main>
      </div>
      </div>
    </>
  )
}

export default ForgetPassword