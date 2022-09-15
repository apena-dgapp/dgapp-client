import React from "react";
// import DatePicker from "react-multi-date-picker";
// import Input from "../../common/components/Input/Input";

function PersonalInformation({ handlerInputChange, formData, validateId }) {
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
              value={formData.firstname?.replace(/[^a-zA-ZñÑ ]/g, "")}
            />
            <div className="input-required">*</div>
          </div>

          <div className="">
            <p className="edit-input-title">Apellido</p>
            <input
              onChange={handlerInputChange}
              name="lastname"
              type="text"
              placeholder="Escriba el apellido"
              className="edit-input"
              value={formData.lastname?.replace(/[^a-zA-ZñÑ ]/g, "")}
            />
            <div className="input-required">*</div>
          </div>

          <div className="">
            <p className="edit-input-title">Cedula</p>
            <div className="new-employee-documentid">
              <input
                onChange={handlerInputChange}
                name="documentid"
                type="text"
                placeholder="Escriba la cedula"
                className="edit-input new-employee-inputid"
                value={formData.documentid?.replace(/[^0-9.]/g, "")}
                maxLength={11}
              />
              <div className="input-required">*</div>
              {validateId ? (
                <div class="success-icon">
                  <div class="success-icon__tip"></div>
                  <div class="success-icon__long"></div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="">
            <p className="edit-input-title">Celular</p>
            <input
              // id="titleinput"
              onChange={handlerInputChange}
              name="cel"
              type="text"
              placeholder="Numero de celular"
              className="edit-input"
              value={formData.cel?.replace(/[^0-9.]/g, "")}
              maxLength={10}
            />
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Fecha de Nacimiento</p>
            {/* <DatePicker
              name="date"
              onChange={handlerInputChange}
              className="edit-input"
              value={new Date(formData.date)}
              // dateFormat="yyyy/MM/dd"
              // selected={startDate}
              // onChange={(date: Date) => setStartDate(date)}
            /> */}
            <input
              onChange={handlerInputChange}
              name="date"
              type="date"
              className="edit-input"
              value={formData.date}
            />
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Tipo de Sangre</p>

            <select
              name="blood"
              className="edit-input"
              onChange={handlerInputChange}
              defaultValue={"DEFAULT"}
            >
              <option disabled value="DEFAULT">
                Seleccionar el tipo de Sangre
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
            <input
              onChange={handlerInputChange}
              name="career"
              type="text"
              placeholder="Escriba la carrera"
              className="edit-input"
              value={formData.career?.replace(/[^a-zA-ZñÑ ]/g, "")}
            />
          </div>
          <div className="">
            <p className="edit-input-title">Nombre Conctato de Emergencia</p>
            <input
              // id="titleinput"
              onChange={handlerInputChange}
              name="emergencyname"
              type="text"
              placeholder="Escriba el nonbre de el conctato de emergencia"
              className="edit-input"
              value={formData.emergencyname?.replace(/[^a-zA-ZñÑ ]/g, "")}
            />
          </div>
          <div className="">
            <p className="edit-input-title">Numero Conctato de Emergencia</p>
            <input
              // id="titleinput"
              onChange={handlerInputChange}
              name="emergencynumber"
              type="text"
              placeholder="Escriba el numero de el conctato de emergencia"
              className="edit-input"
              value={formData.emergencynumber?.replace(/[^0-9.]/g, "")}
              maxLength={10}
            />
          </div>
          <div className="">
            <p className="edit-input-title">Relacion Conctato de Emergencia</p>
            <input
              onChange={handlerInputChange}
              name="emergencyrelationship"
              type="text"
              placeholder="tipo de relacion de el conctato de emergencia"
              className="edit-input"
              value={formData.emergencyrelationship?.replace(
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
