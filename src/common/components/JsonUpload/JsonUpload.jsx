import React from "react";
import Portal from "../../../utils/Portal";

const JsonUpload = ({
  children,
  activeJson,
  jsonUploadToggleCancel,
  jsonUploadToggleAceppt,
  jsonUploadInputChange,
  jsonValue
}) => {

  return (
    <Portal>
      {activeJson && (
        <div className="welcome-wrapper">
          <div className="dashboard-section-7-section-window">
            <p className="welcome-modal-title">Subir json de Instagram</p>

            <div className="welcome-modal-inputcont">
              <div className="welcome-input-title">
                <p>JSON</p>
              </div>
              <textarea
                onChange={jsonUploadInputChange}
                className="dashboard-section-7-section-upload-textarea"
                // maxLength={500}
                placeholder="Pegar json"
                value={jsonValue}
              />
            </div>
            <div className="d-flex justify-content-evenly mt-4">
              <button
                className="btn-apply-newpost"
                name="btn-Apply"
                type="button"
                onClick={jsonUploadToggleAceppt}
              >
                Aplicar
              </button>

              <button
                className="btn-cancel-newpost"
                name="btn-cancel"
                type="button"
                onClick={jsonUploadToggleCancel}
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

export default JsonUpload; 