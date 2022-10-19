import React from "react";
import { viewUpdate } from "../../../api/post";
import { useHistory } from "react-router-dom";

const CardForm = (props) => {
  const history = useHistory();

  const click = () => {
    viewUpdate(props.id)
      .then((res) => {
        history.push({
          pathname: "./siglepost",
          state: props,
        });
      })
      .catch((err) => {
        console.error(err.status);
        return;
      });
  };

  // Creamos array con los meses del año
  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  // Creamos array con los días de la semana
  const dias_semana = [
    "Domingo",
    "Lunes",
    "martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  // Creamos el objeto fecha instanciándolo con la clase Date
  const fecha = new Date(props.date);
  // Construimos el formato de salida
  const fechaES =
    dias_semana[fecha.getDay()] +
    ", " +
    fecha.getDate() +
    " de " +
    meses[fecha.getMonth()] +
    " de " +
    fecha.getUTCFullYear();

  return (
    <>
      <div className="card" onClick={click}>
        <img
          src={props.img}
          className="card-img-top img-costum-card-featured"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            {props.description.replace(/(<([^>]+)>)/gi, "")}
          </p>
        </div>
        <p className="card-date">
          <small className="text-muted">{fechaES}</small>
        </p>
        <button className="btn-dark">Leer mas</button>
      </div>
    </>
  );
};

export default CardForm;
