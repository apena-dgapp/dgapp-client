import React, { useState } from "react";
import Portal from "../../utils/Portal";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { saveSignature } from "../../api/form"
import toast from "react-hot-toast";
// import { removebg } from "../../utils/imgRemove.js"

const ImageCrop = ({
  children,
  modalActive,
  modalToggle,
  image,
  setImage,
  id,
  table,
  column,
  setSignature,
  uploadImg
}) => {
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState(image);
  const [iscrop, setIsCrop] = useState();
  // const [imgRemoveBg, setImgRemoveBg] = useState();

  // useEffect(() => {
  //   let unmounted = false;

  //   if (!unmounted) {
  //     [image].forEach((imageUrl) => {
  //       const img = new Image();
  //       img.onload = ({ target }) => {
  //         const w = Math.round(target.width);
  //         const h = Math.round(target.height);

  //         const canvas = document.createElement("canvas");
  //         canvas.width = w;
  //         canvas.height = h;
  //         const canvasContext = canvas.getContext("2d");
  //         canvasContext.drawImage(
  //           target,
  //           0,
  //           0,
  //           target.width,
  //           target.height,
  //           0,
  //           0,
  //           w,
  //           h
  //         );

  //         const canvasImageData = canvasContext.getImageData(0, 0, w, h);

  //         for (
  //           let index = 0, dataLength = canvasImageData.data.length;
  //           index < dataLength;
  //           index += 4
  //         ) {
  //           const r = canvasImageData.data[index];
  //           const g = canvasImageData.data[index + 1];
  //           const b = canvasImageData.data[index + 2];
  //           if ([r, g, b].every((item) => item > 230))
  //             canvasImageData.data[index + 3] = 0;
  //         }

  //         target.width = w;
  //         target.height = h;
  //         canvasContext.putImageData(canvasImageData, 0, 0);
  //         // console.log(img);
  //         setImgRemoveBg(img.src)
  //       };
  //       img.crossOrigin = "";
  //       img.src = imageUrl;
  //     });

  //   }

  //   return () => {
  //     unmounted = true;
  //   };
  // }, [image]);

  const getCropData = () => {
    if (!cropData) {
      return toast.error("Antes de continuar debes seleccionar el area y darle click al boton cortar");
    }

    if (typeof cropper !== "undefined") {

      if (column === "signatureApplicant") {
        setSignature(cropData);
      } else {
        saveSignature(id, table, column, cropData)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            // if (res !== 200) {
            //   return toast.error("Error al intentar actualizar el ticket!");
            // } else {
            //   return toast.success("El ticket se actualizó exitosamente!");
            // }
          })
          .catch((err) => {
            console.error(err.status);
          });
      }

      modalToggle();
    }
  };

  const imgCut = () => {
    setCropData(cropper.getCroppedCanvas().toDataURL());
    setIsCrop(true)
  }

  const cancel = () => {
    setCropData("");
    setIsCrop("")
    modalToggle();
  }

  return (
    <Portal>
      {modalActive && (
        <div className="ticket-wrapper">
          <div className="image-crop-modal-window">
            <p className="ticket-modal-title">CORTAR IMAGEN</p>
            <div className="image-crop-modal-btn-cut-container">
              <button onClick={uploadImg} className="image-crop-modal-btn-upload">Cargar</button>
              <button onClick={imgCut} className="image-crop-modal-btn-cut">Cortar</button>
            </div>
            <Cropper
              style={{ height: 300, width: "100%" }}
              zoomTo={0.5}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
              guides={true}
            />
            <div className="image-crop-modal-preview-container">
              <p>Vista previa</p>
              <div className="image-crop-modal-preview-img">
                <img style={{ display: iscrop ? "block" : "none" }} src={cropData} alt="cropped" />
              </div>
            </div>

            <div className="image-crop-modal-button-container">
              <button onClick={getCropData} className="ticket-modal-button">ACEPTAR</button>
              <button onClick={cancel} className="ticket-modal-button-remove">CANCELAR</button>
            </div>
            <div>{children}</div>
          </div>
          <div className="ticket-background"></div>
        </div>
      )}
    </Portal>
  );
};

export default ImageCrop;