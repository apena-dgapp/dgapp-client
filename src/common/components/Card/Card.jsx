import React,{useState} from 'react';

const CardForm = (props) => {

  const [idPost, setIdPost] = useState('');

  const click = () => {
    setIdPost(...idPost, document.getElementById('postid').innerHTML) 
    console.log(idPost)
  }
    



  return (
    <>
      <div className="card">
        <img src={props.img} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <p id='postid' className='m-0 p-0'>{props.klk}</p>
          <button onClick={click} className="btn btn-dark">Read More</button>
        </div>
      </div>
    </>
  )
}

export default CardForm