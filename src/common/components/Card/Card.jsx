import React, { useContext } from 'react';
import {viewUpdate} from '../../../api/post';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../../../context/GlobalContext';

const CardForm = (props) => {

  const [contextState] = useContext(GlobalContext);

  const history = useHistory();

  const click = () => {
    viewUpdate(contextState.token, props.id)
    .then(res => {
      console.log(res.status)
      console.log("se agrego un view")
      history.push('./siglepost')
    })
    .catch(err =>{
      console.error(err.status)
      return
    })
  }

  return (
    <>
      <div className="card">
        <img src={props.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
        </div>
        <p className="card-date"><small className="text-muted">{new Date(props.date).toDateString()}</small></p>
        <button onClick={click} className="btn btn-dark">Read More</button>
      </div>
    </>
  )
}

export default CardForm