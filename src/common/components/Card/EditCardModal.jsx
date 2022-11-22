import React from "react";
import Portal from "../../../utils/Portal";
// import { shortDate } from "../../utils/shortDate";

const EditCardModal = ({
  children,
  modalActive,
  modalToggle,
  data
}) => {

  console.log(data)

  return (
    <Portal>
      {modalActive && (
        <div className="ticket-wrapper">
          <div className="ticket-window">
            <p className="ticket-modal-title">Editar publicación</p>
            <div className="card-edit-img-modal-cont">
              <img className="card-edit-img-modal" src={data.img} alt="" />
            </div>


            <div>{children}</div>
          </div>
          <div className="ticket-background" onClick={modalToggle}></div>
        </div>
      )}
    </Portal>
  );
};

export default EditCardModal;