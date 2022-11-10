import React, { useState } from "react";
import Viewer from "react-viewer";
import Carousel from "react-elastic-carousel";
import ReactPlayer from "react-player";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";

const SiglePostForm = ({
  dataPost,
  arrayImg,
  video,
  handlerTextareaChange,
  sendComment,
  comment,
  comments,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const history = useHistory();

  const goToPDF = (pdf) => {
    history.push({
      pathname: "./pdf",
      state: pdf,
    });
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

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

  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }

  return (
    <>
      <div className="singlePostContainer">
        <div className="singlePostTitle">
          <div className="singlePostTxt">   
            <p className="new-title">{dataPost.title}</p>
            <p className="new-by">Por {dataPost.author}</p>
            <p className="new-date">{fechaES}</p>
          </div>
        </div>

        <div className="singlePost-img-cont">
          <img className="singlePost-img" src={dataPost.image} alt="" />
          <div className="singlePostDescp-container">
            <p
              // dangerouslySetInnerHTML={{ __html: dataPost.description }}
              dangerouslySetInnerHTML={createMarkup(dataPost.description)}
              className="singlePostDescp"
            ></p>
            {foundImg ? (
              <Carousel breakPoints={breakPoints}>
                {arrayImg.files?.map((item, index) => {
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
          <div className="siglepost-scroll-cont mb-2">
            <div className="siglepost-header-grid">
              <div className="siglepost-grid-1">
                <div className="siglepost-nav-container">
                  <div className="siglepost-nav-txt">Título</div>
                </div>
              </div>
              <div className="siglepost-grid-2">
                <div className="siglepost-nav-container">
                  <div className="siglepost-nav-txt">Tamaño</div>
                </div>
              </div>
              <div className="siglepost-grid-3">
                <div className="siglepost-nav-container">
                  <div className="siglepost-nav-txt">Tipo</div>
                </div>
              </div>
              <div className="siglepost-grid-4">
                <div className="siglepost-nav-container">
                  <div className="siglepost-nav-txt">Descargar Archivo</div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      <div style={{ marginBottom: "8rem" }}>
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
                        <div className="regulations-data-txt">
                          {bytesToSize(file.size)}
                        </div>
                      </div>
                    </div>
                    <div className="regulations-grid-3">
                      <div className="regulations-data-container">
                        <div className="regulations-data-txt">
                          {/* {new Date(file.publicationDate).toDateString()} */}
                          {file.type}
                        </div>
                      </div>
                    </div>
                    <div className="regulations-grid-4">
                      <div className="regulations-data-container">
                        <button
                          id={file.fileId}
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => goToPDF(file.src)}
                        >
                          Descargar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null;
            })
          : null}
        <div className="singlePost-addComent-cont">
          {/* <div className="singlePost-addComent-title">
            <p>COMENTARIO</p>
          </div> */}
          <div className="singlePost-addComent-text">
            <p>Déjanos saber lo que piensas</p>
          </div>
          <div className="singlePost-addComent-textarea-cont">
            <textarea
              onChange={handlerTextareaChange}
              className="singlePost-addComent-textarea"
              maxLength={500}
              placeholder="Escriba un breve comentario... Limite de caracteres 500"
              value={comment}
            />
          </div>
          <button
            onClick={sendComment}
            name="done"
            className="createEvent-card-btn-Finalize"
            type="submit"
          >
            Enviar
          </button>
          {
            comments.comments?.length ? <div className="singlePost-comment-list-cont">
            <div className="singlePost-comment-list-header">
              <p>Comentarios</p>
            </div>
            <div className="singlePost-comment-list-container">
              {
                comments.comments?.map((item,key)=>{
                  return(
                    <div key={key} className="singlePost-comment-list">
                      <div className="singlePost-comment-list-user">
                        <img src={item.Person.photo} alt="" />
                        <p>{item.Person.firstName.split(" ", 1) + " " + item.Person.lastName.split(" ", 1)}</p>
                      </div>
                      <div className="singlePost-comment-lis-text">
                        <p>{item.text}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>:null
          }
         
        </div>
      </div>
    </>
  );
};

export default SiglePostForm;
