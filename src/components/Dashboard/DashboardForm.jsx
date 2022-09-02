import React from "react";
import CarouselComponent from "../../common/components/Carousel/CarouselComponent";
import { GoMegaphone } from "react-icons/go";
import { FaBirthdayCake, FaConciergeBell, FaVideo } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { GiNewspaper, GiOrganigram, GiFullFolder } from "react-icons/gi";
import { ImNewspaper } from "react-icons/im";
import { MdSchool } from "react-icons/md";
import ReactPlayer from "react-player";
import Images from "../../common/images/index";
import { Calendar } from "react-multi-date-picker";

const DashboardForm = ({ ad, news, birthday, events, eventDate }) => {
  var optionsDate = { month: "long", day: "numeric" };

  // const [values, setValues] = useState([
  //   new DateObject().subtract(4, "days"),
  //   new DateObject().add(4, "days")
  // ])

  const months = [
    ["Enero", "j"],
    ["Febrero", "f"],
    ["Marzo", "m"],
    ["Abril", "a"],
    ["Mayo", "m"],
    ["Junio", "j"],
    ["Julio", "j"],
    ["Agosto", "a"],
    ["Septiembre", "s"],
    ["Octubre", "o"],
    ["Noviembre", "n"],
    ["Diciembre", "d"],
  ];

  const weekDays = [
    ["s", "Domingo"],
    ["m", "Lunes"],
    ["t", "Martes"],
    ["w", "Miércoles"],
    ["t", "Jueves"],
    ["f", "Viernes"],
    ["s", "Sábado "],
  ];

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

            {ad.length ? (
              ad?.map((item, index) => {
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
                        {item.description.replace(/(<([^>]+)>)/gi, "")}
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
              })
            ) : (
              <div className="dashboard-nodata-cont">
                <img src={Images.noad} alt="" />
                <p>No se registra nuevos anuncios</p>
              </div>
            )}

            {birthday.length ? (
              <div className="dashboard-first-seccion-news-content-btn">
                <button type="button" className="dashboard-news-btn">
                  Ir a Todas
                </button>
              </div>
            ) : null}
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
              width="95%"
              height="80%"
              style={{ marginTop: "0.5rem" }}
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
                        {item.description.replace(/(<([^>]+)>)/gi, "")}
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

              <div className="dashboard-calendar-container">
                {events.length ? (
                  events?.map((item, key) => {
                    return (
                      <div key={key} className="dashboard-second-activities">
                        <div className="dashboard-second-event-grid">
                          <div className="dashboard-second-birth-employee-inf">
                            <div className="dashboard-second-birth-employee-name">
                              <div>
                                <p
                                  style={{ color: item.color }}
                                  className="dashboard-second-activities-title"
                                >
                                  {item.name}
                                </p>
                              </div>
                              <div>
                                <p className="m-0">{item.room}</p>
                              </div>
                            </div>
                          </div>
                          <div className="dashboard-second-birth-employee-day">
                            <div>
                              <p className="m-0 fs-9 fw-bold">FECHA</p>
                            </div>
                            <div>
                              <p className="m-0 fs-9">{item.from}</p>
                            </div>
                            <div>
                              <p className="m-0">
                                {item.startTime} - {item.endingTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="dashboard-nodata-cont">
                    <img src={Images.noCalendar} alt="" />
                    <p>No se registra proximos eventos</p>
                  </div>
                )}
              </div>
            </div>
            <div className="dashboard-event-calendar">
              <div className="dashboard-second-activities-caledar">
                <Calendar
                  mapDays={({ date }) => {
                    let props = {};
                    let isWeekend = [0, 6].includes(date.weekDay.index);

                    if (isWeekend) props.className = "highlight-red";

                    return props;
                  }}
                  months={months}
                  weekDays={weekDays}
                  multiple
                  value={eventDate}
                  // range
                  // readOnly={true}
                />
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

              {birthday.length ? (
                birthday?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      id={item.personId}
                      className="dashboard-second-birth-employee"
                    >
                      <div className="dashboard-second-birth-employee-grid">
                        <div className="dashboard-second-birth-employee-inf">
                          <div>
                            <img
                              className="dashboard-second-birth-employee-photo"
                              src={item.photo ? item.photo : Images.noImg}
                              alt=""
                            />
                          </div>
                          <div className="dashboard-second-birth-employee-name">
                            <div>
                              <p className="m-0 fw-bold">{item.name}</p>
                            </div>
                            <div>
                              <p className="m-0">{item.departament}</p>
                            </div>
                          </div>
                        </div>
                        <div className="dashboard-employee-name-separator"></div>
                        <div className="dashboard-second-birth-employee-day">
                          <div>
                            <p className="m-0 fs-2">{item.day.split("-")[0]}</p>
                          </div>
                          <div>
                            <p className="m-0">{item.day.split("-")[1]}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="dashboard-nodata-cont">
                  <img src={Images.noCake} alt="" />
                  <p>No se registra cumpleaños para este mes</p>
                </div>
              )}

              {birthday.length ? (
                <div className="dashboard-birth-content-btn">
                  <button type="button" className="dashboard-birth-btn">
                    Ver Todos
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardForm;
