import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Footer = () => {
  const [aboutUs, setAboutUs] = useState("");
  const history = useHistory();

  const aboutUSChange = (name) => {
    history.push({
      pathname: "./aboutus",
      state: name,
    });
  };
  // console.log(aboutUs);
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
          <div className="container text-center text-md-start mt-5">
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
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">NOSOTROS</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <a
                    onClick={() => aboutUSChange("Mision, Vision y Valores")}
                    href="#/"
                    className="text-white"
                  >
                    Mision, Vision y Valores
                  </a>
                </p>
                <p>
                  <a
                    onClick={() => aboutUSChange("Funciones")}
                    href="#/"
                    className="text-white"
                  >
                    Funciones
                  </a>
                </p>
                <p>
                  <a
                    onClick={() => aboutUSChange("Marco Institucional")}
                    href="#/"
                    className="text-white"
                  >
                    Marco Institucional
                  </a>
                </p>
                <p>
                  <a
                    onClick={() => aboutUSChange("Director General")}
                    href="#!"
                    className="text-white"
                  >
                    Director General
                  </a>
                </p>
                <p>
                  <a
                    onClick={() => aboutUSChange("Organigrama")}
                    href="#!"
                    className="text-white"
                  >
                    Organigrama
                  </a>
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: 60, backgroundColor: "#7c4dff", height: 2 }}
                />
                <p>
                  <a href="#!" className="text-white">
                    Your Account
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Become an Affiliate
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Shipping Rates
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-white">
                    Help
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
                  Oficina principal - Av. Enrique Jiménez Moya #667, Santo
                  Domingo, República Dominicana
                </p>
                <p>
                  <i className="fas fa-envelope mr-3" /> info@dgapp.gob.do
                </p>
                <p>
                  <i className="fas fa-phone mr-3" /> (809) 682-7000
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2022 Copyright:
          <a className="text-white" href="https://mdbootstrap.com/">
            MDBootstrap.com
          </a>
        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}

      {/* End of .container */}
    </>
  );
};

export default Footer;
