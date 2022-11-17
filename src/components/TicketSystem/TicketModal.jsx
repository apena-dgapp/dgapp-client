import React from "react";
import Portal from "../../utils/Portal";

const TicketModal = ({
    children,
    modalActive,
    modalToggle,
    formData,
    modalToggleCancel,
    modalToggleAceppt,
    modalInputChange,
    ticket
  }) => {

    console.log(ticket)

    return (
      <Portal>
        {modalActive && (
          <div className="ticket-wrapper">
            <div className="ticket-window">
              <p className="ticket-modal-title">Detalles del ticket</p>

                <div className="ticket-modal-grid">
                  <div className="ticket-modal-grid-details">
                    <div className="ticket-modal-details-cont-text">
                      <p className="ticket-modal-details-text"><strong>Id:</strong>{ticket?.ticketId}</p>
                      <p className="ticket-modal-details-text"><strong>Tema:</strong>{ticket?.issueName}</p>
                    </div>
                    <div className="ticket-modal-details-cont-text">
                      <p className="ticket-modal-details-text"><strong>Encontrado el:</strong>{ticket?.issueStart}</p>
                      <p className="ticket-modal-details-text"><strong>Creado por:</strong>{ticket?.createdBy}</p>
                    </div>
                    <div className="ticket-modal-details-cont-text">
                      <p className="ticket-modal-details-text"><strong>Creado en:</strong>{ticket?.createdAt}</p>
                      <p className="ticket-modal-details-text"><strong>Asignado:</strong>{ticket?.assigned}</p>
                    </div>
                    <div className="ticket-modal-details-cont-text">
                      <p className="ticket-modal-details-text"><strong>Estado a:</strong>{ticket?.status}</p>
                      {/* <p className="ticket-modal-details-text"><strong>Asignado: </strong>{ticket?.assigned}</p> */}
                    </div>
                  </div>
                  <div className="ticket-modal-grid-button">
                    <button className="ticket-modal-button">{ticket?.status === "Abierto" ? "ASIGNARME TICKET":(ticket?.status === "En Proceso" ? "CERRAR TICKET":"CERRADO")}</button>
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