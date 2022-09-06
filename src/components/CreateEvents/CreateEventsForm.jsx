import React, { useEffect } from "react";
import { MdLocationPin } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const CreateEventsForm = ({
  handlerInputChange,
  addEvent,
  eventsArray,
  sendEvent,
  formData,
  eventRemove,
}) => {
  return (
    <>
      <div className="createEvent-title-cont">
        <div className="createEvent-title">CREAR EVENTOS</div>
      </div>

      <div className="createEvent-Container">
        <div className="createEvent-card-container">
          <div className="createEvent-card">
            <div className="createEvent-card-grid-cont">
              <div className="createEvent-card-grid">
                <div className="createEvent-card-grid-add">
                  <div className="createEvent-card-grid-add-header">
                    <p>Agregar Evento</p>
                  </div>
                  <div className="createEvent-card-add-form">
                    <div className="">
                      <p className="createEvent-card-add-input-title">Nombre</p>

                      <input
                        // id="titleinput"
                        onChange={handlerInputChange}
                        name="name"
                        type="text"
                        placeholder="Escriba nombre de evento"
                        className="createEvent-card-add-input"
                        value={formData.name}
                        // disabled={true}
                      />
                    </div>
                    <div className="">
                      <p className="createEvent-card-add-input-title">Salon</p>
                      <select
                        // defaultValue="Seleccionar una Departamento"
                        name="room"
                        className="createEvent-card-add-input"
                        onChange={handlerInputChange}
                        value={formData.room}
                      >
                        <option value="" disabled selected>
                          Seleccionar un salon
                        </option>
                        <option id="1">Conferencias Dirección Ejecutiva</option>
                        <option id="2">Conferencias Piso 2</option>
                        <option id="3">Conferencias Piso 3</option>
                        <option id="4">Multiuso Piso 1</option>
                      </select>
                    </div>
                  </div>
                  <div className="createEvent-card-add-form">
                    <div className="">
                      <p className="createEvent-card-add-input-title">Desde</p>
                      <input
                        // id="titleinput"
                        onChange={handlerInputChange}
                        name="from"
                        type="date"
                        placeholder="Escriba nombre de evento"
                        className="createEvent-card-add-input"
                        multiple
                        value={formData.from}
                        // disabled={true}
                      />
                    </div>
                    <div className="">
                      <p className="createEvent-card-add-input-title">
                        Hasta <span>(Opcional)</span>{" "}
                      </p>
                      <input
                        // id="titleinput"
                        onChange={handlerInputChange}
                        name="to"
                        type="date"
                        placeholder="Escriba nombre de evento"
                        className="createEvent-card-add-input"
                        multiple
                        value={formData.to}
                        // disabled={true}
                      />
                    </div>
                  </div>
                  <div className="createEvent-card-add-form">
                    <div className="">
                      <p className="createEvent-card-add-input-title">
                        Hora Inicial
                      </p>
                      <input
                        // id="titleinput"
                        onChange={handlerInputChange}
                        name="startTime"
                        type="time"
                        placeholder="Escriba nombre de evento"
                        className="createEvent-card-add-input"
                        multiple
                        value={formData.startTime}
                        // disabled={true}
                      />
                    </div>
                    <div className="">
                      <p className="createEvent-card-add-input-title">
                        Hora Final
                      </p>
                      <input
                        // id="titleinput"
                        onChange={handlerInputChange}
                        name="endingTime"
                        type="time"
                        placeholder="Escriba nombre de evento"
                        className="createEvent-card-add-input"
                        multiple
                        value={formData.endingTime}
                        // disabled={true}
                      />
                    </div>
                  </div>
                  <div className="createEvent-card-add-form">
                    <div className="">
                      <p className="createEvent-card-add-input-title">
                        Descripcion
                      </p>

                      <textarea
                        // id="titleinput"
                        onChange={handlerInputChange}
                        name="description"
                        type="text"
                        placeholder="Escriba una breve descripcion del evento (Opcional)"
                        className="createEvent-card-add-area"
                        maxLength={450}
                        value={formData.description}
                        // disabled={true}
                      ></textarea>
                    </div>
                  </div>
                  <div className="createEvent-card-color-cont">
                    <div className="createEvent-card-input-color">
                      <input
                        onClick={handlerInputChange}
                        name="color"
                        style={{ backgroundColor: "#21E1E1" }}
                        value="#21E1E1"
                      />
                      <input
                        onClick={handlerInputChange}
                        name="color"
                        style={{ backgroundColor: "#B93160" }}
                        value="#B93160"
                      />
                      <input
                        onClick={handlerInputChange}
                        name="color"
                        style={{ backgroundColor: "#59CE8F" }}
                        value="#59CE8F"
                      />
                      <input
                        onClick={handlerInputChange}
                        name="color"
                        style={{ backgroundColor: "#EAE509" }}
                        value="#EAE509"
                      />
                      <input
                        onClick={handlerInputChange}
                        name="color"
                        style={{ backgroundColor: "#7F5283" }}
                        value="#7F5283"
                      />
                      <input
                        onClick={handlerInputChange}
                        name="color"
                        style={{ backgroundColor: "#FEB139" }}
                        value="#FEB139"
                      />
                    </div>
                  </div>
                  <div className="createEvent-card-btn-add-cont">
                    <button
                      onClick={addEvent}
                      name="add"
                      className="createEvent-card-btn-add"
                      type="submit"
                    >
                      Agregar
                    </button>
                  </div>
                </div>

                <div className="createEvent-card-grid-separator"></div>
                <div className="createEvent-card-grid-list">
                  {" "}
                  <div className="createEvent-card-grid-list-header">
                    <p>Lista de Eventos</p>
                  </div>
                  <div className="createEvent-card-grid-container">
                    {eventsArray?.map((item, key) => {
                      return (
                        <div
                          key={key}
                          className="createEvent-card-grid-list-grid-cont"
                        >
                          <div className="createEvent-card-grid-list-grid">
                            <div
                              style={{ backgroundColor: item.color }}
                              className="createEvent-card-grid-list-grid-num"
                            >
                              <p>{key + 1}</p>
                            </div>
                            <div className="createEvent-card-grid-list-grid-inf">
                              <p className="createEvent-card-grid-list-grid-inf-name">
                                {item.name}
                              </p>

                              <p>
                                {" "}
                                <i className="md md-location-pin" />
                                <MdLocationPin
                                  size="1.1rem"
                                  color="#525E75"
                                  style={{
                                    marginLeft: "0.1rem",
                                    marginRight: "0.5rem",
                                  }}
                                />
                                {item.room}
                              </p>

                              <p>
                                <i className="fa fa-clock" />
                                <FaClock
                                  size="0.8rem"
                                  color="#525E75"
                                  style={{
                                    marginLeft: "0.3rem",
                                    marginRight: "0.5rem",
                                  }}
                                />
                                <span>Fecha:</span> {item.from} -{" "}
                                {item.to ? item.to : item.from}{" "}
                                <span>Hora:</span> {item.startTime} -{" "}
                                {item.endingTime}
                              </p>
                            </div>
                            <div className="createEvent-card-grid-list-grid-btn-delete">
                              <i className="ti ti-delete" />
                              <TiDelete
                                id={key}
                                onClick={() => eventRemove(key)}
                                size="2rem"
                                color="#FF0063"
                                style={{
                                  marginLeft: "0.3rem",
                                  marginRight: "0.5rem",
                                  cursor: "pointer",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="createEvent-card-btn-add-cont">
                    <button
                      onClick={sendEvent}
                      name="done"
                      className="createEvent-card-btn-Finalize"
                      type="submit"
                    >
                      Finalizar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateEventsForm;
