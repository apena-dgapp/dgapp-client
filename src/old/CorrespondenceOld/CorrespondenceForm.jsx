import React from "react";
import Input from "../../common/components/Input/Input";
const Klk = () => {
  return (
    <>
      <div className="corresp-card-container">
        <div className="corresp-card">
          <div className="corresp-subtitle-cont">
            <div className="corresp-subtitle">
              <p className="">Información del Paquete</p>
            </div>
          </div>

          <div className="corresp-input-cont">
            <div className="corresp-inputs">
              <div className="">
                <p className="corresp-input-title">Codigo QR</p>
                <Input
                  // id="titleinput"
                  name="qr"
                  type="text"
                  placeholder="Por favor escanear el codigo QR"
                  classInput="corresp-input"
                />
              </div>

              <div className="">
                <p className="corresp-input-title">Tipo</p>
                <Input
                  // id="titleinput"
                  name="type"
                  type="text"
                  placeholder="Seleccionar el tipo de correspondecia"
                  classInput="corresp-input"
                />
              </div>

              <div className="">
                <p className="corresp-input-title">Categoria</p>
                <select name="category" className="corresp-input">
                  <option value="" disabled defaultValue="">
                    Seleccionar una Categoria
                  </option>
                </select>
              </div>

              <div className="">
                <p className="corresp-input-title">Estado</p>
                <select
                  name="category"
                  className="corresp-input"
                  defaultValue=""
                >
                  <option value="" disabled defaultValue="">
                    Seleccionar en que estado esta el paquete
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="corresp-subtitle-cont">
            <div className="corresp-subtitle">
              <p className="">Detalles de la Entrega</p>
            </div>
          </div>

          <div className="corresp-input-cont">
            <div className="corresp-inputs">
              <div className="">
                <p className="corresp-input-title">Primer Nombre</p>
                <Input
                  // id="titleinput"
                  name="firstname"
                  type="text"
                  placeholder="Digite el primer nombre"
                  classInput="corresp-input"
                />
              </div>

              <div className="">
                <p className="corresp-input-title">Segundo Nombre</p>
                <Input
                  // id="titleinput"
                  name="lastname"
                  type="text"
                  placeholder="Digite el segundo nombre"
                  classInput="corresp-input"
                />
              </div>

              <div className="">
                <p className="corresp-input-title">Document Number</p>
                <Input
                  // id="titleinput"
                  name="document"
                  type="text"
                  placeholder="Enter the document number"
                  classInput="corresp-input"
                />
              </div>

              <div className="">
                <p className="corresp-input-title">Phone Number</p>
                <Input
                  // id="titleinput"
                  name="phone"
                  type="text"
                  placeholder="Enter the phone number"
                  classInput="corresp-input"
                />
              </div>
            </div>
          </div>

          <div className="corresp-subtitle-cont">
            <div className="corresp-subtitle">
              <p className="">To and From</p>
            </div>
          </div>

          <div className="corresp-input-cont">
            <div className="corresp-inputs">
              <div className="">
                <p className="corresp-input-title">To</p>
                <Input
                  // id="titleinput"
                  name="to"
                  type="text"
                  placeholder="Select or enter the destination"
                  classInput="corresp-input"
                />
                {/* <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    defaultValue="option1"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Departament
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    defaultValue="option2"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Person
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio3"
                    defaultValue="option3"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio3">
                    Hold
                  </label>
                </div> */}
              </div>

              <div className="">
                <p className="corresp-input-title">To</p>
                <Input
                  // id="titleinput"
                  name="to"
                  type="text"
                  placeholder="Select or enter the destination"
                  classInput="corresp-input"
                />
              </div>
            </div>
          </div>

          <div className="allpost-btn-cont">
            <div className="allpost-btns">
              <button className="btn-done" name="btn-done" type="submit">
                Done
              </button>
              <button className="btn-clear" name="btn-clear" type="submit">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{ marginBottom: "25rem" }}
        className="corresp-header-container"
      >
        <div className="corresp-header-title">RECEIVE CORRESPONDENCE</div>
      </div>
    </>
  );
};

export default Klk;
