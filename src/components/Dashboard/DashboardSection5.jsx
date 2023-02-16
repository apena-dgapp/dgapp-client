import React from 'react'
import { IoMdImages } from "react-icons/io";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { getVideoId } from "../../utils/getYoutubeId"
import { Link } from 'react-router-dom';
import useScreenSize from "../../hooks/useScreenSize";

const DashboardSection5 = ({ multimedia, multimediaMain, modalToggle, getImagesHandler }) => {

  const { width } = useScreenSize();

  return (
    <>

      <div className="dashboard-section-5">
        <div className="dashboard-section-5-container">
          <div className="dashboard-section-5-header">
            <p>MULTIMEDIA</p>
            <div className="dashboard-section-5-line"></div>
          </div>
          {
            multimedia.length ?
              <div className="dashboard-section-5-grid">
                <div className="dashboard-section-5-video">
                  <span onClick={() => modalToggle(multimediaMain)} className='dashboard-section-5-video-onclick'></span>
                  {/* <iframe
                    src={`https://www.youtube.com/embed/${getVideoId(multimediaMain?.url)}`}
                    aria-disabled title="video"
                    frameBorder="0"
                  /> */}
                  <i className="ai ai-outline-play-circle" />
                  <AiOutlinePlayCircle
                    className="dashboard-section-5-galery-main"
                  />
                  <img
                    // className="dashboard-section-5-galery-img" 
                    src={`http://img.youtube.com/vi/${getVideoId(multimediaMain?.url)}/0.jpg`}
                    alt=""
                  />
                  <p>{multimediaMain?.title}</p>
                </div>
                <div className=""></div>
                <div className="dashboard-section-5-galery">
                  <div className="dashboard-section-5-galery-grid">
                    {
                      multimedia?.map((item, key) => {
                        return (
                          item.FilesPosts[0].type === "URL" ?
                            <div
                              key={key}
                              onClick={() => modalToggle({ id: item.postId, title: item.title, url: item.FilesPosts[0].file })}
                              className="dashboard-section-5-galery-grid-mult"
                            >
                              <i className="ai ai-outline-play-circle" />
                              <AiOutlinePlayCircle
                                className="dashboard-section-5-galery-icon"
                              />
                              <div className="dashboard-section-5-galery-img-cont">
                                <img className="dashboard-section-5-galery-img" src={`http://img.youtube.com/vi/${getVideoId(item.FilesPosts[0].file)}/0.jpg`} alt="" />
                              </div>
                              <p>{item.title}</p>
                            </div> : <div onClick={() => getImagesHandler(item.postId)} key={key} className="dashboard-section-5-galery-grid-mult">
                              <i className="io io-md-images" />
                              <IoMdImages
                                className="dashboard-section-5-galery-icon"
                              />
                              <div className="dashboard-section-5-galery-img-cont">
                                <img className="dashboard-section-5-galery-img" src={item.FilesPosts[0].file} alt="" />
                              </div>
                              <p>{item.title}</p>
                            </div>
                        )
                      })
                    }

                  </div>
                </div>
              </div> : null
          }
          <div className="dashboard-section-5-btn-container">
            <Link to="/publicaciones/multimedia/menu" type="button" className="dashboard-section-5-btn">
              <i className="md md-outline-double-arrow" />
              <p>Ir a Multimedia</p>
              <MdOutlineDoubleArrow
                size={width < 5021 ? "1.2rem" : "2.5rem"}
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardSection5