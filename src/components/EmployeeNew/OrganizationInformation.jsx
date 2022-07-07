import React, { useEffect } from "react";
import Input from "../../common/components/Input/Input";
import { getLastCode, validationEmail } from "../../api/person";

function OrganizationInformation({
  handlerInputChange,
  formData,
  handlerdDepartament,
  handlerdReportTo,
  departaments,
  person,
  setCode,
  code,
  setEmail,
  email,
}) {
  useEffect(() => {
    let unmounted = false;

    validationEmail(email)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res === true) {
          setEmail(
            formData.firstname.substring(0, 2).toUpperCase() +
              formData.lastname.split(" ")[0].toUpperCase() +
              "@DGAPP.GOB.DO"
          );
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    getLastCode()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setCode(Number(res.employeeCode) + 1);
          // console.log(res.employeeCode);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [setCode, formData, email, setEmail]);

  return (
    <>
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
              placeholder="Escriba el codigo de empleado"
              classInput="edit-input"
              value={code}
              disabled={true}
            />
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Posición</p>
            <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="position"
              type="text"
              placeholder="Escriba la posicion"
              classInput="edit-input"
              value={formData.position}
            />
            <div className="input-required">*</div>
          </div>

          <div className="">
            <p className="edit-input-title">Departamento</p>
            <select
              // defaultValue="Seleccionar una Departamento"
              name="departament"
              className="edit-input"
              onChange={handlerdDepartament}
              //   value="Escriba el departamento"
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
            <div className="input-required">*</div>
          </div>

          <div className="">
            <p className="edit-input-title">Se Reporta</p>
            <select
              // defaultValue="Seleccionar un Empleado"
              name="reportto"
              className="edit-input"
              onChange={handlerdReportTo}
              //   value={person?.fullName}
            >
              <option value="" disabled selected>
                Seleccionar un Empleado
              </option>
              {person
                ? person.map((item, index) => {
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
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Extensión</p>
            <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="phone"
              type="text"
              placeholder="Numbero de Extension"
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
              placeholder="Correo Electronico de la Institucion"
              classInput="edit-input"
              value={email.toUpperCase()}
              disabled={true}
            />
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Seguro Medico</p>
            <Input
              // id="titleinput"
              onChange={handlerInputChange}
              name="health"
              type="text"
              placeholder="Numero de Seguro Medico"
              classInput="edit-input"
              value={formData.health}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default OrganizationInformation;
