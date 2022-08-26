import React from "react";
import CarouselComponent from "../../common/components/Carousel/CarouselComponent";
import { GoMegaphone } from "react-icons/go";
import { FaBirthdayCake, FaConciergeBell, FaVideo } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { GiNewspaper, GiOrganigram, GiFullFolder } from "react-icons/gi";
import { ImNewspaper } from "react-icons/im";
import { MdSchool } from "react-icons/md";
import ReactPlayer from "react-player";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Images from "../../common/images";

const DashboardForm = ({ ad, news }) => {
  var optionsDate = { month: "long", day: "numeric" };
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
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-first-seccion-news-header-txt">
                Anuncios
              </div>
            </div>

            {ad?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="dashboard-first-seccion-news-content"
                >
                  <div className="dashboard-first-seccion-news-content-txt">
                    <div className="dashboard-first-seccion-news-content-txt-title">
                      {item.title}
                    </div>
                    <div className="dashboard-first-seccion-news-content-txt-inf">
                      {item.description}
                    </div>
                    <div className="dashboard-first-seccion-news-content-txt-date">
                      {new Date(item.createdAt).toLocaleDateString(
                        "es-ES",
                        optionsDate
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="dashboard-first-seccion-news-content-btn">
              <button type="button" className="dashboard-news-btn">
                Ir a Todas
              </button>
            </div>
          </div>
        </div>
        <div className="dashboard-third-seccion-board">
          <div className="dashboard-third-seccion-board-grid">
            <div className="dashboard-third-seccion-board-btn">
              <i className="gi gi-newspaper" />
              <GiNewspaper
                size="2.5rem"
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-third-seccion-board-btn-txt">
                <p>Boletin</p>
              </div>
            </div>
            <div className="dashboard-third-seccion-board-btn">
              <i className="gi gi-organigram" />
              <GiOrganigram
                size="2.5rem"
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-third-seccion-board-btn-txt">
                <p>Organigrama</p>
              </div>
            </div>
            <div className="dashboard-third-seccion-board-btn">
              <i className="gi gi-full-folder" />
              <GiFullFolder
                size="2.5rem"
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-third-seccion-board-btn-txt">
                <p>Directorio</p>
              </div>
            </div>
            <div className="dashboard-third-seccion-board-btn">
              <i className="fa fa-concierge-bell" />
              <FaConciergeBell
                size="2.5rem"
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-third-seccion-board-btn-txt">
                <p>Solicitudes</p>
              </div>
            </div>
            <div className="dashboard-third-seccion-board-btn">
              <i className="md md-school" />
              <MdSchool
                size="2.5rem"
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-third-seccion-board-btn-txt">
                <p>Entrenamiento</p>
              </div>
            </div>
          </div>
        </div>
        {/* video y noticias */}
        <div className="dashboard-second-seccion-container">
          <div className="dashboard-second-seccion-video">
            <div className="dashboard-first-seccion-news-header">
              <i className="fa fa-megaphone" />
              <FaVideo
                size="1.2rem"
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-first-seccion-news-header-txt">
                Multimedia
              </div>
            </div>
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
          <div className="dashboard-news-board">
            <div className="dashboard-news-header">
              <i className="im im-newspaper" />
              <ImNewspaper
                size="1.2rem"
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-first-seccion-news-header-txt">
                Noticias
              </div>
            </div>
            <div className="dashboard-news-content-container">
              {news?.map((item, index) => {
                return (
                  <div key={index} className="dashboard-news-content">
                    <img
                      className="dashboard-news-content-img"
                      src={item.image}
                      alt=""
                    />
                    <div className="dashboard-news-content-txt-cont">
                      <p className="dashboard-news-content-title">
                        {item.title}
                      </p>
                      <p className="dashboard-news-content-txt">
                        {item.description}
                      </p>
                      <p className="dashboard-news-content-txt-date">
                        {new Date(item.createdAt).toLocaleDateString(
                          "es-ES",
                          optionsDate
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="dashboard-first-seccion-separation"></div>
        </div>

        <div className="dashboard-event-container">
          <div className="dashboard-event-grid">
            <div className="dashboard-event-cont">
              <div className="dashboard-second-activities-header">
                <i className="md md-event-note" />
                <MdEventNote
                  size="1.1rem"
                  // color="rgb(42, 52, 63)"
                  color="white"
                  style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                />
                <div className="dashboard-second-seccion-birth-name">
                  Calendario de eventos
                </div>
              </div>
              <div className="dashboard-second-activities">
                <div className="dashboard-second-event-grid">
                  <div className="dashboard-second-birth-employee-inf">
                    <div className="dashboard-second-birth-employee-name">
                      <div>
                        <p
                          style={{ color: "#E8630A" }}
                          className="dashboard-second-activities-title"
                        >
                          Convocatoria para la Formacion de La Brigada de
                          Evacuacion
                        </p>
                      </div>
                      <div>
                        <p className="m-0">Salon de Conferencias</p>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-second-birth-employee-day">
                    <div>
                      <p className="m-0 fs-9 fw-bold">FECHA</p>
                    </div>
                    <div>
                      <p className="m-0 fs-9">01 de agosto</p>
                    </div>
                    <div>
                      <p className="m-0">10:00 A.M.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-second-activities">
                <div className="dashboard-second-event-grid">
                  <div className="dashboard-second-birth-employee-inf">
                    <div className="dashboard-second-birth-employee-name">
                      <div>
                        <p
                          style={{ color: "#001E6C" }}
                          className="dashboard-second-activities-title"
                        >
                          Convocatoria para la Formacion de La Brigada de
                          Evacuacion
                        </p>
                      </div>
                      <div>
                        <p className="m-0">Salon de Conferencias</p>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-second-birth-employee-day">
                    <div>
                      <p className="m-0 fs-9 fw-bold">FECHA</p>
                    </div>
                    <div>
                      <p className="m-0 fs-9">01 de agosto</p>
                    </div>
                    <div>
                      <p className="m-0">10:00 A.M.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="dashboard-second-activities"
                style={{ border: "none" }}
              >
                <div className="dashboard-second-event-grid">
                  <div className="dashboard-second-birth-employee-inf">
                    <div className="dashboard-second-birth-employee-name ">
                      <div>
                        <p
                          style={{ color: "#4E944F" }}
                          className="dashboard-second-activities-title"
                        >
                          Convocatoria para la Formacion de La Brigada de
                          Evacuacion
                        </p>
                      </div>
                      <div>
                        <p className="m-0">Salon de Conferencias</p>
                      </div>
                    </div>
                  </div>
                  <div className="dashboard-second-birth-employee-day">
                    <div>
                      <p className="m-0 fs-9 fw-bold">FECHA</p>
                    </div>
                    <div>
                      <p className="m-0 fs-9">01 de agosto</p>
                    </div>
                    <div>
                      <p className="m-0">10:00 A.M.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-event-calendar">
              <div className="dashboard-second-activities-caledar">
                <Calendar />
              </div>
            </div>
            <div
              className="dashboard-first-seccion-separation"
              style={{ backgroundColor: "#EEEEEE" }}
            ></div>

            <div className="dashboard-second-seccion-birth">
              <div className="dashboard-second-seccion-birth-header">
                <i className="fa fa-birthday-cake" />
                <FaBirthdayCake
                  size="1.1rem"
                  color="white"
                  style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                />
                <div className="dashboard-second-seccion-birth-name">
                  Cumpleaños
                </div>
              </div>
              <div className="dashboard-second-birth-employee">
                <div className="dashboard-second-birth-employee-grid">
                  <div className="dashboard-second-birth-employee-inf">
                    <div>
                      <img
                        className="dashboard-second-birth-employee-photo"
                        src={Images.director}
                        alt=""
                      />
                    </div>
                    <div className="dashboard-second-birth-employee-name">
                      <div>
                        <p className="m-0 fw-bold">Sigmund Freund</p>
                      </div>
                      <div>
                        <p className="m-0">Despacho</p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ height: "90%", backgroundColor: "#F4E06D" }}
                  ></div>
                  <div className="dashboard-second-birth-employee-day">
                    <div>
                      <p className="m-0 fs-2">05</p>
                    </div>
                    <div>
                      <p className="m-0">JUL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-second-birth-employee">
                <div className="dashboard-second-birth-employee-grid">
                  <div className="dashboard-second-birth-employee-inf">
                    <div>
                      <img
                        className="dashboard-second-birth-employee-photo"
                        src={Images.director}
                        alt=""
                      />
                    </div>
                    <div className="dashboard-second-birth-employee-name">
                      <div>
                        <p className="m-0 fw-bold">Sigmund Freund</p>
                      </div>
                      <div>
                        <p className="m-0">Despacho</p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ height: "90%", backgroundColor: "#A084CF" }}
                  ></div>
                  <div className="dashboard-second-birth-employee-day">
                    <div>
                      <p className="m-0 fs-2">11</p>
                    </div>
                    <div>
                      <p className="m-0">JUL</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dashboard-second-birth-employee">
                <div className="dashboard-second-birth-employee-grid">
                  <div className="dashboard-second-birth-employee-inf">
                    <div>
                      <img
                        className="dashboard-second-birth-employee-photo"
                        src={Images.director}
                        alt=""
                      />
                    </div>
                    <div className="dashboard-second-birth-employee-name">
                      <div>
                        <p className="m-0 fw-bold">Sigmund Freund</p>
                      </div>
                      <div>
                        <p className="m-0">Despacho</p>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{ height: "90%", backgroundColor: "#37E2D5" }}
                  ></div>
                  <div className="dashboard-second-birth-employee-day">
                    <div>
                      <p className="m-0 fs-2">28</p>
                    </div>
                    <div>
                      <p className="m-0">JUL</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-first-seccion-news-content-btn">
                <button type="button" className="dashboard-birth-btn">
                  Ver Todos
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="dashboard-tweets-cont">
          <div className="dashboard-tweets-cont-grid">
            <div className="dashboard-tweets-cont-grid-1">
              {tweets?.map((item, index) => {
                return index < 3 ? (
                  <div
                    id={item.id}
                    key={index}
                    className="dashboard-tweets-cont-card"
                  >
                    {" "}
                    <img
                      className="dashboard-tweets-card-img"
                      src={Images.dgappLogo2}
                      alt=""
                    />
                    <p className="dashboard-tweets-card-title">
                      Dirección General de Alianzas Público Privadas
                    </p>
                    <p className="dashboard-tweets-card-user">
                      @DGAPRD - 13 Ago
                    </p>
                    <div className="dashboard-tweets-card-inf">
                      {replaceTxt(item.text)}
                    </div>
                    <div className="dashboard-tweets-card-menu">
                      <a
                        href={`https://twitter.com/intent/tweet?in_reply_to=${item.id}&related=DGAPPRD`}
                        className="dashboard-tweets-card-menu-txt"
                      >
                        <i className="fa fa-regcomment" />
                        <FaRegComment
                          className="tweets-icons"
                          size="1.1rem"
                          // color="#A5BECC"
                          cursor="pointer"
                          style={{
                            marginLeft: "0.1rem",
                            marginRight: "0.3rem",
                          }}
                        />
                        {item.public_metrics.reply_count}
                      </a>
                      <p className="dashboard-tweets-card-menu-txt">
                        <i className="fi fi-repeat" />
                        <FiRepeat
                          className="tweets-icons"
                          size="1.1rem"
                          // color="#A5BECC"
                          cursor="pointer"
                          style={{
                            marginLeft: "0.1rem",
                            marginRight: "0.3rem",
                            transform: "rotate(90deg)",
                          }}
                        />{" "}
                        {item.public_metrics.retweet_count}
                      </p>

                      <p className="dashboard-tweets-card-menu-txt">
                        <i className="fi fi-heart" />
                        <FiHeart
                          className="tweets-icons"
                          size="1.1rem"
                          // color="#A5BECC"
                          cursor="pointer"
                          style={{
                            marginLeft: "0.1rem",
                            marginRight: "0.3rem",
                          }}
                        />
                        {item.public_metrics.like_count}
                      </p>
                      <p>
                        <i className="fa fa-Twitter" />
                        <FaTwitter
                          size="1.1rem"
                          color="#1D9BF0"
                          cursor="pointer"
                        />
                      </p>
                    </div>
                  </div>
                ) : null;
              })}
            </div>
            <div className="dashboard-tweets-cont-grid-2">
              {" "}
              <div className="dashboard-tweets-cont-card"></div>
              <div className="dashboard-tweets-cont-card"></div>
              <div className="dashboard-tweets-cont-card"></div>
            </div> 
          </div>
        </div>*/}
      </div>
    </>
  );
};

export default DashboardForm;
