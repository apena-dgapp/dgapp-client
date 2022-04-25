import React from 'react';
import Images from '../../common/images';

const SiglePostForm = () => {
  return (
    <>
        <div className='singlePostContainer'>
            <div className='singlePostTitle'>
                <p className='m-0'>CREATE A NEW POST</p>
                <figure>
                    <img className='post-title-img' src={Images.blog} alt=''/>
                </figure>
            </div>
            
            <div className="singlePost">
                <img className='mainPostImg' src={Images.periodista} alt=''/>

                <div className="postData">
                    <p>1 hour ago</p> 
                </div>

                <p className="singlePostImgDescp">Felicitamos y agradecemos a quienes ejercen
                la comunicación con el compromiso de edificar y fortalecer las bases del
                derecho a la libertad de expresión, por su lucha incansable y su aporte
                a la democracia.
                Felicitamos y agradecemos a quienes ejercen
                la comunicación con el compromiso de edificar y fortalecer las bases del
                derecho a la libertad de expresión, por su lucha incansable y su aporte
                a la democracia.
                Felicitamos y agradecemos a quienes ejercen
                la comunicación con el compromiso de edificar y fortalecer las bases del
                derecho a la libertad de expresión, por su lucha incansable y su aporte
                a la democracia.
                Felicitamos y agradecemos a quienes ejercen
                la comunicación con el compromiso de edificar y fortalecer las bases del
                derecho a la libertad de expresión, por su lucha incansable y su aporte
                a la democracia.Felicitamos y agradecemos a quienes ejercen
                la comunicación con el compromiso de edificar y fortalecer las bases del
                derecho a la libertad de expresión, por su lucha incansable y su aporte
                a la democracia.
                </p>

            </div>
            
           
         </div>


    </>
  )
}

export default SiglePostForm