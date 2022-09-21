import React from "react";
import ReactTooltip from "react-tooltip";
import { FaUndoAlt } from "react-icons/fa";

const TicketSystemForm = ({ priority, setPriority }) => {
  var color;
  if (priority === "") {
    color = "#000000";
  } else if (priority === "") {
    color = "lightblue";
  } else if (priority === "") {
    color = "yellow";
  } else if (priority === "") {
    color = "red";
  }

  return (
    <>
      {" "}
      <ReactTooltip multiline={true} />
      <div className="ticket-container">
        <div className="ticket-card">
          <div className="ticket-input-cont">
            <div className="">
              <p className="ticket-input-title">Asunto</p>
              <input
                // id="titleinput"
                //   onChange={handlerInputChange}
                name="code"
                type="text"
                placeholder="Escriba el asunto del problema"
                className="ticket-input"
                //   value={code}
                //   disabled={true}
              />
              <div className="input-required">*</div>
            </div>
            <div className="">
              <p className="ticket-input-title">Departamento</p>
              <select
                // defaultValue="Seleccionar un Empleado"
                name="contracttype"
                className="ticket-input"
                //   onChange={handlerInputChange}
                //   value={person?.fullName}
                defaultValue={"DEFAULT"}
              >
                <option disabled value="DEFAULT">
                  Departamento que recibira el ticket
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
              <p className="ticket-input-title">Problema Encontrado en</p>
              <input
                // id="titleinput"
                //   onChange={handlerInputChange}
                name="code"
                type="date"
                // placeholder="Escriba el codigo de empleado"
                className="ticket-input"
                //   value={code}
                //   disabled={true}
              />
              <div className="input-required">*</div>
            </div>
            <div className="">
              <p className="ticket-input-title">Detalles</p>
              <textarea
                // id="titleinput"
                //   onChange={handlerInputChange}
                name="code"
                type="text"
                placeholder="Escriba un breve detalle del problema"
                className="ticket-textarea"
                maxLength={330}
                //   value={code}
                //   disabled={true}
              />
              <div className="input-required">*</div>
            </div>
            {priority === "" ? (
              <div className="ticket-qualify-cont">
                <p className="ticket-input-title">CALIFICAR COMO:</p>
                <div className="ticket-input-color">
                  <p onClick={() => setPriority("Normal")}>Normal</p>
                  <div
                    onClick={() => setPriority("Normal")}
                    style={{ backgroundColor: "lightblue" }}
                    className="ticket-qualify-color"
                  ></div>
                  <p onClick={() => setPriority("Urgente")}>Urgente</p>
                  <div
                    onClick={() => setPriority("Urgente")}
                    style={{ backgroundColor: "yellow" }}
                    className="ticket-qualify-color"
                  ></div>
                  <p
                    onClick={() => setPriority("Inmediata")}
                    data-tip="Por favor no seleccionar esta opccion<br/>
                 si el requerimiento o problema no es muy urgente,<br/> 
                 usar con criterio!"
                  >
                    Inmediata
                  </p>
                  <div
                    onClick={() => setPriority("Inmediata")}
                    data-tip="Por favor no seleccionar esta opccion<br/>
                   si el requerimiento o problema no es muy urgente,<br/> 
                   usar con criterio!"
                    style={{ backgroundColor: "red" }}
                    className="ticket-qualify-color"
                  ></div>
                </div>
              </div>
            ) : (
              <div className="ticket-priority-cont">
                <p>PRIORIDAD:</p>
                <p style={{ color: { color } }}>{priority}</p>
                <i className="fa fa-undo-alt" />
                <FaUndoAlt
                  size="1rem"
                  color="#2B4865"
                  style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                />
              </div>
            )}
          </div>
          <div className="createEvent-card-btn-add-cont">
            <button
              //   onClick={addEvent}
              name="add"
              className="ticket-btn-add"
              type="submit"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
      <div className="ticket-header-container">
        <div className="ticket-header-title">CREAR NUEVO EMPLEADO</div>
      </div>
    </>
  );
};

export default TicketSystemForm;
