import React from 'react'
import Carousel from '../../common/components/Carousel/Carousel';
import Card from '../../common/components/Card/Card';

const DashboardForm = ({ arrayPost, interest }) => {

  return (
    <>
      <Carousel />
      <div className='container-column-title'>
        <div className="column-title">
          <p className='column-txt'>FEATURED POST</p>
        </div>
      </div>

      <div className="row col-12 d-flex justify-content-evenly">
        <div className="col-10 d-flex justify-content-evenly mb-5">
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

      <div className="btn-allpost-container">
        <div className='row btn-allpost'>
          <button type="button" className="btn btn-secondary btn-lg">See all the post</button>
        </div>
      </div>

      <div className='container-column-title'>
        <div className="column-title">
          <p className='column-txt'>TOPIC OF INTEREST</p>
        </div>
      </div>

      <div className="d-flex justify-content-center card-xl">
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

      <footer className="bg-dark text-center text-white">
        {/* Grid container */}
        <div className="container p-4 pb-0">
          {/* Section: Social media */}
          <section className="mb-4">
            {/* Facebook */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-facebook-f" /></a>
            {/* Twitter */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-twitter" /></a>
            {/* Google */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-google" /></a>
            {/* Instagram */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-instagram" /></a>
            {/* Linkedin */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-linkedin-in" /></a>
            {/* Github */}
            <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"><i className="fab fa-github" /></a>
          </section>
          {/* Section: Social media */}
        </div>
        {/* Grid container */}
        {/* Copyright */}
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
          © 2022 Copyright:
          <a className="text-white" href="/#">DGAPP</a>
        </div>
        {/* Copyright */}
      </footer>
    </>
  )
}

export default DashboardForm