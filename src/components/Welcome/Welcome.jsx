import React from "react";
import Portal from "../../utils/Portal";

const Welcome = ({
  children,
  modalActive,
  formData,
  modalToggleCancel,
  modalToggleAceppt,
  modalInputChange
}) => {

  return (
    <Portal>
      {modalActive && (
        <div className="welcome-wrapper">
          <div className="welcome-window">
            <p className="welcome-modal-title">Bienvenid@</p>

            <div className="welcome-modal-inputcont">
              <div className="welcome-input-title">
                <p>Nueva Contraseña</p>
              </div>
              <input
                className="welcome-modal-input"
                name="password"
                type="password"
                placeholder="Escribir una nueva contraseña"
                required
                onChange={modalInputChange}
                value={formData.password}
              />
            </div>
            <div className="welcome-modal-inputcont">
              <div className="welcome-input-title">
                <p>Confirmar</p>
              </div>
              <input
                className="welcome-modal-input"
                name="confirm"
                type="password"
                placeholder="por favor confirma la nueva contraseña"
                required
                onChange={modalInputChange}
                value={formData.confirm}
              />
            </div>

            <div className="d-flex justify-content-evenly mt-4">
              <button
                className="btn-apply-newpost"
                name="btn-Apply"
                type="button"
                onClick={modalToggleAceppt}
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
          <div className="welcome-background"></div>
        </div>
      )}
    </Portal>
  );
};

export default Welcome;