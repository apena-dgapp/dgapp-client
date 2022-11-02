import React from 'react'
import Images from "../../common/images/index";

const DashboardSection2 = ({employeedirectory, inConstruction}) => {
  return (
    <>
        <div className="dashboard-section-2">
          <div className="dashboard-section-btn-container">
            <div className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.induccion}
                alt=""
              />
              <p onClick={inConstruction}>INDUCCIÓN</p>
            </div>
            <div onClick={employeedirectory} className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.directorio}
                alt=""
              />
              <p>DIRECTORIO</p>
            </div>
            <div className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.capacitacion}
                alt=""
              />
              <p onClick={inConstruction}>CAPACITACIÓN</p>
            </div>
            <div className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.politicas}
                alt=""
              />
              <p onClick={inConstruction}>POLÍTICAS INSTITUCIONALES</p>
            </div>
            <div className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.recursos}
                alt=""
              />
              <p onClick={inConstruction}>RECURSOS</p>
            </div>
            <div className="dashboard-section-btn">
              <img
                className="dashboard-section-btn-img"
                src={Images.solicitudes}
                alt=""
              />
              <p onClick={inConstruction}>SOLICITUDES</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default DashboardSection2