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
            <input
              onChange={handlerInputChange}
              name="firstname"
              type="text"
              placeholder="Escriba el nombre"
              className="edit-input"
              value={formData.firstname.replace(/[^a-zA-ZñÑ ]/g, "")}
            />
            <div className="input-required">*</div>
          </div>

          <div className="">
            <p className="edit-input-title">Apellido</p>
            <Input
              onChange={handlerInputChange}
              name="lastname"
              type="text"
              placeholder="Escriba el apellido"
              classInput="edit-input"
              value={formData.lastname.replace(/[^a-zA-ZñÑ ]/g, "")}
            />
            <div className="input-required">*</div>
          </div>

          <div className="">
            <p className="edit-input-title">Cedula</p>
            <Input
              onChange={handlerInputChange}
              name="documentid"
              type="text"
              placeholder="Escriba la cedula"
              classInput="edit-input"
              value={formData.documentid.replace(/[^0-9.]/g, "")}
              maxLength={11}
            />
            <div className="input-required">*</div>
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
              value={formData.cel.replace(/[^0-9.]/g, "")}
              maxLength={10}
            />
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Fecha de Nacimiento</p>
            {/* <DatePicker
              // name="date"
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              // value={formData.date}
              className="edit-input"
              // selected={startDate}
              // onChange={(date: Date) => setStartDate(date)}
            /> */}
            <Input
              // id="titleinput"
              // value={date}
              onChange={handlerInputChange}
              name="date"
              type="date"
              classInput="edit-input"
              value={formData.date}
            />
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Tipo de Sangre</p>
            {/* <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="blood"
              type="text"
              placeholder="Escriba el tipo de sangre"
              classInput="edit-input"
              value={formData.blood}
            /> */}
            <select
              // defaultValue="Seleccionar una Departamento"
              name="blood"
              className="edit-input"
              onChange={handlerInputChange}
              // value={"Escriba el departamento"}
              defaultValue={"DEFAULT"}
            >
              <option disabled value="DEFAULT">
                Seleccionar el tipo de sangre
              </option>
              <option>A+</option>
              <option>O+</option>
              <option>B+</option>
              <option>AB+</option>
              <option>A-</option>
              <option>O-</option>
              <option>B-</option>
              <option>AB-</option>
            </select>
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
              value={formData.career.replace(/[^a-zA-ZñÑ ]/g, "")}
            />
          </div>
          <div className="">
            <p className="edit-input-title">Nombre Conctato de Emergencia</p>
            <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="emergencyname"
              type="text"
              placeholder="Escriba el nonbre de el conctato de emergencia"
              classInput="edit-input"
              value={formData.emergencyname.replace(/[^a-zA-ZñÑ ]/g, "")}
            />
          </div>
          <div className="">
            <p className="edit-input-title">Numero Conctato de Emergencia</p>
            <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="emergencynumber"
              type="text"
              placeholder="Escriba el numero de el conctato de emergencia"
              classInput="edit-input"
              value={formData.emergencynumber.replace(/[^0-9.]/g, "")}
            />
          </div>
          <div className="">
            <p className="edit-input-title">Relacion Conctato de Emergencia</p>
            <Input
              onChange={handlerInputChange}
              name="emergencyrelationship"
              type="text"
              placeholder="tipo de relacion de el conctato de emergencia"
              classInput="edit-input"
              value={formData.emergencyrelationship.replace(
                /[^a-zA-ZñÑ ]/g,
                ""
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalInformation;
