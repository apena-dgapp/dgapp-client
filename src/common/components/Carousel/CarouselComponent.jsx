import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { getPost } from "../../../api/post";
import { useHistory } from "react-router-dom";
import { viewUpdate } from "../../../api/post";

const CarouselComponent = () => {
  const history = useHistory();
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

  const goToPost = (item) => {
    viewUpdate(item.postId)
      .then((res) => {
        history.push({
          pathname: "./siglepost",
          state: {
            id: item.postId,
            title: item.title,
            img: item.image,
            description: item.description,
            date: item.createdAt,
            author: item.author,
          },
        });
      })
      .catch((err) => {
        console.error(err.status);
        return;
      });
  };
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
          <div
            key={index}
            onClick={() => goToPost(item)}
            className="carousel-container"
          >
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
