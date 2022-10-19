import React from "react";

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

      <div className="container">
        <div className="level-1 rectangle">DGAPP</div>
        <ol className="level-2-wrapper">
          <li className="list-unstyled">
            <div className="level-2 rectangle">
              CONSEJO NACIONAL DE ALIANZAS PÚBLICO PRIVADAS
            </div>
            <ol className="level-3-wrapper">
              <li className="list-unstyled">
                <div className="level-3 rectangle">
                  <p className="m-0">
                    Ministro de la presidencia, quien lo preside
                  </p>
                  <p className="m-0">Ministro de Hacienda</p>
                  <p className="m-0">
                    Ministro de Economía, Planificación y Desarrollo
                  </p>
                  <p className="m-0">Consultor Jurídico del Poder Ejecutivo</p>
                  <p className="m-0">
                    Dirección General de Contrataciones Públicas
                  </p>
                  <p className="m-0">
                    Director General de la Dirección General de
                  </p>
                  <p className="m-0">
                    Alianzas Públicas Privadas, con voz pero sin voto
                  </p>
                </div>
              </li>
            </ol>
          </li>
          <li className="list-unstyled">
            <div className="level-2 rectangle">DIRECTOR EJECUTIVO</div>
            <p className="m-0" style={{ fontWeight: "bold" }}>
              Designado por el decreto Presidencial
            </p>
          </li>
        </ol>
      </div>
    </>
  );
};

export default InstitutionalFramework;
