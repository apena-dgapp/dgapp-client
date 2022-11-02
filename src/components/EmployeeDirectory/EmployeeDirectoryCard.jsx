import React, { useContext, useState, useEffect } from "react";
import Images from "../../common/images/index";
import { MdEmail, MdPhoneInTalk, MdCircle, MdSmartphone } from "react-icons/md";
import GlobalContext from "../../context/GlobalContext";
import { getPhotos } from "../../api/person";

const CardForm = (props) => {
  const [contextState] = useContext(GlobalContext);
  const [photo, setPhoto] = useState([]);

  const id =props.id;

  useEffect(() => {

    let unmounted = false;

    if (!unmounted) {
      getPhotos(id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
          setPhoto(res);
 
      })
      .catch((err) => {
        console.error(err.status);
      });
    }

    return () => {
      unmounted = true;
    };
  }, [id]);

  return (
    <>
      <div className="emDirectory-card">
        <div className="emDirectory-card-cont">
          {contextState.userRole === 1 ? (
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
            src={photo?.photo ? photo?.photo : Images.noImg }
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
                color="#8CB2C4"
              />
              {props.phone ? props.phone : "No definido!"}
            </p>
          </div>
          {
            contextState.userRole === 1 ? <div className="mb-2">
            <p className="emDirectory-card-text-contact">
              <i className="md md-smart-phone" />
              <MdSmartphone
                style={{ marginRight: "0.5rem" }}
                size="1.5em"
                color="#8CB2C4"
              />
              {props.cel ? props.cel : "No definido!"}
            </p>
            </div>:null
          }  
          <div className="mb-2">
            <p className="emDirectory-card-text-contact">
              <i className="md md-Email" />
              <MdEmail
                style={{ marginRight: "0.5rem" }}
                size="1.5em"
                color="#8CB2C4"
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
