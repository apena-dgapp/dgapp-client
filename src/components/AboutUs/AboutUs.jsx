import React from "react";
import StrategicMap from "./StrategicMap";
import Functions from "./Functions";
import InstitutionalFramework from "./InstitutionalFramework";

var component;
var title;
const AboutUs = (state) => {
  const data = state.location.state;

  if (data) {
    if (data === "Mision, Vision y Valores") {
      title = "MISION, VISION Y VALORES";
      component = <StrategicMap />;
    } else if (data === "Funciones") {
      title = "FUNCIONES";
      component = <Functions />;
    } else if (data === "Marco Institucional") {
      title = "MARCO INSTITUCIONAL";
      component = <InstitutionalFramework />;
    }
  }

  return (
    <>
      <div className="aboutus-card-container">
        <div className="aboutus-card">{component}</div>
      </div>
      <div className="aboutus-header-container">
        <div className="aboutus-header-title">{title}</div>
      </div>
    </>
  );
};

export default AboutUs;
