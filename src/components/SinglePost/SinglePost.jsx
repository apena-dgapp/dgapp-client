import React,{useState} from 'react';
import SiglePostForm from './SiglePostForm';

const SinglePost = (state) => {

  const [visible, setVisible] = useState(false);
  const dataPost = state.location.state;

  const viewShow = () =>{
    setVisible(!visible)
  }

  return (
    <>
      <SiglePostForm
        dataPost = {dataPost}
        viewShow = {viewShow}
        visible = {visible}
      />
    </>
    
  )
}

export default SinglePost