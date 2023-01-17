import React from 'react'
import { Link } from 'react-router-dom';
import Images from "../../common/images/index";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';

const DashboardSection2 = () => {

  return (
    <>
      <div className="dashboard-section-2">
        <div className="dashboard-section-2-btn-container">
          <Link className="dashboard-section-2-btn" to={"/construccion"}>
            <img
              className="dashboard-section-2-btn-img"
              src={Images.induccion}
              alt=""
            />
            <p>INDUCCIÓN</p>
          </Link>
          <Link className="dashboard-section-2-btn" to={"/directorio/pagina/1"}>
            <img
              className="dashboard-section-2-btn-img"
              src={Images.directorio}
              alt=""
            />
            <p>DIRECTORIO</p>
          </Link>
          <Link className="dashboard-section-2-btn" to={"/construccion"}>
            <img
              className="dashboard-section-2-btn-img"
              src={Images.capacitacion}
              alt=""
            />
            <p>CAPACITACIÓN</p>
          </Link>
          <Link className="dashboard-section-2-btn" to={"/construccion"}>
            <img
              className="dashboard-section-2-btn-img"
              src={Images.politicas}
              alt=""
            />
            <p>POLÍTICAS Y PROCESOS</p>
          </Link>
          <Link className="dashboard-section-2-btn" to={"/construccion"}>
            <img
              className="dashboard-section-2-btn-img"
              src={Images.recursos}
              alt=""
            />
            <p>RECURSOS</p>
          </Link>
          <Link className="dashboard-section-2-btn" to={"/servicios/recursoshumanos/solicitudes"}>
            <img
              className="dashboard-section-2-btn-img"
              src={Images.solicitudes}
              alt=""
            />
            <p>SOLICITUDES</p>
          </Link>
        </div>
      </div>
    </>
  )
}

export default DashboardSection2