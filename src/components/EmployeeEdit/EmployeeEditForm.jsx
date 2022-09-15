import React from "react";
// import Input from "../../common/components/Input/Input";
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
  validateId,
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
              {profile.photo ? (
                <img
                  className="boton-standar-rw"
                  src={photo ? photo : profile.photo}
                  alt="..."
                />
              ) : (
                <img
                  className="boton-standar-rw"
                  src={photo ? photo : Images.noImg}
                  alt="..."
                />
              )}

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
                <input
                  onChange={handlerInputChange}
                  name="firstname"
                  type="text"
                  placeholder={
                    profile?.firstName ? profile?.firstName : "No definido!"
                  }
                  className="edit-input"
                  value={formData.firstname?.replace(/[^a-zA-ZñÑ ]/g, "") || ""}
                />
              </div>

              <div className="">
                <p className="edit-input-title">Apellido</p>
                <input
                  onChange={handlerInputChange}
                  name="lastname"
                  type="text"
                  placeholder={
                    profile?.lastName ? profile?.lastName : "No definido!"
                  }
                  className="edit-input"
                  value={formData.lastName?.replace(/[^a-zA-ZñÑ ]/g, "") || ""}
                />
              </div>

              <div className="">
                <p className="edit-input-title">Cédula</p>
                <div className="new-employee-documentid">
                  <input
                    onChange={handlerInputChange}
                    name="documentid"
                    type="text"
                    placeholder={
                      profile?.documentId ? profile?.documentId : "No definido!"
                    }
                    className="edit-input"
                    value={formData.documentid?.replace(/[^0-9.]/g, "") || ""}
                    maxLength={11}
                  />
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
                  onChange={handlerInputChange}
                  name="cel"
                  type="text"
                  placeholder={
                    profile?.celNumber ? profile?.celNumber : "No definido!"
                  }
                  className="edit-input"
                  value={formData.cel?.replace(/[^0-9.]/g, "") || ""}
                  maxLength={10}
                />
              </div>
              <div className="">
                <p className="edit-input-title">Fecha de Nacimiento</p>
                <input
                  // value={date}
                  name="date"
                  type="date"
                  onChange={handlerInputChange}
                  className="edit-input"
                  value={
                    formData.date ? formData.date : profile.birthdayDate || ""
                  }
                />
              </div>
              <div className="">
                <p className="edit-input-title">Tipo de Sangre</p>
                {/* <input
                  onChange={handlerInputChange}
                  name="blood"
                  type="text"
                  placeholder={
                    profile?.bloodType ? profile?.bloodType : "No definido!"
                  }
                  className="edit-input"
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
                    {profile?.bloodType ? profile?.bloodType : "No definido!"}
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
                <p className="edit-input-title">
                  Nombre Contacto de Emergencia
                </p>
                <input
                  onChange={handlerInputChange}
                  name="emergencyname"
                  type="text"
                  placeholder={
                    profile?.emergencyName
                      ? profile?.emergencyName
                      : "No definido!"
                  }
                  className="edit-input"
                  value={
                    formData.emergencyname?.replace(/[^a-zA-ZñÑ ]/g, "") || ""
                  }
                />
              </div>
              <div className="">
                <p className="edit-input-title">
                  Numero Contacto de Emergencia
                </p>
                <input
                  onChange={handlerInputChange}
                  name="emergencynumber"
                  type="text"
                  placeholder={
                    profile?.emergencyNumber
                      ? profile?.emergencyNumber
                      : "No definido!"
                  }
                  className="edit-input"
                  value={
                    formData.emergencynumber?.replace(/[^0-9.]/g, "") || ""
                  }
                  maxLength={10}
                />
              </div>
              <div className="">
                <p className="edit-input-title">
                  Relacion Contacto de Emergencia
                </p>
                <input
                  onChange={handlerInputChange}
                  name="emergencyrelationship"
                  type="text"
                  placeholder={
                    profile?.emergencyRelationship
                      ? profile?.emergencyRelationship
                      : "No definido!"
                  }
                  className="edit-input"
                  value={
                    formData.emergencyrelationship?.replace(
                      /[^a-zA-ZñÑ ]/g,
                      ""
                    ) || ""
                  }
                />
              </div>
              <div className="">
                <p className="edit-input-title">Carrera</p>
                <input
                  onChange={handlerInputChange}
                  name="career"
                  type="text"
                  placeholder={
                    profile?.career ? profile?.career : "No definido!"
                  }
                  className="edit-input"
                  value={formData.career?.replace(/[^a-zA-ZñÑ ]/g, "") || ""}
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
                  <input
                    // disabled
                    onChange={handlerInputChange}
                    name="code"
                    type="text"
                    placeholder={
                      profile?.employeeCode
                        ? profile?.employeeCode
                        : "No definido!"
                    }
                    className="edit-input"
                    value={formData.code || ""}
                  />
                </div>
                <div className="">
                  <p className="edit-input-title">Posición</p>
                  <input
                    onChange={handlerInputChange}
                    name="position"
                    type="text"
                    placeholder={
                      profile?.position ? profile?.position : "No definido!"
                    }
                    className="edit-input"
                    value={
                      formData.position?.replace(/[^a-zA-ZñÑ ]/g, "") || ""
                    }
                  />
                </div>

                <div className="">
                  <p className="edit-input-title">Departamento</p>
                  <select
                    // defaultValue="Seleccionar una Departamento"
                    name="departament"
                    className="edit-input"
                    onChange={handlerdDepartament}
                    // value={profile?.departament}
                    defaultValue={"DEFAULT"}
                  >
                    <option
                      disabled
                      value="DEFAULT"
                      // defaultValue={true}
                      // disabled
                      // selected
                    >
                      {profile.Departament?.name
                        ? profile.Departament?.name
                        : "Seleccionar una Departamento"}
                    </option>
                    {departaments
                      ? departaments.map((item, index) => {
                          return (
                            <option
                              id={item.departamentId}
                              key={index}
                              value={item.name || ""}
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
                    name="reportto"
                    className="edit-input"
                    onChange={handlerdReportTo}
                    defaultValue={"DEFAULT"}
                  >
                    <option disabled value="DEFAULT">
                      {profile?.reportname
                        ? profile?.reportname
                        : "Seleccionar un Empleado"}
                    </option>
                    {reportsTo
                      ? reportsTo.map((item, index) => {
                          return item.isActive ? (
                            <option
                              id={item.personId}
                              key={index}
                              value={item.fullName || ""}
                            >
                              {item.fullName || ""}
                            </option>
                          ) : null;
                        })
                      : null}
                  </select>
                </div>
                <div className="">
                  <p className="edit-input-title">Inicio Laboral</p>
                  <input
                    onChange={handlerInputChange}
                    name="startedon"
                    type="date"
                    placeholder="Por favor escriba la fecha que empezo a Laboral"
                    className="edit-input"
                    value={
                      formData.startedon
                        ? formData.startedon
                        : profile.startedOn || ""
                    }
                  />
                </div>
                <div className="">
                  <p className="edit-input-title">Extensión</p>
                  <input
                    onChange={handlerInputChange}
                    name="phone"
                    type="text"
                    placeholder={
                      profile?.phoneNumber
                        ? profile?.phoneNumber
                        : "No definido!"
                    }
                    className="edit-input"
                    value={formData.phone?.replace(/[^0-9.]/g, "") || ""}
                  />
                </div>

                <div className="">
                  <p className="edit-input-title">Email</p>
                  <input
                    onChange={handlerInputChange}
                    name="email"
                    type="email"
                    placeholder={
                      profile?.email ? profile?.email : "No definido!"
                    }
                    className="edit-input"
                    value={formData.email.toUpperCase() || ""}
                  />
                </div>
                <div className="">
                  <p className="edit-input-title">Seguro Medico</p>
                  <input
                    onChange={handlerInputChange}
                    name="health"
                    type="text"
                    placeholder={
                      profile?.healthInsurance
                        ? profile?.healthInsurance
                        : "No definido!"
                    }
                    className="edit-input"
                    value={formData.health?.replace(/[^0-9.]/g, "") || ""}
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
                    defaultValue={"DEFAULT"}
                  >
                    <option disabled value="DEFAULT">
                      {profile?.contractType
                        ? profile?.contractType
                        : " Seleccionar el tipo de Contrato"}
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
                  <input
                    // value={date}
                    onChange={handlerInputChange}
                    name="contractexpiration"
                    type="date"
                    className="edit-input"
                    value={
                      formData.contractexpiration
                        ? formData.contractexpiration
                        : profile.contractExpiration || ""
                    }
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
