import React from "react";
import CarouselComponent from "../../common/components/Carousel/CarouselComponent";
import { GoMegaphone } from "react-icons/go";
import { FaBirthdayCake } from "react-icons/fa";
import { GiGlassCelebration } from "react-icons/gi";
import ReactPlayer from "react-player";
import Calendar from "react-calendar";

import Images from "../../common/images";

const DashboardForm = () => {
  return (
    <>
      <div className="dashboard-main-container">
        <div className="dashboard-first-seccion-container">
          <div className="dashboard-first-seccion-carousel">
            <CarouselComponent />
          </div>
          <div className="dashboard-first-seccion-separation"></div>
          <div className="dashboard-first-seccion-news">
            <div className="dashboard-first-seccion-news-header">
              <i className="go go-megaphone" />
              <GoMegaphone
                size="1.2rem"
                color="rgb(42, 52, 63)"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-first-seccion-news-header-txt">
                Noticias/Anuncios
              </div>
            </div>
            <div className="dashboard-first-seccion-news-content">
              <img
                className="dashboard-first-seccion-news-content-img"
                src={Images.prueba2}
                alt=""
              />
              <div className="dashboard-first-seccion-news-content-txt">
                <div className="dashboard-first-seccion-news-content-txt-title">
                  DIA DE LOS PADRES
                </div>
                <div className="dashboard-first-seccion-news-content-txt-inf">
                  is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </div>
              </div>
            </div>
            <div className="dashboard-first-seccion-news-content">
              <img
                className="dashboard-first-seccion-news-content-img"
                src={Images.prueba2}
                alt=""
              />
              <div className="dashboard-first-seccion-news-content-txt">
                <div className="dashboard-first-seccion-news-content-txt-title">
                  DIA DE LOS PADRES
                </div>
                <div className="dashboard-first-seccion-news-content-txt-inf">
                  is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </div>
              </div>
            </div>
            <div className="dashboard-first-seccion-news-content">
              <img
                className="dashboard-first-seccion-news-content-img"
                src={Images.prueba2}
                alt=""
              />
              <div className="dashboard-first-seccion-news-content-txt">
                <div className="dashboard-first-seccion-news-content-txt-title">
                  DIA DE LOS PADRES
                </div>
                <div className="dashboard-first-seccion-news-content-txt-inf">
                  is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </div>
              </div>
            </div>
            <div className="dashboard-first-seccion-news-content-btn">
              <button type="button" className="dashboard-news-btn">
                Ir a Todas
              </button>
            </div>
          </div>
        </div>
        <div className="dashboard-second-seccion-container">
          <div className="dashboard-second-seccion-video">
            <ReactPlayer
              width="97%"
              height="85%"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              url="https://www.youtube.com/watch?v=_nUlI4w8m0I"
              controls
            />
            <p className="dashboard-second-video-title">
              Recorrido por Pedernales
            </p>
          </div>
          <div className="dashboard-first-seccion-separation"></div>
          <div className="dashboard-second-seccion-board">
            <Calendar />
            {/* <div className="dashboard-second-seccion-board-activity">
              <div className="dashboard-second-seccion-board-video">
                <ReactPlayer
                  width="17rem"
                  height="11rem"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  url="https://www.youtube.com/watch?v=_nUlI4w8m0I"
                />
              </div>
              <div className="dashboard-second-seccion-board-calendary"></div>
            </div> */}
            {/* <div className="dashboard-second-seccion-board-buttons">
              <div className="dashboard-second-seccion-board-btn">
                <button className="dashboard-second-seccion-board-btn-1">
                  Boletin
                </button>
              </div>
            </div> */}
          </div>
          <div className="dashboard-first-seccion-separation"></div>
          <div className="dashboard-second-seccion-birth">
            <div className="dashboard-second-seccion-birth-header">
              <i className="fa fa-birthday-cake" />
              <FaBirthdayCake
                size="1.1rem"
                color="rgb(42, 52, 63)"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-second-seccion-birth-name">
                Cumpleaños
              </div>
            </div>
            <div className="dashboard-second-seccion-name">
              <div className="dashboard-first-seccion-news-content-txt-title">
                <i className="gi gi-glass-celebration" />
                <GiGlassCelebration
                  size="1.5rem"
                  color="7A4495"
                  style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                />
                Rosalia Gonzalez
              </div>
              <div className="dashboard-second-seccion-dept">
                Depart - Comunicaciones
              </div>
              <div className="dashboard-second-seccion-dept">15 MARZO</div>
            </div>
            <div className="dashboard-second-seccion-name">
              <div className="dashboard-first-seccion-news-content-txt-title">
                <i className="gi gi-glass-celebration" />
                <GiGlassCelebration
                  size="1.5rem"
                  color="7A4495"
                  style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                />
                Rosalia Gonzalez
              </div>
              <div className="dashboard-second-seccion-dept">
                Depart - Comunicaciones
              </div>
              <div className="dashboard-second-seccion-dept">15 MARZO</div>
            </div>
            <div className="dashboard-second-seccion-name">
              <div className="dashboard-first-seccion-news-content-txt-title">
                <i className="gi gi-glass-celebration" />
                <GiGlassCelebration
                  size="1.5rem"
                  color="7A4495"
                  style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                />
                Rosalia Gonzalez
              </div>
              <div className="dashboard-second-seccion-dept">
                Depart - Comunicaciones
              </div>
              <div className="dashboard-second-seccion-dept">15 MARZO</div>
            </div>
            <div className="dashboard-first-seccion-news-content-btn">
              <button type="button" className="dashboard-birth-btn">
                Ver Todos
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardForm;
