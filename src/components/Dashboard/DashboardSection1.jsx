import React from 'react'
import CarouselMain from "./CarouselMain";
// import Images from "../../common/images/index";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { Link } from 'react-router-dom';
import useScreenSize from "../../hooks/useScreenSize";

const DashboardSection1 = ({ news, goToPost, arrayCarousel }) => {

  const { width } = useScreenSize();

  return (
    <>
      <div className="dashboard-section-1">
        <div className="dashboard-section-1-grid">
          <div className="dashboard-section-1-carousel">
            <CarouselMain arrayCarousel={arrayCarousel} />
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
                null
                // <div className="dashboard-nodata-cont">
                //   <img src={Images.nodata} alt="" />
                //   <p>No se encuentran noticias</p>
                // </div>
              )}
            </div>

            {news.length ? (
              <div className="dashboard-section-1-news-btn-container">
                <Link to={"/publicaciones/noticias/pagina/1"}
                  state={{ category: "Noticia" }}
                  type="button"
                  className="dashboard-section-1-news-btn"
                >
                  <i className="md md-outline-double-arrow" />
                  <p>Ir a Noticias</p>
                  <MdOutlineDoubleArrow
                    size={width < 5021 ? "1.2rem" : "2.5rem"}
                    color="white"
                    style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                  />
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardSection1