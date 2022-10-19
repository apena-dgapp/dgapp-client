import React, { useEffect, useState } from "react";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { getPost } from "../../../api/post";
import { useHistory } from "react-router-dom";
import { viewUpdate } from "../../../api/post";
import { MdSubtitlesOff } from "react-icons/md";
import Images from "../../images";

const CarouselComponent = () => {
  const history = useHistory();
  const [arrayCarousel, setArrayCarousel] = useState([]);

  useEffect(() => {
    let unmounted = false;

    getPost("Portada Principal", 3)
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
   arrayCarousel.length ? <AliceCarousel
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
          <div
            key={index}
            onClick={() => goToPost(item)}
            className="carousel-container"
          >
            <img alt="" src={item.image} />
            {/* <div className="carousel-container-txt">
              <p className="carousel-title">{item.title}</p>
              <p className="carousel-inf">
                {item.description.replace(/(<([^>]+)>)/gi, "")}
              </p>
            </div> */}
          </div>
        );
      })}
    </AliceCarousel>: 
    <div className="dashboard-nodata-cont">
      <img src={Images.nodata} alt="" />
      <p>No se encuentran portadas</p>
    </div>
  );
};

export default CarouselComponent;
