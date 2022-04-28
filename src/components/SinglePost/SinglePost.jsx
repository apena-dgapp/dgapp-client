import React from 'react';
import SiglePostForm from './SiglePostForm';

const SinglePost = (state) => {

  const dataPost = state.location.state;

  return (
    <>
      <SiglePostForm
        dataPost = {dataPost}
      />
    </>
    
  )
}

export default SinglePost