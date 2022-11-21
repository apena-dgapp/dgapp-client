import React from "react";
import Portal from "../../utils/Portal";
import { shortDate } from "../../utils/shortDate";

const TicketModal = ({
  children,
  modalActive,
  modalToggle,
  ticket,
  assignTicket,
  removeTicket
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
                  <p className="ticket-modal-details-text"><strong>Encontrado el:&nbsp;</strong>{shortDate(ticket?.issueStart)}</p>
                  <p className="ticket-modal-details-text"><strong>Creado por:&nbsp;</strong>{ticket?.createdBy}</p>
                </div>
                <div className="ticket-modal-details-cont-text">
                  <p className="ticket-modal-details-text"><strong>Creado en:&nbsp;</strong>{shortDate(ticket?.createdAt)}</p>
                  <p className="ticket-modal-details-text"><strong>Asignado:&nbsp;</strong>{ticket?.assigned}</p>
                </div>
                <div className="ticket-modal-details-cont-text">
                  <p className="ticket-modal-details-text"><strong>Estado a:&nbsp;</strong>{ticket?.status}</p>
                  {/* <p className="ticket-modal-details-text"><strong>Asignado: </strong>{ticket?.assigned}</p> */}
                </div>
              </div>
              <div className="ticket-modal-grid-button">
                {ticket?.status === "Cerrado" || ticket?.status === "Eliminado" ? null : <button
                  onClick={() => ticket?.status === "Abierto" ? assignTicket(ticket?.ticketId, ticket?.issueName, ticket?.emailUser) : removeTicket(ticket?.ticketId, "Cerrado", ticket?.issueName, ticket?.emailUser)}
                  className="ticket-modal-button">{ticket?.status === "Abierto" ? "ASIGNARME TICKET" : (ticket?.status === "En Proceso" ? "CERRAR TICKET" : "CERRADO")}
                </button>}

                <button onClick={() => removeTicket(ticket?.ticketId, "Eliminado")} className="ticket-modal-button-remove">ELIMINAR</button>
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