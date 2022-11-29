import React, { useEffect, useState } from "react";
import StrategicMap from "./StrategicMap";
import Functions from "./Functions";
import InstitutionalFramework from "./InstitutionalFramework";
import Director from "./Director";
import OrganizationChart from "./OrganizationChart";
import useScreenSize from "../../hooks/useScreenSize";
import { useLocation } from "react-router-dom";



const AboutUs = () => {
  const [getModule, setGetModule] = useState("");
  const [getMargin, setGetMargin] = useState("");
  const { width, height } = useScreenSize();

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      if (location.state === "MISIÓN, VISIÓN Y VALORES") {
        setGetModule(<StrategicMap />);
        setGetMargin("30rem");
      } else if (location.state === "FUNCIONES") {
        setGetModule(<Functions />);
        setGetMargin(width <= 1021 ? "175rem" : "77rem");
      } else if (location.state === "MARCO INSTITUCIONAL") {
        setGetModule(<InstitutionalFramework />);
        setGetMargin(width <= 1021 ? "9rem" : "35rem");
      } else if (location.state === "DIRECTOR GENERAL") {
        setGetModule(<Director />);
        setGetMargin(width <= 1021 ? "15rem" : "28rem");
      } else if (location.state === "ORGANIGRAMA") {
        setGetModule(<OrganizationChart />);
        setGetMargin(width <= 1021 ? "9rem" : "47rem");
      }
    } else {
      setGetModule(<StrategicMap />);
      setGetMargin("30em");
    }
  }, [location.state, width]);

  return (
    <>
      <div className="aboutus-card-container">
        <div className="aboutus-card">{getModule}</div>
      </div>
      <div
        style={{ marginBottom: getMargin }}
        className="aboutus-header-container"
      >
        <div className="aboutus-header-title">
          {location.state ? location.state.toUpperCase() : "MISION, VISION Y VALORES"}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
