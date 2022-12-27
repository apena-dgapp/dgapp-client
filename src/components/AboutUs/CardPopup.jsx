import React from "react";
import Portal from "../../utils/Portal";

const CardPopup = ({
  children,
  modalActive,
  x,
  y
}) => {

  return (
    <Portal>
      {modalActive && (
        <div className="card-popup-wrapper">
          <div style={{ top: y - 120, left: x - 615 }} className="card-popup-window">
            <p className="card-popup-modal-title">Bienvenid@</p>



            <div>{children}</div>
          </div>
          <div className="card-popup-background"></div>
        </div>
      )}
    </Portal>
  );
};

export default CardPopup;