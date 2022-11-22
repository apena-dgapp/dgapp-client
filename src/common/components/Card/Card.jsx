import React, { useState, useEffect } from "react";
import { viewUpdate } from "../../../api/post";
import { useNavigate } from "react-router-dom";
import { getImage } from "../../../api/post";
import { shortDate } from "../../../utils/shortDate";
import { FiEdit } from "react-icons/fi";
import { CiSquareRemove } from "react-icons/ci";

const Card = (props) => {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);

  const id = props.id;

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
      <div className="card">
        <div className="card-btn-cont">
          <p onClick={() => props.edit(props.id)} className="">
            <i className="ri ri-edit-box-fill" />
            <FiEdit
              style={{ cursor: "pointer" }}
              size="1.1rem"
              color="#FBB454"
            />
          </p>
          <p onClick={() => { props.disableCourse(props.id) }} className="">
            <i className="md md-delete-forever" />
            <CiSquareRemove
              style={{ cursor: "pointer" }}
              size="1.2rem"
              color="#FB2576"
            />
          </p>
        </div>
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
