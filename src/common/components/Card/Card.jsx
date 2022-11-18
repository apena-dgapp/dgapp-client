import React,{useState, useEffect} from "react";
import { viewUpdate } from "../../../api/post";
import { useNavigate } from "react-router-dom";  
import { getImage } from "../../../api/post";
import { shortDate } from "../../../utils/shortDate";

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
        navigate(`/noticia/${props.title.toLowerCase()}`, {state: Object.assign({}, props , image)}); 
      })
      .catch((err) => {
        console.error(err.status);
        return;
      });
  };

  return (
    <>
      <div className="card" onClick={click}>
        <img
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
