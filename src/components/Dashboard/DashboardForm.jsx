import React from 'react'
import Carousel from '../../common/components/Carousel/Carousel';
import Card from '../../common/components/Card/Card';

const DashboardForm = ({ arrayPost, interest,singleInsterest, allPost }) => {

  return (
    <>
    {/* <div className="carousel-Grid-cont">
      <div className="div">
        <Carousel/>
      </div>
      <div className="right-Panel-cont">
        <div className="right-Panel-img">
          <figure>
            <img className='right-Panel-img' src={Images.avatar} alt=''></img>
          </figure>
          <div>
              <p>Bienvenido Mario Gonasalez</p>
          </div>
        </div>
      </div>
    </div> */}
    <Carousel/>
      
      <div className='container-column-title'>
        <div className="column-title">
          <p className='column-txt'>FEATURED POST</p>
        </div>
      </div>

      <div className="row col-12 d-flex justify-content-evenly">
        <div className="col-10 d-flex justify-content-evenly">
          {
            arrayPost.map((post) => {
              return (
                <Card
                  key={post.postId}
                  id={post.postId}
                  title={post.title}
                  img={post.image}
                  description={post.description}
                  date={post.createdAt}
                />
              )
            })
          }
        </div>
      </div>

      <div className="btn-allpost-container" onClick={allPost}>
        <div className='btn-allpost-w'>
          <div className='row btn-allpost'>
            <button type="button" className="btn btn-secondary btn-lg">See all the post</button>
          </div>
        </div>
        
      </div>

      <div className='container-column-title'>
        <div className="column-title">
          <p className='column-txt'>TOPIC OF INTEREST</p>
        </div>
      </div>

      <div className="d-flex justify-content-center card-xl" onClick={singleInsterest}>
        <div className="card card-costum mb-3">
          <img src={interest.image} className="card-img-top img-costum" alt="..." />
          <div className="card-body">
            <h5 className="interest-title">{interest.title}</h5>
            <p className="interest-text">{interest.description}</p>
            <p className="card-text"><small className="text-muted">{new Date(interest.createdAt).toDateString()}</small></p>
          </div>
        </div>
      </div>

      <div className='container-column-title'>
        <div className="column-title">
          <p className='column-txt'>LET'S CONTACT</p>
        </div>
      </div>
    </>
  )
}

export default DashboardForm