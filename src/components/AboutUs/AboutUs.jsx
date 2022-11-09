import React, { useEffect, useState } from "react";
import StrategicMap from "./StrategicMap";
import Functions from "./Functions";
import InstitutionalFramework from "./InstitutionalFramework";
import Director from "./Director";
import OrganizationChart from "./OrganizationChart";
import useScreenSize from "../../hooks/useScreenSize";



const AboutUs = (state) => {
  const [getModule, setGetModule] = useState("");
  const [getMargin, setGetMargin] = useState("");
  const {width, height} = useScreenSize();

  useEffect(() => {
    if (state.location.state) {
      if (state.location.state === "MISIÓN, VISIÓN Y VALORES") {
        setGetModule(<StrategicMap />);
        setGetMargin("30rem");
      } else if (state.location.state === "FUNCIONES") {
        setGetModule(<Functions />);
        setGetMargin(width <= 721 ? "175rem":"77rem");
      } else if (state.location.state === "MARCO INSTITUCIONAL") {
        setGetModule(<InstitutionalFramework />);
        setGetMargin(width <= 721 ? "6rem":"35rem");
      } else if (state.location.state === "DIRECTOR GENERAL") {
        setGetModule(<Director />);
        setGetMargin(width <= 721 ? "15rem":"28rem");
      } else if (state.location.state === "ORGANIGRAMA") {
        setGetModule(<OrganizationChart />);
        setGetMargin(width <= 721 ? "6rem":"47rem");
      }
    }else{
      setGetModule(<StrategicMap />);
      setGetMargin("30em");
    }
  }, [state.location.state, width]);

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
