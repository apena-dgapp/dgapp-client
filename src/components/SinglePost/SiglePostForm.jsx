import React, { useState } from "react";
import Viewer from "react-viewer";
import Carousel from "react-elastic-carousel";
import ReactPlayer from "react-player";

const SiglePostForm = ({ dataPost, arrayImg }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 },
  ];

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
  const fecha = new Date(dataPost.date);
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
      <div className="singlePostContainer">
        <div className="singlePostTitle">
          {/* <p className="m-0">{dataPost.title}</p> */}
          {/* <figure className='singlePost-img'>
                    <img className='post-title-img' src={Images.blog} alt=''/>
                </figure> */}
          <div className="singlePostTxt">
            <h2 className="">{fechaES}</h2>
            <h1 className="">{dataPost.title}</h1>
            <h2 className="">Por {dataPost.author}</h2>
          </div>
        </div>

        <div className="singlePost-img-cont">
          <img className="singlePost-img" src={dataPost.img} alt="" />

          {/* <div className="postDate">
            <p>{new Date(dataPost.date).toDateString()}</p>
          </div> */}

          <div className="singlePostDescp-container">
            <p
              dangerouslySetInnerHTML={{ __html: dataPost.description }}
              className="singlePostDescp"
            ></p>
            <Carousel breakPoints={breakPoints}>
              {arrayImg.files?.map((item, index) => {
                return (
                  <div key={index.toString()}>
                    <img
                      className="singlePost-galeryImg"
                      src={item.src}
                      alt=""
                      width="300px"
                      onClick={() => {
                        setVisible(true);
                        setActiveIndex(index);
                      }}
                    />
                  </div>
                );
              })}
              <Viewer
                visible={visible}
                images={arrayImg.files}
                onClose={() => {
                  setVisible(false);
                }}
                zoomSpeed={0.2}
                activeIndex={activeIndex}
                downloadable
              />
            </Carousel>
          </div>
        </div>
      </div>
      <div className="singlePostVideo">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=pLBuFxMYkx8"
          controls
        />
      </div>
    </>
  );
};

export default SiglePostForm;
