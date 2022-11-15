import React from "react";
import { useNavigate } from "react-router-dom";  

function DownloadForm({ title, arrayFiles }) {
  const navigate = useNavigate();

  console.log(arrayFiles)

    const goToPDF = (pdf) => {
    navigate("/pdf",{
      state: pdf,
    });
  };
  return (
    <>
      <div className="regulations-card-container">
        <div className="regulations-scroll-cont">
          <div className="regulations-header-grid">
            <div className="regulations-grid-1">
              <div className="regulations-nav-container">
                <div className="regulations-nav-txt">Titulo</div>
              </div>
            </div>
            <div className="regulations-grid-2">
              <div className="regulations-nav-container">
                <div className="regulations-nav-txt">Tamaño</div>
              </div>
            </div>
            <div className="regulations-grid-3">
              <div className="regulations-nav-container">
                <div className="regulations-nav-txt">Fecha de Publicación</div>
              </div>
            </div>
            <div className="regulations-grid-4">
              <div className="regulations-nav-container">
                <div className="regulations-nav-txt">Descargar Archivo</div>
              </div>
            </div>
          </div>
        </div>
        <div className="regulations-card">
          {arrayFiles
            ? arrayFiles?.map((file) => {
                return (
                  <div key={file.fileId} id={file.fileId}>
                    <div className="regulations-data-grid">
                      <div className="regulations-grid-1">
                        <div className="regulations-data-container">
                          <div className="regulations-data-txt">
                            {file.name}
                          </div>
                        </div>
                      </div>
                      <div className="regulations-grid-2">
                        <div className="regulations-data-container">
                          <div className="regulations-data-txt">
                            {file.size}
                          </div>
                        </div>
                      </div>
                      <div className="regulations-grid-3">
                        <div className="regulations-data-container">
                          <div className="regulations-data-txt">
                            {new Date(file.publicationDate).toDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="regulations-grid-4">
                        <div className="regulations-data-container">
                          <div className="">
                            <button
                              id={file.fileId}
                              type="button"
                              className="btn btn-success btn-sm"
                              onClick={() => goToPDF(file.file)}
                            >
                              Descargar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div
        style={{ marginBottom: "30rem" }}
        className="regulations-header-container"
      >
        <div className="regulations-header-title">{title}</div>
      </div>
    </>
  );
}

export default DownloadForm;
