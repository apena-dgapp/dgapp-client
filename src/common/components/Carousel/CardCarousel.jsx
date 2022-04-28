import React from 'react';
import { useHistory } from 'react-router-dom';

const CardCarousel = (props) => {

  const history = useHistory();

  const singleCarousel = () => {
    
      history.push({
        pathname: './siglepost',
        state: props
      })
  }
    
  return (
    <>
        <div onClick={singleCarousel} className={`${props.index ===0 ? 'carousel-item active':'carousel-item'}`}>
            <img src={props.img} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
                <h5>{props.title}</h5>
                <div className="p-container">
                  <div className="p-class">
                    <p>{props.description}</p>
                  </div>
                </div>
            </div>
        </div>   
    </>
  )
}

export default CardCarousel