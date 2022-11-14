import React from "react";
import { MdConstruction } from "react-icons/md";

const BuildingForm = () => {
  return (
    <>
      <div className="container-inconstruction">
        <i className="bs bs-emojifrown" />
        <MdConstruction size="8rem" color="#787A91" />
        <p className="title-inconstruction">PÁGINA EN CONSTRUCCIÓN</p>
        <p className="subtitle-inconstruction">
          Lo sentimos, por el momento estamos trabajando en ello!
        </p>
      </div>
    </>
  );
};

export default BuildingForm;
