import React, { useContext } from "react";
import Images from "../../common/images/index";
import { MdCircle } from "react-icons/md";
import { BsClockFill } from "react-icons/bs";
import GlobalContext from "../../context/GlobalContext";

const TrainingCard = (props) => {
  const [contextState] = useContext(GlobalContext);

  return (
    <>
      <div className="training-card">
        <div className="training-card-cont">
          <img
            src={props.img ? props.img : Images.noImg}
            className="training-card-img"
            alt="..."
            // onClick={(e) => props.goToProfile(e, props.id)}
          />
          <div className="card-body">
            <p className="emDirectory-card-departament">
              {props.departament ? props.departament : "No definido!"}
            </p>
            <h5 className="emDirectory-card-name">
              {props.name ? props.name : "No definido!"}
            </h5>
            <p className="training-card-position">
              {props.position ? props.position : "No definido!"}
            </p>
          </div>
          <div className="mb-2">
            <p className="training-card-text-contact">
              <i className="bs bs-clock-fill" />
              <BsClockFill
                style={{ marginRight: "0.5rem" }}
                size="1.5em"
                color="darkcyan"
              />
              {props.phone ? props.phone : "No definido!"}
            </p>
          </div>

          <button
            // onClick={(e) => props.goToProfile(e, props.id)}
            className="emDirectory-card-btn"
          >
            Ir al Curso
          </button>
        </div>
      </div>
    </>
  );
};

export default TrainingCard;
