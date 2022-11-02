import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";

const Footer = () => {
  const history = useHistory();
  const location = useLocation();
  const [isHidden, setIsHidden] = useState(false);

  const aboutUSChange = (e, name) => {
    e.preventDefault();

    history.push({
      pathname: "./nosotros",
      state: name,
    });
  };
  // const goToDownload = (e, name) => {
  //   e.preventDefault();
  //   history.push({
  //     pathname: "./download",
  //     state: name,
  //   });
  // };

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      location.pathname !== `${process.env.REACT_APP_RUTE}` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/inicio` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/contenido` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/noticias` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/userregister` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/crear-entrada` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/employee` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/nosotros` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/organigrama` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/editar-empleado` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/nuevo-empleado` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/docdynamic` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/perfil` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/chat` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/directorio` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/training` &&
      location.pathname !== `${process.env.REACT_APP_RUTE}/registrar`
        ? setIsHidden(true)
        : setIsHidden(false);
    }

    return () => {
      unmounted = true;
    };
  }, [location.pathname]);

  return (
    <>
      <footer
        className="text-center text-lg-start text-white"
        // style={{ backgroundColor: "#1c2331" }}
        style={{ display: isHidden ? "none" : null }}
      >
        <section
          className="d-flex justify-content-between p-4"
          style={{ backgroundColor: "#6351ce" }}
        >
          <div className="me-5">
            <span>Conéctate con nosotros en las redes sociales:</span>
          </div>
          <div>
            <a
              href="https://twitter.com/dgapprd"
              className="text-white me-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter" />
              <FaTwitter size="2.5em" />
            </a>
            <a
              href="https://www.instagram.com/dgapprd/?hl=en"
              className="text-white me-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram size-icon" />
              <FaInstagram size="2.5em" />
            </a>
            <a
              href="https://www.facebook.com/dgapprd"
              className="text-white me-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f" />
              <FaFacebookF size="2.5em" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCD4BpzpTLbXj4G7xHhOxP4g"
              className="text-white me-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-youtube" />
              <FaYoutube size="2.5em" />
            </a>
            <a
              href="https://dgapp.gob.do/"
              className="text-white me-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-google" />
              <FaGoogle size="2.5em" />
            </a>
          </div>
        </section>
        <section>
          <div className="container m-0 text-center text-md-start mt-2">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-4 col-lg-5 col-xl-4 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold">
                  DIRECCIÓN GENERAL DE ALIANZAS PÚBLICO-PRIVADAS
                </h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p style={{ fontSize: "1rem" }}>
                  La DGAPP es la institución responsable de la estructuración,
                  promoción, supervisión y regulación de los proyectos de
                  infraestructura, bienes y servicios de interés social, que se
                  planifiquen y desarrollen en República Dominicana bajo la
                  modalidad de alianzas público privadas (APP).
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">NOSOTROS</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />

                <p
                  style={{ textDecoration: "none" }}
                  onClick={(e) => aboutUSChange(e, "MISION, VISION Y VALORES")}
                  className="footer-txt"
                >
                  Mision, Vision y Valores
                </p>

                <p
                  style={{ textDecoration: "none" }}
                  onClick={(e) => aboutUSChange(e, "FUNCIONES")}
                  className="footer-txt"
                >
                  Funciones
                </p>

                <p
                  style={{ textDecoration: "none" }}
                  onClick={(e) => aboutUSChange(e, "MARCO INSTITUCIONAL")}
                  className="footer-txt"
                >
                  Marco Institucional
                </p>

                <p
                  style={{ textDecoration: "none" }}
                  onClick={(e) => aboutUSChange(e, "DIRECTOR GENERAL")}
                  className="footer-txt"
                >
                  Director General
                </p>

                <p
                  style={{ textDecoration: "none" }}
                  onClick={(e) => aboutUSChange(e, "ORGANIGRAMA")}
                  className="footer-txt"
                >
                  Organigrama
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">CONTACTOS</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <i className="fas fa-home mr-3" />
                  Wendy A. Nuñez Nuñez Directora de Recursos Humanos
                </p>
                <p>
                  <i className="fas fa-envelope mr-3" />
                  wnunez@dgapp.gob.do
                </p>
                <p>
                  <i className="fas fa-phone mr-3" />
                  Ext. 7040
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default Footer;
