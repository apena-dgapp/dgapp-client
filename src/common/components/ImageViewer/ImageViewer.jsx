import React, { useState } from "react";
import Portal from "../../../utils/Portal";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";

const ImageViewer = ({
  children,
  setVisible,
  visible,
  arrayImg,
  galleryName,
  length
}) => {
  const [count, setCount] = useState(0);
  const handlerBtnRight = () => {
    if (count < length) {
      setCount(count + 1);
    }
  }

  const handlerBtnLeft = () => {

    if (count !== 0) {
      setCount(count - 1);
    }
  }

  return (
    <Portal>
      {visible && (
        <div className="imageviewer-wrapper">

          <div className="imageviewer-window">
            <div onClick={handlerBtnLeft}>
              <i className="tfi tfi-arrow-circle-left" />
              <TfiArrowCircleLeft
                size={"2.5rem"}
                cursor={count > 0 ? 'pointer' : null}
                style={{ marginRight: "1rem" }}
                color={count > 0 ? "#75AAD3" : "gray"}
              />
            </div>
            <div>
              <div className="imageviewer-name">
                <p>{galleryName}</p>
              </div>
              <div className="imageviewer-img">
                <img
                  src={arrayImg[count].src}
                  alt="video"
                />
              </div>

              <div className="imageviewer-txt">
                <p>{`${count + 1} de ${length + 1}`} {`${arrayImg[count].caption ? "| " + arrayImg[count].caption : ""}`}</p>
                <a href={arrayImg[count].src} download={arrayImg[count].name}>Descargar</a>

              </div>

            </div>
            <div onClick={handlerBtnRight}>
              <i className="tfi tfi-arrow-circle-right" />
              <TfiArrowCircleRight
                color={count < length ? "#75AAD3" : "gray"}
                cursor={count < length ? 'pointer' : null}
                size={"2.5rem"}
                style={{ marginLeft: "1rem" }}
              />
            </div>
            <div>{children}</div>
          </div>
          <div onClick={() => { setVisible(!visible) }} className="imageviewer-background"></div>
        </div>
      )}
    </Portal>
  );
};

export default ImageViewer;