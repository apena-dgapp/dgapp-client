import React, { useState } from "react";
import Viewer from "react-viewer";
import Carousel from "react-elastic-carousel";
import ReactPlayer from "react-player";

const SiglePostForm = ({ dataPost, arrayImg, video }) => {
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

  var foundImg = false;
  var foundVideo = false;
  var foundPdf = false;

  if (arrayImg.files) {
    for (var i = 0; i < arrayImg.files.length; i++) {
      if (
        arrayImg.files[i].type === "jpg" ||
        arrayImg.files[i].type === "jpeg" ||
        arrayImg.files[i].type === "jfif" ||
        arrayImg.files[i].type === "png"
      ) {
        foundImg = true;
        break;
      }
    }
    for (var x = 0; x < arrayImg.files.length; x++) {
      if (arrayImg.files[x].type === "URL") {
        foundVideo = true;
        break;
      }
    }
    for (var e = 0; e < arrayImg.files.length; e++) {
      if (arrayImg.files[e].type === "pdf") {
        foundPdf = true;
        break;
      }
    }
  }

  console.log(foundImg);
  console.log(foundVideo);
  console.log(foundPdf);

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
            {foundImg ? (
              <Carousel breakPoints={breakPoints}>
                {arrayImg.files?.map((item, index) => {
                  console.log(item);
                  return item.type === "jpg" ||
                    item.type === "jpeg" ||
                    item.type === "jfif" ||
                    item.type === "png" ? (
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
                  ) : null;
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
            ) : null}
          </div>
        </div>
      </div>
      {foundVideo ? (
        <div className="singlePostVideo">
          <ReactPlayer url={video.src} controls />
        </div>
      ) : null}
      {foundPdf ? (
        <>
          {" "}
          <div className="siglepost-download-title">
            <p className="">ZONA DE DESCARGA</p>
          </div>
          <div className="siglepost-scroll-cont">
            <div className="siglepost-header-grid">
              <div className="siglepost-grid-1">
                <div className="siglepost-nav-container">
                  <div className="siglepost-nav-txt">Titulo</div>
                </div>
              </div>
              <div className="siglepost-grid-2">
                <div className="siglepost-nav-container">
                  <div className="siglepost-nav-txt">Tamaño</div>
                </div>
              </div>
              {/* <div className="siglepost-grid-3">
            <div className="siglepost-nav-container">
              <div className="siglepost-nav-txt">Fecha de Publicación</div>
            </div>
          </div> */}
              <div className="siglepost-grid-4">
                <div className="siglepost-nav-container">
                  <div className="siglepost-nav-txt">Descargar Archivo</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div>
        {arrayImg
          ? arrayImg.files.map((file) => {
              return file.type === "pdf" ? (
                <div key={file.filesId} id={file.filesId}>
                  <div className="regulations-data-grid">
                    <div className="regulations-grid-1">
                      <div className="regulations-data-container">
                        <div className="regulations-data-txt">
                          {file.name.toLowerCase().split(".")[0]}
                        </div>
                      </div>
                    </div>
                    <div className="regulations-grid-2">
                      <div className="regulations-data-container">
                        <div className="regulations-data-txt">{file.size}</div>
                      </div>
                    </div>
                    {/* <div className="regulations-grid-3">
                      <div className="regulations-data-container">
                        <div className="regulations-data-txt">
                          {new Date(file.publicationDate).toDateString()}
                        </div>
                      </div>
                    </div> */}
                    <div className="regulations-grid-4">
                      <div className="regulations-data-container">
                        <div className="">
                          <button
                            id={file.fileId}
                            type="button"
                            className="btn btn-success btn-sm"
                            // onClick={() => goToPDF(file.file)}
                          >
                            Descargar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })
          : null}
      </div>
    </>
  );
};

export default SiglePostForm;
