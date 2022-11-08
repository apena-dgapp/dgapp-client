import React from "react";
import Images from "../../common/images";

const InstitutionalFramework = () => {
  return (
    <>
      <div className="strategicmap-container">
        <div className="strategicmap-title-container">
          <div className="strategicmap-title">
            El Consejo Nacional de Alianzas Público Privadas, CNAPP
          </div>
          <div className="strategicmap-content">
            El Consejo Nacional de Alianzas Público Privadas es el órgano
            superior de la Dirección General de Alianzas Público Privadas,
            responsable de las funciones de evaluación y determinación de la
            pertinencia de las alianzas público privadas presentadas de
            conformidad con esta ley.
          </div>
        </div>
      </div>

      <div className="chart-container">
        <div>
          <figure>
            <img className="chart" src={Images.consejo} alt="" />
          </figure>
        </div>
      </div>
    </>
  );
};

export default InstitutionalFramework;
