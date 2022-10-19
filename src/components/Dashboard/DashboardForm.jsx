import React from "react";
import CarouselComponent from "../../common/components/Carousel/CarouselComponent";
import CarouselAd from "../../common/components/Carousel/CarouselAd";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
// import { GoMegaphone } from "react-icons/go";
// import { FaBirthdayCake, FaConciergeBell, FaVideo } from "react-icons/fa";
// import { MdEventNote } from "react-icons/md";
// import { GiNewspaper, GiOrganigram, GiFullFolder } from "react-icons/gi";
// import { ImNewspaper } from "react-icons/im";
import ReactPlayer from "react-player";
import Images from "../../common/images/index";
import { tConvert } from "../../utils/Time24To12";

const DashboardForm = ({
  // ad,
  news,
  birthday,
  events,
  eventDate,
  multimedia,
  goToPost,
  goToProfile,
  employeeTree,
  employeedirectory,
  allPost,
  multimediaMain
}) => {
  var optionsDate = { month: "long", day: "numeric" };

  return (
    <>
      <div className="dashboard-container">
        {/* carousel y noticias */}
        <div className="dashboard-section-1">
          <div className="dashboard-section-1-grid">
            <div className="dashboard-section-1-carousel">
              <CarouselComponent />
            </div>
            <div className="dashboard-section-1-div"></div>
            <div className="dashboard-section-1-news">
              <div className="dashboard-section-1-news-header">
                <p>NOTICIAS RECIENTES</p>
              </div>
                <div className="dashboard-section-1-news-title-line"></div>
                <div className="dashboard-section-1-news-multi">
                {news.length ? (
                  news?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => goToPost(item)}
                        className="dashboard-section-1-news-content"
                      >
                        <div className="dashboard-section-1-news-content-txt">
                          {item.title}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="dashboard-nodata-cont">
                    <img src={Images.nodata} alt="" />
                    <p>No se encuentran noticias</p>
                  </div>
                )}
                </div>
      
                {news.length ? (
                  <div className="dashboard-section-1-news-btn-container">
                    <div onClick={allPost} type="button" className="dashboard-section-1-news-btn">
                      <i className="md md-outline-double-arrow" />
                      <p>Ir a Noticias</p>
                      <MdOutlineDoubleArrow
                        size="1.2rem"
                        color="white"
                        style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            
          </div>
        </div>
        {/* botones */}
        <div className="dashboard-section-2">
          <div className="dashboard-section-btn-container">
            <div className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.induccion}
                alt=""
              />
              <p>INDUCCION</p>
            </div>
            <div onClick={employeedirectory} className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.directorio}
                alt=""
              />
              <p>DIRECTORIO</p>
            </div>
            <div className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.capacitacion}
                alt=""
              />
              <p>CAPACITACION</p>
            </div>
            <div className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.politicas}
                alt=""
              />
              <p>POLITICAS INSTITUCIONALES</p>
            </div>
            <div className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.recursos}
                alt=""
              />
              <p>RECURSOS</p>
            </div>
            <div className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.solicitudes}
                alt=""
              />
              <p>SOLICITUDES</p>
            </div>
          </div>
        </div>

        {/* avisos y educapp */}
        <div className="dashboard-section-3-header">
          <div className="dashboard-section-3-title">
            <img
              className="dashboard-section-3-img-ad"
              src={Images.avisos}
              alt=""
            />
          </div>
          <div className="dashboard-section-3-title">
            <img
              className="dashboard-section-3-img-educ"
              src={Images.educ}
              alt=""
            />
          </div>
        </div>
       
        <div className="dashboard-section-3">
          <div className="dashboard-section-3-cont">
            <div className="dashboard-section-3-figure"></div>
            <div className="dashboard-section-3-ad-educ">
              <div className="dashboard-section-3-ad">
              <CarouselAd category="Aviso"/>
              </div>
              <div className="dashboard-section-3-ad">
              <CarouselAd category="EducAPP"/>
              </div>
            </div>
          </div>
        </div>
        {/* cumpleanos y calendario */}
        <div className="dashboard-section-4">
          <div className="dashboard-section-4-grid">
            <div className="dashboard-section-4-birhtday">
              <div className="dashboard-section-4-header">
                <img
                  className="dashboard-section-3-img-ad"
                  src={Images.birth}
                  alt=""
                />
              </div>
              <div className="dashboard-section-4-scroll">
                {birthday.length ? (
                  birthday?.map((item, index) => {
                    return (
                      <div
                        onClick={() => goToProfile(item.personId)}
                        key={index}
                        className="dashboard-section-4-content-birth"
                      >
                        <div className="dashboard-section-4-date">
                          <p className="dashboard-section-4-day">
                            {item.day?.split("-")[0]}
                          </p>
                          <p className="dashboard-section-4-month">
                            {item.day?.split("-")[1]}
                          </p>
                        </div>
                        <div className="dashboard-section-4-employee">
                          <img
                            className="dashboard-section-4-employee-img"
                            src={item?.photo ? item.photo : Images.noImg}
                            alt=""
                          />
                          <div className="dashboard-section-4-text">
                            {" "}
                            <p style={{ fontWeight: "bold" }}>{item?.name}</p>
                            <p>{item?.position}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="dashboard-nodata-cont">
                    <img src={Images.nodata} alt="" />
                    <p>No se registran cumpleaños para este mes</p>
                  </div>
                )}
              </div>
            </div>
            <div></div>
            <div className="dashboard-section-4-birhtday">
              <div className="dashboard-section-4-header">
                <img
                  className="dashboard-section-3-img-ad"
                  src={Images.calendar}
                  alt=""
                />
              </div>
              <div className="dashboard-section-4-scroll">
                {events.length ? (
                  events?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="dashboard-section-4-content-calendar"
                      >
                        <div className="dashboard-section-4-event">
                          <p className="dashboard-section-4-event-txt">
                            {item.name}
                          </p>
                        </div>
                        <div className="dashboard-section-4-employee">
                          <div className="dashboard-section-4-text">
                            <div className="dashboard-section-4-event-date-cont">
                              <p className="dashboard-section-4-event-date">
                                {new Date(item.from).toLocaleDateString(
                                  "es-ES",
                                  optionsDate
                                )}
                              </p>
                              <p className="dashboard-section-4-event-time">
                                {tConvert(item.startTime)} -{" "}
                                {tConvert(item.endingTime)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="dashboard-nodata-cont">
                    <img src={Images.nodata} alt="" />
                    <p>No se registran proximos eventos</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* multimedia */}
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
            </div>: 
            <div className="dashboard-nodata-cont">
              <img src={Images.nodata} alt="" />
              <p>No se registran informacion multimedia</p>
            </div> }     
          </div>
        </div>

         {/* logo */}
         <div className="dashboard-section-6"> 
          <div className="dashboard-section-6-logo">
            <img className="dashboard-section-6-logo-icon" src={Images.dgappicon} alt="" />
            <p className="dashboard-section-6-logo-name">Dirección General de Alianzas Público Privadas</p>
            <p className="dashboard-section-6-logo-mention">@DGAPPDR</p>
          </div>
         </div>

          {/* social */}
            {/* <div className="dashboard-section-7">   
              <div className="dashboard-section-7-grid">
                <div className="dashboard-section-7-section">
                    <p>TWITTER</p>
                  <div className="dashboard-section-7-section-cont">
                     <div className="dashboard-section-7-section-twitter">
                      </div>
                      <div className="dashboard-section-7-section-twitter">
                      </div>
                  </div>
                </div>
                <div className="dashboard-section-7-section-line">
                  <span></span>
                </div>
                <div className="dashboard-section-7-section">
                    <p>INSTAGRAM</p>
                  <div className="dashboard-section-7-section-cont">
                     <div className="dashboard-section-7-section-twitter">
                      </div>
                      <div className="dashboard-section-7-section-twitter">
                      </div>
                  </div>
                </div>
              </div>
            </div> */}
      </div>
    </>
  );
};

export default DashboardForm;
