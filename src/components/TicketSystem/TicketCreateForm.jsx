import React from "react";
import ReactTooltip from "react-tooltip";
import { FaUndoAlt } from "react-icons/fa";
import DatePicker  from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TicketCreateForm = ({ priority, setPriority, color, undoPriority,handlerInputChange, formData, addTicket, options,setStartDate, startDate }) => {
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
                onChange={handlerInputChange}
                name="issueName"
                type="text"
                maxLength={45}
                placeholder="Escriba el asunto del problema"
                className="ticket-input"
                value={formData?.issueName || ""}
                //   disabled={true}
              />
              <div className="input-required">*</div>
            </div>
            <div className="">
              <p className="ticket-input-title">Departamento</p>
              <select
                name="departament"
                className="ticket-input"
                value={formData.departament || ""}
                onChange={handlerInputChange}
              >
                <option disabled={true} value="">Departamento que recibira el ticket</option>
                {options?.map(({ value, id }) => {
                  return <option key={id} value={value}>{value}</option>;
                })}
              </select>
              <div className="input-required">*</div>
            </div>
            <div className="">
              <p className="ticket-input-title">Problema Encontrado el</p>
              <DatePicker 
                onChange={(date) => setStartDate(date)}
                disabledKeyboardNavigation
                placeholderText="Seleccionar la fecha en que fue encontrado el problema"
                className="ticket-input"
                selected={startDate}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
              />
              <div className="input-required">*</div>
            </div>
            <div className="">
              <p className="ticket-input-title">Detalles</p>
              <textarea
                onChange={handlerInputChange}
                name="detail"
                type="text"
                placeholder="Escriba un breve detalle del problema"
                className="ticket-textarea"
                maxLength={330}
                value={formData.detail || ""}
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
                <p style={{marginRight:"0.2rem"}}>PRIORIDAD:</p>
                <p>{priority}</p>
                <i className="fa fa-undo-alt" />
                <FaUndoAlt
                  onClick={undoPriority}
                  size="1rem"
                  color={color}
                  style={{ cursor:"pointer", marginLeft: "0.8rem", marginRight: "0.8rem" }}
                />
              </div>
            )}
          </div>
          <div className="createEvent-card-btn-add-cont">
            <button
              onClick={addTicket}
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

export default TicketCreateForm;
