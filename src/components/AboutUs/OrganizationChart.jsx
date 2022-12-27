import React, { useState, useEffect } from "react";
import Images from "../../common/images";
import CardPopup from "./CardPopup";

const OrganizationChart = () => {
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [modalActive, setModalActive] = useState(false);

  const modalToggle = () => {
    setModalActive(!modalActive);
  };

  useEffect(
    () => {
      const update = (e) => {
        setX(e.x)
        setY(e.y)
      }
      window.addEventListener('mousemove', update)
      window.addEventListener('touchmove', update)
      return () => {
        window.removeEventListener('mousemove', update)
        window.removeEventListener('touchmove', update)
      }
    },
    [setX, setY]
  )


  return (
    <>
      <CardPopup modalActive={modalActive} x={x} y={y} />
      <div className="chart-container">
        <div className="box-con">
          {/* <h1>{`x: ${x}; y: ${y};`}</h1> */}
          <div style={{ top: "255px", left: "380px" }} className="box">
            {/* <div className="box-img">
              <img src={Images.director} alt="" />
            </div> */}
            <div className="box-text">
              <p>MINISTERIO DE LA PRESIDENCIA</p>
            </div>
          </div>
          <div style={{ top: "320px", left: "645px" }} className="box">
            <div className="box-text">
              <p>CONSEJO NACIONAL DE ALIANZAS PÚBLICO PRIVADAS</p>
            </div>
          </div>
          <div style={{ top: "320px", left: "645px" }} className="box">
            <div className="box-text">
              <p>CONSEJO NACIONAL DE ALIANZAS PÚBLICO PRIVADAS</p>
            </div>
          </div>
          {/* LINE */}
          <div style={{ top: "375px", left: "740px" }} className="box-line">
          </div>
          <div onMouseOver={() => setModalActive(true)} onMouseOut={() => setModalActive(false)} style={{ top: "410px", left: "645px" }} className="box">
            <div className="box-img">
              <img src={Images.director} alt="" />
            </div>
            <div className="box-text">
              <p>DIRECCIÓN EJECUTIVA</p>
            </div>
          </div>
          <div style={{ top: "410px", left: "950px" }} className="box">
            <div className="box-img">
              <img src={Images.director} alt="" />
            </div>
            <div className="box-text">
              <p>AUDITORIA GUBERNAMENTAL</p>
            </div>
          </div>
          <div style={{ top: "500px", left: "500px" }} className="box">
            <div className="box-img">
              <img src={Images.director} alt="" />
            </div>
            <div className="box-text">
              <p>DIRECCIÓN DE PLANIFICAÓN Y DESARROLLO</p>
            </div>
          </div>
          <div style={{ top: "590px", left: "500px" }} className="box">
            <div className="box-img">
              <img src={Images.director} alt="" />
            </div>
            <div className="box-text">
              <p>DIRECCIÓN DE RECURSOS HUMANOS</p>
            </div>
          </div>
          <div style={{ top: "680px", left: "500px" }} className="box">
            <div className="box-img">
              <img src={Images.director} alt="" />
            </div>
            <div className="box-text">
              <p>DIRECCIÓN DE COMUNICACIONES</p>
            </div>
          </div>
          {/* 
          <figure>
            <img className="chart" src={Images.chart} alt="" />
          </figure> */}
        </div>
      </div>
    </>
  );
};

export default OrganizationChart;