import React from 'react'
import Images from "../../common/images/index";

const DashboardSection2 = ({ employeedirectory, requestMenu, inConstruction }) => {
  return (
    <>
      <div className="dashboard-section-2">
        <div className="dashboard-section-btn-container">
          <div onClick={inConstruction} className="dashboard-section-btn">
            <img
              className="dashboard-section-btn-img"
              src={Images.induccion}
              alt=""
            />
            <p>INDUCCIÓN</p>
          </div>
          <div onClick={employeedirectory} className="dashboard-section-btn">
            <img
              className="dashboard-section-btn-img"
              src={Images.directorio}
              alt=""
            />
            <p>DIRECTORIO</p>
          </div>
          <div onClick={inConstruction} className="dashboard-section-btn">
            <img
              className="dashboard-section-btn-img"
              src={Images.capacitacion}
              alt=""
            />
            <p>CAPACITACIÓN</p>
          </div>
          <div onClick={inConstruction} className="dashboard-section-btn">
            <img
              className="dashboard-section-btn-img"
              src={Images.politicas}
              alt=""
            />
            <p>POLÍTICAS INSTITUCIONALES</p>
          </div>
          <div onClick={inConstruction} className="dashboard-section-btn">
            <img
              className="dashboard-section-btn-img"
              src={Images.recursos}
              alt=""
            />
            <p>RECURSOS</p>
          </div>
          <div onClick={requestMenu} className="dashboard-section-btn">
            <img
              className="dashboard-section-btn-img"
              src={Images.solicitudes}
              alt=""
            />
            <p>SOLICITUDES</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardSection2