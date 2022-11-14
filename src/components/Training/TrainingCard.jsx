import React from "react";
import Images from "../../common/images/index";
import { TbEdit } from "react-icons/tb";
import { BsClockFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
// import GlobalContext from "../../context/GlobalContext";

const TrainingCard = (props) => {
  return (
    <>
      <div className="emDirectory-card">
        <div className="emDirectory-card-cont">
          <div className="training-icon-edit">
            <i className="tb tb-Edit" />
            <TbEdit
              style={{ marginRight: "0.5rem" }}
              size="1.5rem"
              color="darkcyan"
            />
             <i className="tb tb-Edit" />
            <TbEdit
              style={{ marginRight: "0.5rem" }}
              size="1.5rem"
              color="darkcyan"
            />
          </div>
          <img
            src={props.img ? props.img : Images.noImg}
            className="training-card-img"
            alt="..."
            onClick={() => props.goToCourse(props.id)}
          />
          <div className="card-body">
            <p className="emDirectory-card-departament">
              {props.madeby ? props.madeby : "No definido!"}
            </p>
            <h5 className="emDirectory-card-name">
              {props.title ? props.title : "No definido!"}
            </h5>
            <p className="training-card-position">
              {props.description ? props.description : "No definido!"}
            </p>
          </div>
          <div className="mb-2">
            <p className="training-card-text-contact">
              <i className="fa fa-users" />
              <FaUsers
                style={{ marginRight: "0.5rem" }}
                size="1.5rem"
                color="darkcyan"
              />
              {props.collaborators ? props.collaborators : "No definido!"}
            </p>
          </div>
          <div className="mb-2">
            <p className="training-card-text-contact">
              <i className="bs bs-clock-fill" />
              <BsClockFill
                style={{ marginRight: "0.5rem" }}
                size="1.5rem"
                color="darkcyan"
              />
              {props.duration ? props.duration : "No definido!"}
            </p>
          </div>
          <button onClick={()=>props.edit(props.id)}>Edit</button>
          <button
            onClick={() => props.goToCourse(props)}
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
