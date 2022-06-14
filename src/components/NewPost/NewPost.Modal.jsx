import React from "react";
import Portal from "../../utils/Portal";

const Modal = ({
  children,
  modalToggle,
  modalActive,
  formData,
  setFormData,
  modalToggleCancel,
}) => {
  const handlerInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Portal>
      {modalActive && (
        <div className="wrapper-newpost">
          <div className="window-newpost">
            <p className="modal-title-newpost">AGREGAR VIDEO</p>

            <div className="modal-inputcont-newpost">
              <input
                className="modal-input-newpost"
                name="video"
                type="text"
                placeholder="https://www.youtube.com/watch?v=ejemplo"
                required
                onChange={handlerInputChange}
                value={formData.video}
              />
            </div>

            <div className="d-flex justify-content-evenly mt-4">
              <button
                className="btn-apply-newpost"
                name="btn-Apply"
                type="button"
                onClick={modalToggle}
              >
                Aplicar
              </button>

              <button
                className="btn-cancel-newpost"
                name="btn-cancel"
                type="button"
                onClick={modalToggleCancel}
              >
                Cancelar
              </button>
            </div>

            <div>{children}</div>
          </div>
          <div className="background-newpost" onClick={modalToggle}></div>
        </div>
      )}
    </Portal>
  );
};

export default Modal;
