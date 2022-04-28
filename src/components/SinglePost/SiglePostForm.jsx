import React from 'react';

const SiglePostForm = ({dataPost}) => {

  return (
    <>
        <div className='singlePostContainer'>
            <div className='singlePostTitle'>
                <p className='m-0'>{dataPost.title}</p>
                {/* <figure className='singlePost-img'>
                    <img className='post-title-img' src={Images.blog} alt=''/>
                </figure> */}
            </div>
            
            <div className="singlePost-img-cont">
                <img className='singlePost-img' src={dataPost.img} alt=''/>

                <div className="postDate">
                    <p>{new Date(dataPost.date).toDateString()}</p> 
                </div>

                <div className="singlePostDescp-container">
                     <p className="singlePostDescp">{dataPost.description}</p>
                </div>
               

            </div>
            
           
         </div>


    </>
  )
}

export default SiglePostForm