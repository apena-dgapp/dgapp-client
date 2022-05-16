import React, { useState } from "react";
import Viewer from "react-viewer";
import Carousel from "react-elastic-carousel";

const SiglePostForm = ({ dataPost, arrayImg }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

  return (
    <>
      <div className="singlePostContainer">
        <div className="singlePostTitle">
          <p className="m-0">{dataPost.title}</p>
          {/* <figure className='singlePost-img'>
                    <img className='post-title-img' src={Images.blog} alt=''/>
                </figure> */}
        </div>

        <div className="singlePost-img-cont">
          <img className="singlePost-img" src={dataPost.img} alt="" />

          <div className="postDate">
            <p>{new Date(dataPost.date).toDateString()}</p>
          </div>

          <div className="singlePostDescp-container">
            <p className="singlePostDescp">{dataPost.description}</p>
          </div>
        </div>

        <Carousel breakPoints={breakPoints}>
          {arrayImg.files?.map((item, index) => {
            return (
              <div key={index.toString()}>
                <img
                  src={item.src}
                  alt=""
                  width="300px"
                  onClick={() => {
                    setVisible(true);
                    setActiveIndex(index);
                  }}
                />
              </div>
            );
          })}
          <Viewer
            visible={visible}
            images={arrayImg.files}
            onClose={() => {
              setVisible(false);
            }}
            zoomSpeed={0.2}
            activeIndex={activeIndex}
            downloadable
          />
        </Carousel>
      </div>
    </>
  );
};

export default SiglePostForm;
