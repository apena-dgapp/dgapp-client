import React from "react";
import Input from "../../common/components/Input/Input";

function PersonalInformation({ handlerInputChange, formData }) {
  return (
    <>
      <div className="edit-subtitle-cont">
        <div className="edit-subtitle">
          <p className="">Información Personal</p>
        </div>
      </div>
      <div className="edit-input-cont">
        <div className="edit-inputs">
          <div className="">
            <p className="edit-input-title">Nombre</p>
            <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="firstname"
              type="text"
              placeholder="Escriba el nombre"
              classInput="edit-input"
              value={formData.firstname}
            />
          </div>

          <div className="">
            <p className="edit-input-title">Apellido</p>
            <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="lastname"
              type="text"
              placeholder="Escriba el apellido"
              classInput="edit-input"
              value={formData.lastname}
            />
          </div>

          <div className="">
            <p className="edit-input-title">Documento</p>
            <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="documentid"
              type="text"
              placeholder="Escriba la cedula"
              classInput="edit-input"
              value={formData.documentid}
            />
          </div>
          <div className="">
            <p className="edit-input-title">Celular</p>
            <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="cel"
              type="text"
              placeholder="Numero de celular"
              classInput="edit-input"
              value={formData.cel}
            />
          </div>
          <div className="">
            <p className="edit-input-title">Fecha de Nacimiento</p>
            <Input
              // id="titleinput"
              // value={date}
              onChange={handlerInputChange}
              name="date"
              type="date"
              classInput="edit-input"
              value={formData.date}
            />
          </div>
          <div className="">
            <p className="edit-input-title">Carrera</p>
            <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="career"
              type="text"
              placeholder="Escriba la carrera"
              classInput="edit-input"
              value={formData.career}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalInformation;
