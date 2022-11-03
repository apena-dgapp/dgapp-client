import React, { useEffect, useState } from "react";
import StrategicMap from "./StrategicMap";
import Functions from "./Functions";
import InstitutionalFramework from "./InstitutionalFramework";
import Director from "./Director";
import OrganizationChart from "./OrganizationChart";

const AboutUs = (state) => {
  const [getModule, setGetModule] = useState("");
  const [getMargin, setGetMargin] = useState("");

  useEffect(() => {
    if (state.location.state) {
      if (state.location.state === "MISIÓN, VISIÓN Y VALORES") {
        setGetModule(<StrategicMap />);
        setGetMargin("30em");
      } else if (state.location.state === "FUNCIONES") {
        setGetModule(<Functions />);
        setGetMargin("77em");
      } else if (state.location.state === "MARCO INSTITUCIONAL") {
        setGetModule(<InstitutionalFramework />);
        setGetMargin("35em");
      } else if (state.location.state === "DIRECTOR GENERAL") {
        setGetModule(<Director />);
        setGetMargin("28em");
      } else if (state.location.state === "ORGANIGRAMA") {
        setGetModule(<OrganizationChart />);
        setGetMargin("47em");
      }
    }else{
      setGetModule(<StrategicMap />);
      setGetMargin("30em");
    }
  }, [state.location.state]);

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
          {state.location.state ? state.location.state.toUpperCase():"MISION, VISION Y VALORES"}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
