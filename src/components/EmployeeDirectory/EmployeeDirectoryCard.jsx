import React from "react";
import Images from "../../common/images/index";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";

const CardForm = (props) => {
  return (
    <>
      <div className="emDirectory-card">
        <div className="emDirectory-card-cont">
          <img
            src={props.img ? props.img : Images.noImg}
            className="emDirectory-card-img"
            alt="..."
            onClick={(e) => props.goToProfile(e, props.id)}
          />
          <div className="card-body">
            <p className="emDirectory-card-departament">
              {props.departament ? props.departament : "No definido!"}
            </p>
            <h5 className="emDirectory-card-name">
              {props.name ? props.name : "No definido!"}
            </h5>
            <p className="emDirectory-card-position">
              {props.position ? props.position : "No definido!"}
            </p>
          </div>
          <div className="mb-2">
            <p className="emDirectory-card-text-contact">
              <i className="md md-phone-in-talk" />
              <MdPhoneInTalk
                style={{ marginRight: "0.5rem" }}
                size="1.5em"
                color="darkcyan"
              />
              {props.phone ? props.phone : "No definido!"}
            </p>
          </div>
          <div className="mb-2">
            <p className="emDirectory-card-text-contact">
              <i className="md md-Email" />
              <MdEmail
                style={{ marginRight: "0.5rem" }}
                size="1.5em"
                color="darkcyan"
              />
              {props.email ? props.email : "No definido!"}
            </p>
          </div>
          <button
            onClick={(e) => props.goToProfile(e, props.id)}
            className="emDirectory-card-btn"
          >
            Ir al Perfil
          </button>
        </div>
      </div>
    </>
  );
};

export default CardForm;
