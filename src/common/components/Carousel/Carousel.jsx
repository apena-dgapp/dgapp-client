import React,{useContext, useEffect, useState} from 'react';
import GlobalContext from '../../../context/GlobalContext';
import CardCarousel from '../Carousel/CardCarousel';
import { getPost } from '../../../api/post';
import Images from '../../images/index';


const Carousel = ({singleInsterest }) => {
  
  const [contextState] = useContext(GlobalContext);

  const [arrayCarousel, setArrayCarousel] = useState([]);

    useEffect(()=>{

      let unmounted = false;

        getPost(contextState.token,'Main Post')
        .then(res => {
          if (res.status >= 400) throw new alert.err('error usuario incorrecto');
          return res.json();
  
        })
  
        .then(res => {
          if(!unmounted){
                var getArray = res.posts;
                getArray.unshift({
                  author: "Admin",
                  category: "birthday",
                  createdAt: "",
                  createdBy: "",
                  description: "Estos son los empleados que cumplen en el Marzo",
                  image: Images.cumpleanos,
                  isActive: true,
                  modifiedAt: "",
                  modifiedBy: "",
                  postId: 0,
                  title: "Cumpleanos",
                  views: 0
                })
                console.log(getArray)

            setArrayCarousel(arrayCarousel => [...arrayCarousel, ...res.posts]);
          }
          
        })
        .catch(err => {
            console.error(err.status);
        })

        return () =>{
          unmounted = true
        }
        
    },[contextState.token])

  return (
    <>
      <div className="carousel-container">
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={3} aria-label="Slide 4" />
            </div>

            <div className="carousel-inner">
              {
                arrayCarousel.map((post, index) =>{
                  return(
                  <CardCarousel
                    index={index}
                    key={post.postId}
                    img={post.image}
                    title={post.title}
                    description={post.description}
                    date={post.createdAt}
                  />
                  )
                })
              }
            </div>      

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="visually-hidden">Next</span>
            </button>
          </div>      
        </div>
    </>
       
  )
}

export default Carousel