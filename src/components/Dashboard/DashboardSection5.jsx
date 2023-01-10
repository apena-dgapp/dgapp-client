import React from 'react'
import { IoMdImages } from "react-icons/io";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { getVideoId } from "../../utils/getYoutubeId"

const DashboardSection5 = ({ multimedia, multimediaMain, modalToggle, getImagesHandler }) => {

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
                  <iframe
                    src={`https://www.youtube.com/embed/${getVideoId(multimediaMain?.url)}`}
                    aria-disabled title="video"
                    frameBorder="0"
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
                            <div key={key} className="dashboard-section-5-galery-grid-mult">
                              <span onClick={() => modalToggle({ id: item.postId, title: item.title, url: item.FilesPosts[0].file })} className='dashboard-section-5-grid-onclick'></span>
                              <iframe
                                src={`https://www.youtube.com/embed/${getVideoId(item.FilesPosts[0].file)}`}
                                aria-disabled title="video"
                                frameBorder="0"
                              />
                              <p>{item.title}</p>
                            </div> : <div onClick={() => getImagesHandler(item.postId)} key={key} className="dashboard-section-5-galery-grid-mult">
                              <i className="io io-md-images" />
                              <IoMdImages
                                size="1.2rem"
                                color="white"
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
            <div onClick="" type="button" className="dashboard-section-5-btn">
              <i className="md md-outline-double-arrow" />
              <p>Ir a Multimedia</p>
              <MdOutlineDoubleArrow
                size="1.2rem"
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardSection5