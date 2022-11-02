import React, { useEffect, useState } from "react";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import { getDataCarousel } from "../../api/post";
// import { useHistory } from "react-router-dom";
// import { viewUpdate } from "../../../api/post";
// import Images from "../../common/images";

const CarouselAd = ({category}) => {
  // const history = useHistory();
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

  // const goToPost = (item) => {
  //   viewUpdate(item.postId)
  //     .then((res) => {
  //       history.push({
  //         pathname: "./contenido",
  //         state: {
  //           id: item.postId,
  //           title: item.title,
  //           img: item.image,
  //           description: item.description,
  //           date: item.createdAt,
  //           author: item.author,
  //         },
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err.status);
  //       return;
  //     });
  // };
  return (
    arrayCarousel.length ?  <AliceCarousel
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
      {arrayCarousel?.map((item, index) => {
        return (
          <div
            key={index}
            // onClick={() => goToPost(item)}
            className="carouselad-container"
          >
            <img alt="" src={item.image} />
          </div>
        );
      })}
    </AliceCarousel>: null
    // <div className="dashboard-nodata-cont">
    //   <img src={Images.nodata} alt="" />
    //   <p>{`No se encuentran ${category} recientes`}</p>
    // </div>
  );
};

export default CarouselAd;
