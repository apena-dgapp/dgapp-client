import React from "react";
import Portal from "../../../utils/Portal";
import { BiLink } from "react-icons/bi";

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
              <div className="dashboard-section-7-section-instagram-title">
                <p>JSON</p>
                <a
                  href={"https://graph.instagram.com/me/media?fields=id,caption,location,media_type,media_url,permalink,timestamp&access_token=IGQVJVMkdnNVQ1MjJnUlVtNEJjcFVCOVBPTndoTW93dUI4cjdDVnZAiNlFpQVFvYVJUTG1LLXZApVzRoX0JhamdVUDlVaEd3M3NkaGtHZAzFybjNFMnhZAZA2haVEFrWVh4MHVBR2l6T1Nn&limit=1"}
                  target="_blank"
                  rel="noreferrer"
                  // className="dashboard-section-1-news-content"
                  style={{ textDecoration: "none" }}
                >
                  <i className="fa fa-regcomment" />
                  <BiLink
                    className="dashboard-section-7-section-instagram-link"
                    size="1.2rem"
                    style={{ marginLeft: "1rem" }}

                  />
                </a>
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