import React from "react";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';

const CarouselMain = ({ arrayCarousel }) => {

  return (
    arrayCarousel?.length ? <AliceCarousel
      // swipeScrollTolerance={5}
      autoPlay
      // autoPlayControls
      autoPlayStrategy="none"
      autoPlayInterval={2500}
      animationDuration={2500}
      animationType="fadeout"
      infinite
      touchTracking={false}
      // disableDotsControls
      disableButtonsControls
    >
      {arrayCarousel?.map((item, index) => {
        return (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <div className="carousel-container">
              <img alt="" src={item.image} />
            </div>

          </a>
        );
      })}
    </AliceCarousel> : null
  );
};

export default CarouselMain;
