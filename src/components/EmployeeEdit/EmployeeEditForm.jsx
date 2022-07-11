import React from "react";
import Input from "../../common/components/Input/Input";
import { BsPlusCircleDotted, BsDashCircleDotted } from "react-icons/bs";
import Images from "../../common/images";

function EmployeeEditForm({
  profile,
  departaments,
  formData,
  handlerInputChange,
  person,
  seletedHandler,
  photo,
  removeImg,
  updateHandlerForm,
  handlerdDepartament,
  handlerdReportTo,
  clearFormData,
}) {
  // const date = new Date("06/29/2022").toISOString().split("T")[0];
  if (person) {
    var reportsTo = person?.filter(
      (item) => item.personId !== profile?.personId
    );
  }

  return (
    <>
      <div className="edit-card-container">
        <div className="edit-card">
          <div className="edit-img-cont">
            <div
              onClick={photo ? removeImg : null}
              className="upload-btn-wrapper"
            >
              <img
                className="boton-standar-rw"
                src={photo ? photo : Images.noImg}
                alt="..."
              />
              <input
                onChange={seletedHandler}
                name="img"
                className="upload-file-buton"
                type="file"
                accept=".jpg, .jpeg, .jfif, .png, .webp"
              />
              {photo ? (
                <div className="d-flex">
                  <p className="edit-img-text">Cargar Foto</p>
                  <i className="bs bs-dash-circle-dotted" />
                  <BsDashCircleDotted
                    style={{ marginRight: "0.5rem" }}
                    size="1.5rem"
                    color="red"
                  />
                </div>
              ) : (
                <div className="d-flex">
                  <p className="edit-img-text">Cargar Foto</p>
                  <i className="bs bs-plus-circle-dotted" />
                  <BsPlusCircleDotted
                    style={{
                      marginRight: "0.5rem",
                    }}
                    size="1.5rem"
                    color="darkcyan"
                  />
                </div>
              )}
            </div>
          </div>

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
                  placeholder={profile?.firstName}
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
                  placeholder={profile?.lastName}
                  classInput="edit-input"
                  value={formData.lastName}
                />
              </div>

              <div className="">
                <p className="edit-input-title">Documento</p>
                <Input
                  // id="titleinput"
                  onChange={handlerInputChange}
                  name="documentid"
                  type="text"
                  placeholder={profile?.documentId}
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
                  placeholder={profile?.celNumber}
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
                <p className="edit-input-title">Tipo de Sangre</p>
                <Input
                  // id="titleinput"
                  onChange={handlerInputChange}
                  name="blood"
                  type="text"
                  placeholder={profile?.bloodType}
                  classInput="edit-input"
                  value={formData.blood}
                />
              </div>
              <div className="">
                <p className="edit-input-title">Contacto de Emergencia</p>
                <Input
                  // id="titleinput"
                  onChange={handlerInputChange}
                  name="emergencyname"
                  type="text"
                  placeholder={profile?.emergencyName}
                  classInput="edit-input"
                  value={formData.emergencyname}
                />
              </div>
              <div className="">
                <p className="edit-input-title">
                  Numero de contacto de emergencia
                </p>
                <Input
                  // id="titleinput"
                  onChange={handlerInputChange}
                  name="emergencynumber"
                  type="text"
                  placeholder={profile?.emergencyNumber}
                  classInput="edit-input"
                  value={formData.emergencynumber}
                />
              </div>
              <div className="">
                <p className="edit-input-title">
                  Contacto de Emergencia Relacion
                </p>
                <Input
                  // id="titleinput"
                  onChange={handlerInputChange}
                  name="emergencyrelationship"
                  type="text"
                  placeholder={profile?.emergencyRelationship}
                  classInput="edit-input"
                  value={formData.emergencyrelationship}
                />
              </div>
              <div className="">
                <p className="edit-input-title">Carrera</p>
                <Input
                  // id="titleinput"
                  onChange={handlerInputChange}
                  name="career"
                  type="text"
                  placeholder={profile?.career}
                  classInput="edit-input"
                  value={formData.career}
                />
              </div>
            </div>
          </div>

          <div className="edit-org-cont">
            <div className="edit-subtitle-cont">
              <div className="edit-subtitle">
                <p className="">Información de la Institución</p>
              </div>
            </div>

            <div className="edit-input-cont">
              <div className="edit-inputs">
                <div className="">
                  <p className="edit-input-title">Codigo de Empleado</p>
                  <Input
                    // id="titleinput"
                    onChange={handlerInputChange}
                    name="code"
                    type="text"
                    placeholder={profile?.employeeCode}
                    classInput="edit-input"
                    value={formData.code}
                  />
                </div>
                <div className="">
                  <p className="edit-input-title">Posición</p>
                  <Input
                    // id="titleinput"
                    onChange={handlerInputChange}
                    name="position"
                    type="text"
                    placeholder={profile?.position}
                    classInput="edit-input"
                    value={formData.position}
                  />
                </div>

                <div className="">
                  <p className="edit-input-title">Departamento</p>
                  <select
                    // defaultValue="Seleccionar una Departamento"
                    name="departament"
                    className="edit-input"
                    onChange={handlerdDepartament}
                    value={profile?.departament}
                  >
                    <option value="" disabled selected>
                      Seleccionar una Departamento
                    </option>
                    {departaments
                      ? departaments.map((item, index) => {
                          return (
                            <option
                              id={item.departamentId}
                              key={index}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>

                <div className="">
                  <p className="edit-input-title">Se Reporta</p>
                  <select
                    // defaultValue="Seleccionar un Empleado"
                    name="reportto"
                    className="edit-input"
                    onChange={handlerdReportTo}
                    value={reportsTo?.fullName}
                  >
                    <option value="" disabled selected>
                      Seleccionar un Empleado
                    </option>
                    {reportsTo
                      ? reportsTo.map((item, index) => {
                          return (
                            <option
                              id={item.personId}
                              key={index}
                              value={item.fullName}
                            >
                              {item.fullName}
                            </option>
                          );
                        })
                      : null}
                  </select>
                </div>
                <div className="">
                  <p className="edit-input-title">Inicio Laboral</p>
                  <Input
                    // id="titleinput"
                    onChange={handlerInputChange}
                    name="startedon"
                    type="date"
                    placeholder="Por favor escriba la fecha que empezo a Laboral"
                    classInput="edit-input"
                    value={formData.startedon}
                  />
                </div>
                <div className="">
                  <p className="edit-input-title">Extensión</p>
                  <Input
                    // id="titleinput"
                    onChange={handlerInputChange}
                    name="phone"
                    type="text"
                    placeholder={profile?.phoneNumber}
                    classInput="edit-input"
                    value={formData.phone}
                  />
                </div>

                <div className="">
                  <p className="edit-input-title">Email</p>
                  <Input
                    // id="titleinput"
                    onChange={handlerInputChange}
                    name="email"
                    type="email"
                    placeholder={profile?.email}
                    classInput="edit-input"
                    value={formData.email}
                  />
                </div>
                <div className="">
                  <p className="edit-input-title">Seguro Medico</p>
                  <Input
                    // id="titleinput"
                    onChange={handlerInputChange}
                    name="health"
                    type="text"
                    placeholder={profile?.healthInsurance}
                    classInput="edit-input"
                    value={formData.health}
                  />
                </div>
                <div className="">
                  <p className="edit-input-title">Tipo de Contrato</p>
                  <select
                    // defaultValue="Seleccionar un Empleado"
                    name="contracttype"
                    className="edit-input"
                    onChange={handlerInputChange}
                    //   value={person?.fullName}
                  >
                    <option value="" disabled selected>
                      Seleccionar el tipo de Contrato
                    </option>
                    <option id="1" value="Contratado">
                      Contratado
                    </option>
                    <option id="2" value="Fijo">
                      Fijo
                    </option>
                  </select>
                </div>
                <div className="">
                  <p className="edit-input-title">Expiracion de Contrato</p>
                  <Input
                    // id="titleinput"
                    // value={date}
                    onChange={handlerInputChange}
                    name="contractexpiration"
                    type="date"
                    classInput="edit-input"
                    value={formData.contractexpiration}
                  />
                </div>
              </div>
            </div>

            <div className="edit-btn-cont">
              <div className="edit-btns">
                <button
                  onClick={updateHandlerForm}
                  className="btn-done"
                  name="btn-done"
                  type="submit"
                >
                  Actualizar
                </button>
                <button
                  onClick={clearFormData}
                  className="btn-clear"
                  name="btn-clear"
                  type="submit"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="edit-header-container">
        <div className="edit-header-title">EDITAR PERFIL</div>
      </div>
    </>
  );
}

export default EmployeeEditForm;
