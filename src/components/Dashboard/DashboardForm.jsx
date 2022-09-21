import React from "react";
import CarouselComponent from "../../common/components/Carousel/CarouselComponent";
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
                <div className="dashboard-ad-content-txt-cont">
                  {news.length ? (
                    news?.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="dashboard-first-seccion-news-content"
                        >
                          <div className="dashboard-first-seccion-news-content-txt">
                            <div className="dashboard-first-seccion-news-content-txt-title">
                              {item.title}
                            </div>
                            {/* <div className="dashboard-first-seccion-news-content-txt-inf">
                              {item.description.replace(/(<([^>]+)>)/gi, "")}
                            </div> */}
                            {/* <div className="dashboard-first-seccion-news-content-txt-date">
                          {new Date(item.createdAt).toLocaleDateString(
                            "es-ES",
                            optionsDate
                          )}
                        </div> */}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="dashboard-nodata-cont">
                      <img src={Images.noad} alt="" />
                      <p>No se registran nuevos anuncios</p>
                    </div>
                  )}
                </div>
                {news.length ? (
                  <div className="dashboard-first-seccion-news-content-btn">
                    <button type="button" className="dashboard-news-btn">
                      Ir a Todas
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardForm;
