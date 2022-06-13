import React from "react";
import Carousel from "../../common/components/Carousel/Carousel";
import Card from "../../common/components/Card/Card";

const DashboardForm = ({ arrayPost, interest, singleInsterest, allPost }) => {
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
  const fecha = new Date(interest.createdAt);
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
      {/* <div className="carousel-Grid-cont">
      <div className="div">
        <Carousel/>
      </div>
      <div className="right-Panel-cont">
        <div className="right-Panel-img">
          <figure>
            <img className='right-Panel-img' src={Images.avatar} alt=''></img>
          </figure>
          <div>
              <p>Bienvenido Mario Gonasalez</p>
          </div>
        </div>
      </div>
    </div> */}
      <Carousel />

      <div className="container-column-title">
        <div className="column-title">
          <p className="column-txt">NOTICIAS MAS RECIENTES</p>
        </div>
      </div>

      <div className="row col-12 d-flex justify-content-evenly">
        <div className="col-10 d-flex justify-content-evenly">
          {arrayPost.map((post) => {
            return (
              <Card
                key={post.postId}
                id={post.postId}
                title={post.title}
                img={post.image}
                description={post.description}
                date={post.createdAt}
                author={post.author}
              />
            );
          })}
        </div>
      </div>

      <div className="btn-allpost-container" onClick={allPost}>
        <div className="btn-allpost-w">
          <div className="row btn-allpost">
            <button type="button" className="btn btn-secondary btn-lg">
              Todas las noticias
            </button>
          </div>
        </div>
      </div>

      <div className="container-column-title">
        <div className="column-title">
          <p className="column-txt">TEMA DE INTERÉS</p>
        </div>
      </div>

      <div
        className="d-flex justify-content-center card-xl"
        onClick={singleInsterest}
      >
        <div className="card card-costum mb-3">
          <img
            src={interest.image}
            id={interest.postId}
            className="card-img-top img-costum"
            alt="..."
          />
          <div className="card-body">
            <h5 className="interest-title">{interest.title}</h5>
            <p className="interest-text">{interest.description}</p>
            <p className="card-text">
              <small className="text-muted">{fechaES}</small>
            </p>
          </div>
        </div>
      </div>

      <div className="container-column-title">
        <div className="column-title">
          <p className="column-txt">CONTACTEMOS</p>
        </div>
      </div>
    </>
  );
};

export default DashboardForm;
