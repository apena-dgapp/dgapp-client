import React from 'react';
// import Images from '../../images';

const Card = (props) => {
  return (
    <>
      <div className="card">
        <img src={props.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <a href="/#" className="btn btn-dark">Read More</a>
        </div>
      </div>
    </>
  )
}

export default Card