import react from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, message, Input,Button,Modal } from 'antd'
import loaderSlice from '../../Redux/loaderSlice'
import { addTheatre, updateTheatre } from '../../api/theatres'
import Loader from '../../Components/loader'
const {hideLoading,showLoading}=loaderSlice.actions

function TheatreModal({isModalOpen,setIsModalOpen,formType,setFormType,selectedTheatre,setSelectedTheatre,getData})
{
    
    const user=useSelector(store=>store.userState.user)
    const loader=useSelector(store=>store.loaderState.loading)
    const dispatch=useDispatch()

    const handleSubmit=async(value)=>{
        try{
            dispatch(showLoading())
            let response=(formType==='Add')? 
            await addTheatre({...value,owner:user._id}) : 
            await updateTheatre({...value, theatreId:selectedTheatre._id})  
            if(response.success)
            {
            getData();
            message.success(response.message)
            setIsModalOpen(false)
            }else
            {
            message.error(response.error)
            }

            setSelectedTheatre(null)
            dispatch(hideLoading())
        }catch(err)
        {
            dispatch(hideLoading())
            message.error(err.message)
        }
    }

    const handleCancel=()=>{
        setSelectedTheatre(null)
        setIsModalOpen(false)
        setFormType(null)
    }

    return (
        <>
        { loader? <Loader /> :
        <Modal 
        title={(formType==='Add')? "Add Theatre":"Update Theatre"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        >
        <Form layout='vertical' initialValues={selectedTheatre} onFinish={handleSubmit}>
            <Form.Item 
            label="Theater Name" 
            name='name'
            rules={[{required:true,message:'Theater Name cannot be empty'}]}>
            <Input placeholder="Enter the theater's name"/>
            </Form.Item>

            <Form.Item 
            label="Address" 
            name='address'
            rules={[{required:true,message:'Address cannot be empty'}]}>
            <Input placeholder="Enter the theater's complete address with pincode"/>
            </Form.Item>

            <Form.Item 
            label="Phone Number" 
            name='phone'
            rules={[{required:true,message:'Enter a valid 10 digit phone number'}, 
                {pattern: /^[0-9]{10}$/, 
                message: 'Enter a valid 10 digit phone number'},]}>  
            <Input type="number" 
            placeholder="Enter the business phone number"/>
            </Form.Item>

            <Form.Item 
            label="Email Address" 
            name='email'
            rules={[{required:true,message:'Email Address is required'}]}>
            <Input type='email' placeholder='Enter the email address for communication'/>
            </Form.Item>

            <div style={{display:'flex'}}>
            
            <Button
            block
            onClick={handleCancel}
            >Cancel</Button>
            
            <Button
            block
            type="primary"
            htmlType="Submit"
            >Submit</Button>
            </div>

        </Form>
        </Modal>
        }
        </>
    )
}

export default TheatreModal