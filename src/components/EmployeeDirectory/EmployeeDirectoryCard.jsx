import React, { useContext } from "react";
import Images from "../../common/images/index";
import { MdEmail, MdPhoneInTalk, MdCircle, MdSmartphone } from "react-icons/md";
import GlobalContext from "../../context/GlobalContext";
const CardForm = (props) => {
  const [contextState] = useContext(GlobalContext);

  return (
    <>
      <div className="emDirectory-card">
        <div className="emDirectory-card-cont">
          {contextState.isAdmin === true ? (
            props.isActive ? (
              <div className="d-flex">
                <p style={{ fontWeight: "bold", color: "green" }}>Activo</p>
                <i className="md md-phone-in-talk" />
                <MdCircle
                  style={{ marginTop: "0.3rem" }}
                  size="1rem"
                  color="green"
                />
              </div>
            ) : (
              <div className="d-flex">
                <p style={{ fontWeight: "bold", color: "red" }}>Desactivado</p>
                <i className="md md-phone-in-talk" />
                <MdCircle
                  style={{ marginTop: "0.3rem" }}
                  size="1rem"
                  color="red"
                />
              </div>
            )
          ) : null}

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
                color="#3FA796"
              />
              {props.phone ? props.phone : "No definido!"}
            </p>
          </div>
          <div className="mb-2">
            <p className="emDirectory-card-text-contact">
              <i className="md md-smart-phone" />
              <MdSmartphone
                style={{ marginRight: "0.5rem" }}
                size="1.5em"
                color="#3FA796"
              />
              {props.cel ? props.cel : "No definido!"}
            </p>
          </div>
          <div className="mb-2">
            <p className="emDirectory-card-text-contact">
              <i className="md md-Email" />
              <MdEmail
                style={{ marginRight: "0.5rem" }}
                size="1.5em"
                color="#3FA796"
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
