import React from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-hot-toast";

const Footer = () => {
  const history = useHistory();
  const aboutUSChange = (e, name) => {
    e.preventDefault();

    history.push({
      pathname: "./aboutus",
      state: name,
    });
  };
  const goToDownload = (e, name) => {
    e.preventDefault();
    history.push({
      pathname: "./download",
      state: name,
    });
  };

  const msgDisable = () => {
    return toast.error(
      "Lo sentimos por el momento esta opción esta deshabilita. Estamos trabajando en ello."
    );
    //history.push('./')
  };

  return (
    <>
      {/* Footer */}
      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#1c2331" }}
      >
        {/* Section: Social media */}
        <section
          className="d-flex justify-content-between p-4"
          style={{ backgroundColor: "#6351ce" }}
        >
          {/* Left */}
          <div className="me-5">
            <span>Conéctate con nosotros en las redes sociales:</span>
          </div>
          {/* Left */}
          {/* Right */}
          <div>
            <a
              href="https://www.facebook.com/dgapprd"
              className="text-white me-4"
            >
              <i className="fab fa-facebook-f" />
              <FaFacebookF size="2.5em" />
            </a>
            <a href="https://twitter.com/dgapprd" className="text-white me-4">
              <i className="fab fa-twitter" />
              <FaTwitter size="2.5em" />
            </a>
            <a href="https://dgapp.gob.do/" className="text-white me-4">
              <i className="fab fa-google" />
              <FaGoogle size="2.5em" />
            </a>
            <a
              href="https://www.instagram.com/dgapprd/?hl=en"
              className="text-white me-4"
            >
              <i className="fab fa-instagram size-icon" />
              <FaInstagram size="2.5em" />
            </a>
          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}
        {/* Section: Links  */}
        <section>
          <div className="container m-0 text-center text-md-start mt-2">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold">
                  DIRECCIÓN GENERAL DE ALIANZAS PÚBLICO-PRIVADAS
                </h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p style={{ fontSize: "0.8rem" }}>
                  La DGAPP es la institución responsable de la estructuración,
                  promoción, supervisión y regulación de los proyectos de
                  infraestructura, bienes y servicios de interés social, que se
                  planifiquen y desarrollen en República Dominicana bajo la
                  modalidad de alianzas público privadas (APP).
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">NOSOTROS</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    onClick={(e) =>
                      aboutUSChange(e, "MISION, VISION Y VALORES")
                    }
                    href="#/"
                    className="footer-txt"
                  >
                    Mision, Vision y Valores
                  </a>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    onClick={(e) => aboutUSChange(e, "FUNCIONES")}
                    href="#/"
                    className="footer-txt"
                  >
                    Funciones
                  </a>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    onClick={(e) => aboutUSChange(e, "MARCO INSTITUCIONAL")}
                    href="#/"
                    className="footer-txt"
                  >
                    Marco Institucional
                  </a>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    onClick={(e) => aboutUSChange(e, "DIRECTOR GENERAL")}
                    href="#!"
                    className="footer-txt"
                  >
                    Director General
                  </a>
                </p>
                <p>
                  <a
                    style={{ textDecoration: "none" }}
                    onClick={(e) => aboutUSChange(e, "ORGANIGRAMA")}
                    href="#!"
                    className="footer-txt"
                  >
                    Organigrama
                  </a>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-3 mx-auto mb-4">
                {/* Links */}
                {/* <h6 className="text-uppercase fw-bold">NORMATIVAS</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <a
                    onClick={(e) => goToRegulations(e, "MARCO LEGAL")}
                    style={{ textDecoration: "none" }}
                    href="#/"
                    className="footer-txt"
                  >
                    Marco Legal
                  </a>
                </p>
                <p>
                  <a
                    onClick={(e) => goToRegulations(e, "LEYES")}
                    style={{ textDecoration: "none" }}
                    href="#/"
                    className="footer-txt"
                  >
                    Leyes
                  </a>
                </p>
                <p>
                  <a
                    onClick={(e) => goToRegulations(e, "REGLAMENTOS")}
                    style={{ textDecoration: "none" }}
                    href="#/"
                    className="footer-txt"
                  >
                    Reglamentos
                  </a>
                </p>
                <p>
                  <a
                    onClick={(e) => goToRegulations(e, "RESOLUCIONES")}
                    style={{ textDecoration: "none" }}
                    href="#/"
                    className="footer-txt"
                  >
                    Resoluciones
                  </a>
                </p>
                <p>
                  <a
                    onClick={(e) => goToRegulations(e, "CONSULTAS PÚBLICAS")}
                    style={{ textDecoration: "none" }}
                    href="#/"
                    className="footer-txt"
                  >
                    Consultas Públicas
                  </a>
                </p> */}
                <h6 className="text-uppercase fw-bold">SOLICITUDES</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <a
                    // onClick={(e) => goToDownload(e, "CARTA LABORAL")}
                    onClick={msgDisable}
                    href="#/"
                    className="footer-txt"
                  >
                    Carta Laboral
                  </a>
                </p>
                <p>
                  <a
                    // onClick={(e) => goToDownload(e, "SEGURO MEDICO")}
                    onClick={msgDisable}
                    style={{ textDecoration: "none" }}
                    href="#/"
                    className="footer-txt"
                  >
                    Seguro Medico
                  </a>
                </p>
                <p>
                  <a
                    // onClick={(e) => goToDownload(e, "SOLICITUD DE VACACIONES")}
                    onClick={msgDisable}
                    style={{ textDecoration: "none" }}
                    href="#/"
                    className="footer-txt"
                  >
                    Solicitud de Vacaciones
                  </a>
                </p>
                <p>
                  <a
                    // onClick={(e) => goToDownload(e, "SOLICITUD DE MATERNIDAD")}
                    onClick={msgDisable}
                    style={{ textDecoration: "none" }}
                    href="#/"
                    className="footer-txt"
                  >
                    Solicitud de Maternidad
                  </a>
                </p>
                <p>
                  <a
                    // onClick={(e) => goToDownload(e, "SOLICITUD DE ENFERMEDAD")}
                    onClick={msgDisable}
                    style={{ textDecoration: "none" }}
                    href="#/"
                    className="footer-txt"
                  >
                    Solicitud de Enfermedad
                  </a>
                </p>
                <p>
                  <a
                    // onClick={(e) => goToDownload(e, "FORMULARIO DE DESEMPEÑO")}
                    onClick={msgDisable}
                    style={{ textDecoration: "none" }}
                    href="#/"
                    className="footer-txt"
                  >
                    Formulario de desempeño
                  </a>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
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
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        {/* <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div> */}
        {/* Copyright */}
      </footer>
      {/* Footer */}

      {/* End of .container */}
    </>
  );
};

export default Footer;
