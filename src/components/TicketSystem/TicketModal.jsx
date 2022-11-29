import React from "react";
import Portal from "../../utils/Portal";
import { shortDate } from "../../utils/shortDate";
import { GiConfirmed } from "react-icons/gi";

const TicketModal = ({
  children,
  modalActive,
  modalToggle,
  ticket,
  assignTicket,
  removeTicket,
  options,
  optionsPriority,
  optionsAssigned,
  formData,
  handlerInputChange,
  ticketUpdate,
  state
}) => {

  return (
    <Portal>
      {modalActive && (
        <div className="ticket-wrapper">
          <div className="ticket-window">
            <p className="ticket-modal-title">Detalles del ticket</p>

            <div className="ticket-modal-grid">
              <div className="ticket-modal-grid-details">
                <div className="ticket-modal-details-cont-text">
                  <p className="ticket-modal-details-text">
                    <strong>Id:&nbsp;</strong> {ticket?.ticketId}
                  </p>
                  <p className="ticket-modal-details-text"><strong>Tema:&nbsp;</strong>{ticket?.issueName}</p>
                </div>
                <div className="ticket-modal-details-cont-text">
                  {/* <p className="ticket-modal-details-text"><strong>Categoria:&nbsp;</strong>{ticket?.category}</p> */}
                  <p className="ticket-modal-details-text"><strong>Categoria:&nbsp;</strong>
                    <select
                      name="category"
                      value={formData.category || ""}
                      onChange={handlerInputChange}
                      disabled={ticket.status === "Cerrado" || ticket.status === "Eliminado" ? true : false}
                    >
                      <option disabled={true} value="">{ticket?.category}</option>
                      {options?.map(({ value, id }) => {
                        return <option key={id} value={value}>{value}</option>;
                      })}
                    </select>
                    <i className="fa fa-undo-alt" />
                    <GiConfirmed
                      onClick={ticket.status === "Cerrado" || ticket.status === "Eliminado" ? null : () => ticketUpdate(ticket?.ticketId, "category", formData.category)}
                      className={ticket.status === "Cerrado" || ticket.status === "Eliminado" ? "ticket-btn-update-disable" : "ticket-btn-update"}
                      size="1rem"
                      style={{ cursor: "pointer", marginLeft: "0.5rem", marginBottom: "0.2rem" }}
                    />
                  </p>
                  <p className="ticket-modal-details-text"><strong>Creado por:&nbsp;</strong>{ticket?.createdBy}</p>
                </div>
                <div className="ticket-modal-details-cont-text">
                  <p className="ticket-modal-details-text"><strong>Creado:&nbsp;</strong>{shortDate(ticket?.createdAt)}</p>
                  {/* <p className="ticket-modal-details-text"><strong>Asignado:&nbsp;</strong>{ticket?.assigned}</p> */}
                  <p className="ticket-modal-details-text"><strong>Asignado:&nbsp;</strong>
                    <select
                      name="assigned"
                      value={formData.assigned || ""}
                      onChange={handlerInputChange}
                      disabled={ticket.status === "Cerrado" || ticket.status === "Eliminado" ? true : false}
                    >
                      <option disabled={true} value="">{ticket?.assigned ? ticket?.assigned : "No definido"}</option>
                      {optionsAssigned?.map((value, id) => {
                        return <option key={id} value={value?.fullName}>{value.fullName}</option>;
                      })}
                    </select>
                    <i className="fa fa-undo-alt" />
                    <GiConfirmed
                      onClick={ticket.status === "Cerrado" || ticket.status === "Eliminado" ? null : () => assignTicket(ticket?.ticketId, ticket?.issueName, ticket?.emailUser, formData.assigned, ticket?.assigned ? true : false)}
                      className={ticket.status === "Cerrado" || ticket.status === "Eliminado" ? "ticket-btn-update-disable" : "ticket-btn-update"}
                      size="1rem"
                      style={{ cursor: "pointer", marginLeft: "0.5rem", marginBottom: "0.2rem" }}
                    />
                  </p>
                </div>
                <div className="ticket-modal-details-cont-text">
                  <p className="ticket-modal-details-text"><strong>Estado:&nbsp;</strong>{ticket?.status}</p>
                  <p className="ticket-modal-details-text"><strong>Prioridad:&nbsp;</strong>
                    <select
                      name="priority"
                      value={formData.priority || ""}
                      onChange={handlerInputChange}
                      disabled={ticket.status === "Cerrado" || ticket.status === "Eliminado" ? true : false}
                    >
                      <option disabled={true} value="">{ticket?.priority}</option>
                      {optionsPriority?.map(({ value, id }) => {
                        return <option key={id} value={value}>{value}</option>;
                      })}
                    </select>
                    <i className="fa fa-undo-alt" />
                    <GiConfirmed
                      onClick={ticket.status === "Cerrado" || ticket.status === "Eliminado" ? null : () => ticketUpdate(ticket?.ticketId, "priority", formData.priority)}
                      className={ticket.status === "Cerrado" || ticket.status === "Eliminado" ? "ticket-btn-update-disable" : "ticket-btn-update"}
                      size="1rem"
                      style={{ cursor: "pointer", marginLeft: "0.5rem", marginBottom: "0.2rem" }}
                    />
                  </p>
                </div>
              </div>
              <div className="ticket-modal-grid-button">
                {ticket?.status === "Cerrado" || ticket?.status === "Eliminado" ? null : <button
                  onClick={() => ticket?.status === "Abierto" ? assignTicket(ticket?.ticketId, ticket?.issueName, ticket?.emailUser, state?.fullName, false) : removeTicket(ticket?.ticketId, "Cerrado", ticket?.issueName, ticket?.emailUser, ticket?.assigned)}
                  className="ticket-modal-button">{ticket?.status === "Abierto" ? "ASIGNARME TICKET" : (ticket?.status === "En Proceso" ? "CERRAR TICKET" : "CERRADO")}
                </button>}

                {ticket?.status !== "Eliminado" ? <button onClick={() => removeTicket(ticket?.ticketId, "Eliminado", ticket?.issueName, ticket?.emailUser, ticket?.assigned)} className="ticket-modal-button-remove">ELIMINAR</button> : null}
              </div>
            </div>
            <div className="ticket-modal-description">
              <div className="ticket-modal-description-title">
                <p>Detalle</p>
              </div>
              <div className="ticket-modal-description-text">
                <p>{ticket?.detail}</p>
              </div>
            </div>
            <div>{children}</div>
          </div>
          <div className="ticket-background" onClick={modalToggle}></div>
        </div>
      )}
    </Portal>
  );
};

export default TicketModal;