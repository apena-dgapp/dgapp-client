import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import Images from "../../common/images/index";
import { MdEmail, MdPhoneInTalk } from "react-icons/md";

const CardForm = (props) => {
  const [contextState] = useContext(GlobalContext);

  const history = useHistory();

  const click = () => {
    //   viewUpdate(contextState.token, props.id)
    //     .then((res) => {
    //       console.log(res.status);
    //       history.push({
    //         pathname: "./siglepost",
    //         state: props,
    //       });
    //     })
    //     .catch((err) => {
    //       console.error(err.status);
    //       return;
    //     });
  };

  return (
    <>
      <div className="emDirectory-card" onClick={click}>
        <div className="emDirectory-card-cont">
          <img
            src={props.img ? props.img : Images.noImg}
            className="emDirectory-card-img"
            alt="..."
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
          <button className="emDirectory-card-btn">Ir al Perfil</button>
        </div>
      </div>
    </>
  );
};

export default CardForm;
