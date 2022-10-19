import React from "react";
import Images from "../../common/images";

function Director() {
  return (
    <>
      <div className="director-container">
        <div className="director-container-grid">
          <div className="director-img-container">
            <img className="director-img" src={Images.director} alt="" />
          </div>
          <div className="director-content-conatiner">
            <div className="director-content">
              Es licenciado en derecho de la Pontificia Universidad Católica
              Madre y Maestra (PUCMM) y doctorando en ciencias jurídicas de la
              Universidad de Externado (Colombia). Realizó especialidades en
              derecho administrativo en la Universidad Paris II, Francia; y en
              telecomunicaciones en el Instituto de Administración de las
              Telecomunicaciones de Canadá en Montreal. Actualmente es miembro
              del Colegio Dominicano de Abogados y presidente-fundador de la
              Asociación de Estudiantes Dominicanos en Francia y de la
              Asociación de Juristas Dominico – Franceses; funge como secretario
              de la Cámara Dominico- Israelí de Comercio. Asimismo, es docente
              de derecho administrativo y derecho de las telecomunicaciones en
              la Pontificia Universidad Católica Madre y Maestra, en las áreas
              de grado y postgrado y ocupa el cargo de director legal del
              Partido Revolucionario Moderno (PRM).
            </div>
          </div>
          <div className="director-img-container">
            <p className="director-name">SIGMUND FREUND</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Director;
