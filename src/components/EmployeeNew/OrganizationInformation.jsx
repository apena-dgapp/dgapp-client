import React, { useEffect, useRef } from "react";
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
  const count = useRef(1);
  useEffect(() => {
    let unmounted = false;
    validationEmail(email)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          if (res === true) {
            count.current++;
            setEmail(
              formData.firstname.substring(0, count.current).toUpperCase() +
              formData.lastname.split(" ")[0].toUpperCase() +
              "@DGAPP.GOB.DO"
            );
          }
        }
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
            <p className="edit-input-title">Código de empleado</p>
            <input
              // id="titleinput"
              onChange={handlerInputChange}
              name="code"
              type="text"
              placeholder="Escriba el código de empleado"
              className="edit-input"
              value={code}
              disabled={true}
            />
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Posición</p>
            <input
              // id="titleinput"
              onChange={handlerInputChange}
              name="position"
              type="text"
              placeholder="Escriba la posición"
              className="edit-input"
              value={formData.position?.replace(/[^a-zA-ZÀ-ÿ-ZñÑ ]/g, "")}
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
              // value={"Escriba el departamento"}
              defaultValue={"DEFAULT"}
            >
              <option disabled value="DEFAULT">
                Seleccionar un departamento
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
            <p className="edit-input-title">Reporta a</p>
            <select
              // defaultValue="Seleccionar un Empleado"
              name="reportto"
              className="edit-input"
              onChange={handlerdReportTo}
              //   value={person?.fullName}
              defaultValue={"DEFAULT"}
            >
              <option disabled value="DEFAULT">
                Seleccionar un empleado
              </option>
              {person
                ? person.map((item, index) => {
                  return item.isActive ? (
                    <option
                      id={item.personId}
                      key={index}
                      value={item.fullName}
                    >
                      {item.fullName}
                    </option>
                  ) : null;
                })
                : null}
            </select>
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Inicio laboral</p>
            <input
              // id="titleinput"
              onChange={handlerInputChange}
              name="startedon"
              type="date"
              className="edit-input"
              value={formData.startedon}
            />
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Extensión</p>
            <input
              // id="titleinput"
              onChange={handlerInputChange}
              name="phone"
              type="text"
              placeholder="Número de extensión"
              className="edit-input"
              value={formData.phone?.replace(/[^0-9.]/g, "")}
            />
          </div>

          <div className="">
            <p className="edit-input-title">Email</p>
            <input
              // id="titleinput"
              onChange={handlerInputChange}
              name="email"
              type="email"
              placeholder="Correo Electrónico de la Institución"
              className="edit-input"
              value={email.toUpperCase()}
              disabled={true}
            />
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Seguro médico</p>
            <input
              // id="titleinput"
              onChange={handlerInputChange}
              name="health"
              type="text"
              placeholder="Número del Seguro Medico"
              className="edit-input"
              value={formData.health?.replace(/[^0-9.]/g, "")}
            />
          </div>
          <div className="">
            <p className="edit-input-title">Tipo de contrato</p>
            <select
              // defaultValue="Seleccionar un Empleado"
              name="contracttype"
              className="edit-input"
              onChange={handlerInputChange}
              //   value={person?.fullName}
              defaultValue={"DEFAULT"}
            >
              <option disabled value="DEFAULT">
                Seleccionar el tipo de contrato
              </option>
              <option id="1" value="Contratado">
                Contratado
              </option>
              <option id="2" value="Fijo">
                Fijo
              </option>
            </select>
            <div className="input-required">*</div>
          </div>
          <div className="">
            <p className="edit-input-title">Vencimiento del contrato</p>
            <input
              // id="titleinput"
              onChange={handlerInputChange}
              name="contractexpiration"
              type="date"
              className="edit-input"
              value={formData.contractexpiration}
            />
            {/* <div className="input-required">*</div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default OrganizationInformation;
