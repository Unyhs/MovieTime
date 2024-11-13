import { Modal, message } from "antd";
import { deleteMovie } from "../../api/movies";
import loaderSlice from "../../Redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Components/loader";

const {showLoading,hideLoading}=loaderSlice.actions

const DeleteMovieModal = ({isDltModalOpen,setIsDltModalOpen,selectedMovie,setSelectedMovie,getData}) =>{
  const dispatch=useDispatch()
  const loader=useSelector(store=>store.loaderState.loading)

  const onOk=async()=>{
      try{
        dispatch(showLoading())
        const movieId=selectedMovie._id
        const response=await deleteMovie({movieId:movieId})

        if(response.success)
        {
          message.success(response.message)
          getData()
        }else
        {
          message.error(response.message)
        }

        setIsDltModalOpen(false)
        setSelectedMovie(null)
        dispatch(hideLoading())
      }catch(err)
      {
        dispatch(hideLoading())
        setIsDltModalOpen(false)
        message.error(err.message)
      }
  }

  const onCancel=()=>{
    setIsDltModalOpen(false)
    setSelectedMovie(null)
  }

  return (
    <>
    { loader ? <Loader /> :
    <Modal 
    title='Delete Movie?'
    open={isDltModalOpen}
    onOk={onOk}
    onCancel={onCancel}>
      <p>Are you sure you want to delete this movie?</p>
      <p>The corresponding shows (if unbooked) shall be deleted and it cannot be reversed</p>
    </Modal>
    }
    </>
  );
};

export default DeleteMovieModal;