import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getPost } from "../../../api/post";

const CarouselComponent = () => {
  const [arrayCarousel, setArrayCarousel] = useState([]);

  useEffect(() => {
    let unmounted = false;

    getPost("Portada Principal", 4)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayCarousel(res.posts);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <Carousel
      autoPlay
      interval="5000"
      infiniteLoop
      transitionTime="2000"
      showThumbs={false}
      showStatus={false}
    >
      {arrayCarousel?.map((item, index) => {
        return (
          <div key={index} className="carousel-container">
            <img alt="" src={item.image} />
            <div className="carousel-container-txt">
              <p className="carousel-title">{item.title}</p>
              <p className="carousel-inf">
                {item.description.replace(/(<([^>]+)>)/gi, "")}
              </p>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselComponent;
