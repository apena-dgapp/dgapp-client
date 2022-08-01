import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Images from "../../images/index";

const CarouselComponent = () => {
  return (
    <Carousel
      autoPlay
      interval="5000"
      infiniteLoop
      transitionTime="2000"
      showThumbs={false}
      showStatus={false}
    >
      <div className="carousel-container">
        <img alt="" src={Images.prueba2} />
        <div className="carousel-container-txt">
          <p className="carousel-title">CARRETERA DE SAMANA</p>
          <p className="carousel-inf">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
      <div className="carousel-container">
        <img alt="" src={Images.prueba} />
        <div className="carousel-container-txt">
          <p className="carousel-title">CARRETERA DE SAMANA</p>
          <p className="carousel-inf">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
      <div className="carousel-container">
        <img alt="" src={Images.prueba2} />
        <div className="carousel-container-txt">
          <p className="carousel-title">CARRETERA DE SAMANA</p>
          <p className="carousel-inf">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
