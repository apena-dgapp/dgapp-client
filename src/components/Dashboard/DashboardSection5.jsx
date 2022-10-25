import React from 'react'
import Images from "../../common/images/index";
import { IoMdImages } from "react-icons/io";
import ReactPlayer from "react-player";

const DashboardSection5 = ({multimedia, multimediaMain, goToPost}) => {
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
                {" "}
                <ReactPlayer
                  width="90%"
                  height="85%"
                  style={{ marginBottom: "0.5rem" }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  url={multimediaMain?.url}
                  controls
                />
                <p>{multimediaMain?.title}</p>
              </div>
              <div className=""></div>
              <div className="dashboard-section-5-galery">
                <div className="dashboard-section-5-galery-grid">
                  {
                    multimedia?.map((item, key)=>{
                      return(
                        item.FilesPosts[0].type ==="URL" ? 
                          <div key={key} className="dashboard-section-5-galery-grid-mult">
                            <ReactPlayer
                              width="80%"
                              height="80%"
                              // style={{ marginTop: "0.5rem" }}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              url={item.FilesPosts[0].file}
                              controls
                            />
                            <p>{item.title}</p>
                          </div> : <div onClick={() => goToPost(item)} key={key} className="dashboard-section-5-galery-grid-mult">
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
                
                  
                  {/* <div className="dashboard-section-5-galery-grid-mult">
                    <ReactPlayer
                      width="80%"
                      height="80%"
                      // style={{ marginTop: "0.5rem" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      url={multimedia?.url}
                      controls
                    />
                     <p>Almuerzo con Sigmund Freund Almuerzo con Sigmund Freund Almuerzo con Sigmund Freund</p>
                  </div>
                  <div className="dashboard-section-5-galery-grid-mult">
                    <ReactPlayer
                      width="80%"
                      height="80%"
                      // style={{ marginTop: "0.5rem" }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      url={multimedia?.url}
                      controls
                    />
                    <p>Almuerzo con Sigmund Freund</p>
                  </div>          */}
                </div>
              </div>
            </div>: null
            // <div className="dashboard-nodata-cont">
            //   <img src={Images.nodata} alt="" />
            //   <p>No se registran informacion multimedia</p>
            // </div> 
            }     
          </div>
        </div>

    </>
  )
}

export default DashboardSection5