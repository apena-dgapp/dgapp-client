import React,{useState} from 'react';
import Viewer from 'react-viewer';

const SiglePostForm = ({dataPost}) => {

    const [activeIndex, setActiveIndex] = useState(0);
    const [visible, setVisible] = useState(false);

    const images = [
        {
            src: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
            title: "image title 1"
          },
          {
            src: "https://images.unsplash.com/photo-1534628526458-a8de087b1123",
            title: "image title 2"
          }
      ];

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

                {/* <button onClick={}>show</button> */}

                <div className="singlePost-view-cont">
                    <div className="singlePost-view">
                        
                        {images.map((item, index) => {
                            return (
                                <div key={index.toString()}>
                                    <img src={item.src} 
                                        alt=""
                                        width="300px"
                                        onClick={() => {
                                            setVisible(true)
                                            setActiveIndex(index)
                                        }} 
                                    />
                                </div>
                            )
                        })}


                        <Viewer
                        visible= {visible}
                        images={images}
                        onClose={() => {setVisible(false)}}
                        zoomSpeed={0.2}
                        activeIndex={activeIndex}
                        downloadable
                        />
                    </div>
                </div>
               

            </div>
            
           
         </div>


    </>
  )
}

export default SiglePostForm