import React from "react";
import CarouselComponent from "../../common/components/Carousel/CarouselComponent";
import { MdOutlineDoubleArrow } from "react-icons/md";
// import { GoMegaphone } from "react-icons/go";
// import { FaBirthdayCake, FaConciergeBell, FaVideo } from "react-icons/fa";
// import { MdEventNote } from "react-icons/md";
// import { GiNewspaper, GiOrganigram, GiFullFolder } from "react-icons/gi";
// import { ImNewspaper } from "react-icons/im";
// import ReactPlayer from "react-player";
import Images from "../../common/images/index";
// import { Calendar } from "react-multi-date-picker";
// import { tConvert } from "../../utils/Time24To12";

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
}) => {
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
                <div className="dashboard-section-1-news-title-line"></div>
                {news.length ? (
                  news?.map((item, index) => {
                    return (
                      <div
                        key={index}
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
                    <img src={Images.nonews} alt="" />
                    <p>No se encuentran noticias recientes</p>
                  </div>
                )}
                {news.length ? (
                  <div className="dashboard-section-1-news-btn-container">
                    <div type="button" className="dashboard-section-1-news-btn">
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
            <div className="dashboard-section-btn">
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
        {/* avisos y educapp */}
        <div className="dashboard-section-3">
          <div className="dashboard-section-3-cont">
            <div className="dashboard-section-3-figure"> </div>
            <div className="dashboard-section-3-ad-educ">
              <div className="dashboard-section-3-ad"></div>
              <div className="dashboard-section-3-ad"></div>
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
              {birthday.length ? (
                birthday?.map((item, index) => {
                  return (
                    <div key={index} className="dashboard-section-4-content">
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
                          <p>{item?.name}</p>
                          <p>{item?.position}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="dashboard-nodata-cont">
                  <img src={Images.noCake} alt="" />
                  <p>No se registran cumpleaños para este mes</p>
                </div>
              )}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardForm;
