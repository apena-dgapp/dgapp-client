import React from "react";
import CarouselComponent from "../../common/components/Carousel/CarouselComponent";
import { GoMegaphone } from "react-icons/go";
import { FaBirthdayCake, FaConciergeBell } from "react-icons/fa";
import { MdEventNote } from "react-icons/md";
import { GiNewspaper, GiOrganigram, GiFullFolder } from "react-icons/gi";
import { ImNewspaper } from "react-icons/im";
import { MdSchool } from "react-icons/md";
import ReactPlayer from "react-player";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
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
                color="white"
                style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
              />
              <div className="dashboard-first-seccion-news-header-txt">
                Anuncios
              </div>
            </div>
            <div className="dashboard-first-seccion-news-content">
              {/* <img
                className="dashboard-first-seccion-news-content-img"
                src={Images.prueba}
                alt=""
              /> */}
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
                <div className="dashboard-first-seccion-news-content-txt-date">
                  12 Julio 2022
                </div>
              </div>
            </div>
            <div className="dashboard-first-seccion-news-content">
              {/* <img
                className="dashboard-first-seccion-news-content-img"
                src={Images.prueba2}
                alt=""
              /> */}
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
                <div className="dashboard-first-seccion-news-content-txt-date">
                  12 Julio 2022
                </div>
              </div>
            </div>
            <div className="dashboard-first-seccion-news-content">
              {/* <img
                className="dashboard-first-seccion-news-content-img"
                src={Images.prueba}
                alt=""
              /> */}
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
                <div className="dashboard-first-seccion-news-content-txt-date">
                  12 Julio 2022
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
        <div className="dashboard-third-seccion-board">
          <div className="dashboard-third-seccion-board-grid">
            <div
              style={{ backgroundColor: "#019267" }}
              className="dashboard-third-seccion-board-btn"
            >
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
            <div
              style={{ backgroundColor: "#533E85" }}
              className="dashboard-third-seccion-board-btn"
            >
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
            <div
              style={{ backgroundColor: "#488FB1" }}
              className="dashboard-third-seccion-board-btn"
            >
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
            <div
              style={{ backgroundColor: "#E6B325" }}
              className="dashboard-third-seccion-board-btn"
            >
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
            <div
              style={{ backgroundColor: "#F24A72" }}
              className="dashboard-third-seccion-board-btn"
            >
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
              <div className="dashboard-news-content">
                <img
                  className="dashboard-news-content-img"
                  src={Images.prueba}
                  alt=""
                />
                <div className="dashboard-news-content-txt-cont">
                  <p className="dashboard-news-content-title">
                    Fideicomiso Pro-Pedernales, DGAPP Y el Departamento
                    Aeroportuario firman acuerdo que contempla estudio de
                    impacto ambiental para la construcción del aeropuerto
                  </p>
                  <p className="dashboard-news-content-txt">
                    is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book.
                  </p>
                  <p className="dashboard-news-content-txt-date">
                    08 Julio 2022
                  </p>
                </div>
              </div>
              <div className="dashboard-news-content">
                <img
                  className="dashboard-news-content-img"
                  src={Images.prueba2}
                  alt=""
                />
                <div className="dashboard-news-content-txt-cont">
                  <p className="dashboard-news-content-title">
                    Estudio de impacto ambiental del Proyecto Pedernales asegura
                    plan de desarrollo es viable y sugiere medidas para
                    salvaguardar el medioambiente
                  </p>
                  <p className="dashboard-news-content-txt">
                    is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book.
                  </p>
                  <p className="dashboard-news-content-txt-date">
                    08 Julio 2022
                  </p>
                </div>
              </div>
              <div className="dashboard-news-content">
                <img
                  className="dashboard-news-content-img"
                  src={Images.prueba}
                  alt=""
                />
                <div className="dashboard-news-content-txt-cont">
                  <p className="dashboard-news-content-title">
                    Director ejecutivo de la DGAPP ofrece conferencia en el
                    cierre del 104 aniversario de la Cámara de Comercio y
                    Producción de Puerto Plata
                  </p>
                  <p className="dashboard-news-content-txt">
                    is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book.
                  </p>
                  <p className="dashboard-news-content-txt-date">
                    08 Julio 2022
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="dashboard-first-seccion-news-content-btn">
              <button type="button" className="dashboard-birth-btn">
                Ver Todos
              </button>
            </div> */}
          </div>

          <div className="dashboard-first-seccion-separation"></div>
        </div>

        {/* eventos*/}
        {/* <div className="dashboard-second-seccion-container">
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
            <div className="dashboard-second-activities-grid">
              <div className="dashboard-second-activities-caledar">
                <Calendar />
              </div>
              <div className="dashboard-second-activities-event">
                <div className="dashboard-second-activities-header">
                  <i className="md md-event-note" />
                  <MdEventNote
                    size="1.1rem"
                    // color="rgb(42, 52, 63)"
                    color="white"
                    style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                  />
                  <div className="dashboard-second-seccion-birth-name">
                    Calendario/Eventos
                  </div>
                </div>
                <div className="dashboard-second-activities">
                  <div className="dashboard-second-event-grid">
                    <div className="dashboard-second-birth-employee-inf">
                      <div className="dashboard-second-birth-employee-name">
                        <div>
                          <p
                            style={{ color: "#E8630A" }}
                            className="m-0 fs-7 fw-bold"
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
                            className="m-0 fs-7 fw-bold"
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
                            style={{ color: "#4E944F" }}
                            className="m-0 fs-7 fw-bold"
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
            </div>
          </div>

          <div className="dashboard-first-seccion-separation"></div>
          <div className="dashboard-second-seccion-birth">
            <div className="dashboard-second-seccion-birth-header">
              <i className="fa fa-birthday-cake" />
              <FaBirthdayCake
                size="1.1rem"
                // color="rgb(42, 52, 63)"
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
        </div> */}
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
                  Calendario/Eventos
                </div>
              </div>
              <div className="dashboard-second-activities">
                <div className="dashboard-second-event-grid">
                  <div className="dashboard-second-birth-employee-inf">
                    <div className="dashboard-second-birth-employee-name">
                      <div>
                        <p
                          style={{ color: "#E8630A" }}
                          className="m-0 fs-7 fw-bold"
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
                          className="m-0 fs-7 fw-bold"
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
                          className="m-0 fs-7 fw-bold"
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

            {/* <div className="dashboard-event-prom">
              <div className="dashboard-fourth-promotions-header">
                <i className="md md-event-note" />
                <MdEventNote
                  size="1.1rem"
                  color="white"
                  style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                />
                <div className="dashboard-second-seccion-birth-name">
                  Promociones
                </div>
              </div>
              <div className="dashboard-fourth-promotions-content">
                <div className="dashboard-fourth-promotions-content-banner">
                  <img
                    className="dashboard-fourth-promotions-banner-img"
                    src={Images.prueba2}
                    alt=""
                  />
                </div>
                <div className="dashboard-fourth-promotions-content-banner">
                  <img
                    className="dashboard-fourth-promotions-banner-img"
                    src={Images.prueba}
                    alt=""
                  />
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* promociones */}
        {/* <div className="dashboard-fourth-seccion-board">
          <div className="dashboard-fourth-promotions-header">
            <i className="md md-event-note" />
            <MdEventNote
              size="1.1rem"
              color="white"
              style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
            />
            <div className="dashboard-second-seccion-birth-name">
              Promociones
            </div>
          </div>
          <div className="dashboard-fourth-promotions-content">
            <div className="dashboard-fourth-promotions-content-banner">
              <img
                className="dashboard-fourth-promotions-banner-img"
                src={Images.prueba}
                alt=""
              />
            </div>
            <div className="dashboard-fourth-promotions-content-banner">
              <img
                className="dashboard-fourth-promotions-banner-img"
                src={Images.prueba2}
                alt=""
              />
            </div>
            <div className="dashboard-fourth-promotions-content-banner">
              <img
                className="dashboard-fourth-promotions-banner-img"
                src={Images.prueba}
                alt=""
              />
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default DashboardForm;
