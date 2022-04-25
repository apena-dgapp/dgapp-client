import React from 'react';

const CardCarousel = (props) => {
    
  return (
    <>
        <div className={`${props.index ===0 ? 'carousel-item active':'carousel-item'}`}>
            <img src={props.img} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
                <h5>{props.title}</h5>
                <div className="p-container">
                  <div className="p-class">
                    <p>{props.descrip}</p>
                  </div>
                </div>
            </div>
        </div>   
    </>
  )
}

export default CardCarousel