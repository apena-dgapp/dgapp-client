import React from "react";
import StrategicMap from "./StrategicMap";

const AboutUs = () => {
  return (
    <>
      <div className="aboutus-card-container">
        <div className="aboutus-card">
          <StrategicMap />
        </div>
      </div>
      <div className="aboutus-header-container">
        <div className="aboutus-header-title">Mision, Vision y Valores</div>
      </div>
    </>
  );
};

export default AboutUs;
