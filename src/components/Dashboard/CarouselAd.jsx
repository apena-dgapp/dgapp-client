import React, { useEffect, useState } from "react";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { getDataCarousel } from "../../api/post";
// import { useNavigate } from "react-router-dom";  
// import { viewUpdate } from "../../../api/post";
// import Images from "../../common/images";

const CarouselAd = ({ category }) => {
  // const navigate = useNavigate();
  const [arrayCarousel, setArrayCarousel] = useState([]);

  useEffect(() => {
    let unmounted = false;

    getDataCarousel(category, 3)
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
  }, [category]);

  return (
    arrayCarousel.length ? <AliceCarousel
      // swipeScrollTolerance={5}
      //   autoPlay
      // autoPlayControls
      autoPlayStrategy="none"
      autoPlayInterval={2500}
      animationDuration={2500}
      animationType="slide"
      infinite
      touchTracking={false}
      // disableDotsControls
      disableButtonsControls
    >
      {arrayCarousel?.slice(0).reverse().map((item, index) => {
        return (
          <>
            {
              item.link ? <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: "none" }}
              >
                <div className="carouselad-container">
                  <img key={index} alt="" src={item.image} />
                </div>

              </a> :
                <div
                  key={index}
                  // onClick={() => goToPost(item)}
                  className="carouselad-container"
                >
                  <img alt="" src={item.image} />
                </div>
            }
          </>
        );
      })}
    </AliceCarousel> : null
    // <div className="dashboard-nodata-cont">
    //   <img src={Images.nodata} alt="" />
    //   <p>{`No se encuentran ${category} recientes`}</p>
    // </div>
  );
};

export default CarouselAd;
