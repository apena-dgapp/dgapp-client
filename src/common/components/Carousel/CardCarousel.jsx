import React from "react";
import { useHistory } from "react-router-dom";
import Birthday from "../Birthday/Birthday";

const CardCarousel = (props) => {
  const history = useHistory();

  const singleCarousel = () => {
    history.push({
      pathname: "./siglepost",
      state: props,
    });
  };

  return (
    <>
      <div
        onClick={props.index !== 0 ? singleCarousel : null}
        className={`${
          props.index === 0 ? "carousel-item active" : "carousel-item"
        }`}
      >
        <img
          style={props.index !== 0 ? { cursor: "pointer" } : null}
          src={props.img}
          className="d-block w-100"
          alt="..."
        />
        {props.index === 0 ? <Birthday /> : null}
        <div className="carousel-caption d-none d-md-block">
          <h5>{props.title}</h5>
          <div className="p-container">
            {props.index === 0 ? (
              <div className="p-class-birthday">
                <p>{props.description}</p>
              </div>
            ) : (
              <div className="p-class">
                <p>{props.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCarousel;
