import { Col, Modal, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import loaderSlice from "../../Redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { addMovie, updateMovie } from "../../api/movies";
import moment from "moment";
import Loader from "../../Components/loader";
const {showLoading,hideLoading}=loaderSlice.actions

const MovieForm = ({isModalOpen,setIsModalOpen,selectedMovie,setSelectedMovie,formType,getData,}) => {
  const dispatch=useDispatch()
  const loader=useSelector(store=>store.loaderState.loading)

  const handleCancel=()=>{
    setIsModalOpen(false)
    setSelectedMovie(null)
  }

  const handleSubmit=async(values)=>{
    try{
      dispatch(showLoading())
      let response=(formType==='Add')? await addMovie(values) : await updateMovie({...values,movieId:selectedMovie._id})

      if(response.success)
      {
        getData();
        message.success(response.message)
        setIsModalOpen(false)
      }else
      {
        message.error(response.error)
      }

      setSelectedMovie(null)
      dispatch(hideLoading())
    }catch(err)
    {
      dispatch(hideLoading())
      message.error(err.message)
    }
  }

  return (
    <>
    { loader ? <Loader /> :
    <Modal open={isModalOpen}
    title={formType === "Add" ? "Add a new Movie" : "Edit existing Movie"}
    onCancel={handleCancel}
    footer={null} >
      <Form layout="vertical" initialValues={{
          ...selectedMovie,
          releaseDate: formType === 'Add' ? moment().format('YYYY-MM-DD') : selectedMovie?.releaseDate
        }} onFinish={handleSubmit}>
        <Form.Item 
        label="Movie Name" 
        name='title'
        rules={[{required:true,message:'Movie Name cannot be empty'}]}>
          
        <Input placeholder="Enter the movie's name"/>
        </Form.Item>

        <Form.Item 
        label="Description" 
        name='description'
        rules={[{required:true,message:'Description cannot be empty'}]}>
          
        <Input placeholder="Enter the movie's description"/>
        </Form.Item>

        <Form.Item 
        label="Duration (mins)" 
        name='duration'
        rules={[{required:true,message:'Duration cannot be empty'}]}>
        
        <Input type="number" 
        placeholder="Enter the movie duration"
        min={1} />
        </Form.Item>

        <Form.Item 
        label="Language" 
        name='language'
        rules={[{required:true,message:'Language is required'}]}>
          
        <Select 
        placeholder="Select the movie's language"
        options={[
          {label:'English',value:'English'},
          {label:'Hindi',value:'Hindi'},
          {label:'Punjabi',value:'Punjabi'},
          {label:'Tamil',value:'Tamil'},
        ]}
        />
        </Form.Item>

        <Form.Item 
        label="Movie Release Date" 
        name='releaseDate'
        rules={[{required:true,message:'Movie Release Date is required'}]}>
          
        <Input type="Date"/>
        </Form.Item>

        <Form.Item 
        label="Genre" 
        name='genre'
        rules={[{required:true,message:'Genre is required'}]}>
          
        <Select 
        placeholder="Select the movie's genre"
        options={[
          { value: "Action", label: "Action" },
          { value: "Comedy", label: "Comedy" },
          { value: "Horror", label: "Horror" },
          { value: "Love", label: "Love" },
          { value: "Patriot", label: "Patriot" },
          { value: "Bhakti", label: "Bhakti" },
          { value: "Thriller", label: "Thriller" },
          { value: "Mystery", label: "Mystery" },
        ]}
        />
        </Form.Item>

        <Form.Item 
        label="Thumbnail" 
        name='poster'
        rules={[{required:true,message:'Movie Poster is required'}]}>
          
        <Input placeholder="Enter the movie poster's URL" />
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
  );
};

export default MovieForm;