import React, { useState, useEffect, useContext } from "react";
import { viewUpdate } from "../../../api/post";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../../api/post";
import { shortDate } from "../../../utils/shortDate";
import { FiEdit } from "react-icons/fi";
import { CiSquareRemove } from "react-icons/ci";
import GlobalContext from "../../../context/GlobalContext";
import EditCardModal from "./EditCardModal";

const Card = (props) => {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [data, setData] = useState("");
  const [contextState] = useContext(GlobalContext);
  const [modalActive, setModalActive] = useState(false);

  const id = props.id;

  const modalToggle = (item, img) => {
    const state = Object.assign({ item }, { img });
    setData(state)
    setModalActive(!modalActive);
  };

  useEffect(() => {

    let unmounted = false;

    if (!unmounted) {
      getImage(id)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setImage(res);
        })
        .catch((err) => {
          console.error(err.status);
        });
    }

    return () => {
      unmounted = true;
    };
  }, [id]);

  const click = () => {
    viewUpdate(props.id)
      .then((res) => {
        navigate(`/noticia/${props.title.toLowerCase()}`, { state: Object.assign({}, props, image) });
      })
      .catch((err) => {
        console.error(err.status);
        return;
      });
  };

  return (
    <>
      <EditCardModal
        modalToggle={modalToggle}
        modalActive={modalActive}
        data={data}
      />
      <div className="card">
        {contextState.userRole === 1 ? <div className="card-btn-cont">
          <p onClick={() => modalToggle(props, image?.image)} className="">
            <i className="fi fi-edit" />
            <FiEdit
              style={{ cursor: "pointer" }}
              size="1.1rem"
              color="#FBB454"
            />
          </p>
          <p onClick={() => { props.disableCourse(props.id) }} className="">
            <i className="ci ci-square-remove" />
            <CiSquareRemove
              style={{ cursor: "pointer" }}
              size="1.2rem"
              color="#FB2576"
            />
          </p>
        </div> : null}

        <img
          onClick={click}
          src={image?.image}
          className="card-img-top img-costum-card-featured"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            {props.description.replace(/(<([^>]+)>)/gi, "")}
          </p>
        </div>
        <p className="card-date">
          <small className="text-muted">{shortDate(props.date)}</small>
        </p>
        <button className="btn-dark">Leer más</button>
      </div>
    </>
  );
};

export default Card;
