import React from 'react'
import Images  from '../../common/images/index';
import Carousel from '../../common/components/Carousel/Carousel';
import Card from '../../common/components/Card/Card';

const DashboardForm = ({arrayPost}) => {

  return (
    <>
        <Carousel/>
            <div className='container-column-title'>
              <div className="column-title">
                <p className='column-txt'>FEATURED POST</p>
              </div>
            </div>
       
            <div className="row col-12 d-flex justify-content-evenly">
              <div className="col-10 d-flex justify-content-evenly mb-5">
                  {
                    arrayPost.map((post) =>{
                      return(
                       <Card
                        key={post.postId}
                        title={post.title} 
                        klk = {post.postId}
                        img={post.image}
                        description={post.description}
                      />
                      )
                    })
                  }
              </div>
            </div>

              <div className='btn-allpost'>
                    <button type="button" className="btn btn-secondary btn-lg">See all the post</button>
              </div>

            <div className='container-column-title'>
              <div className="column-title">
                <p className='column-txt'>TOPIC OF INTEREST</p>
              </div>
            </div>

            <div className="d-flex justify-content-center card-xl">
              <div className="card card-costum mb-3">
                <img src={Images.batalla} className="card-img-top img-costum" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
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
            <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
              © 2022 Copyright:
              <a className="text-white" href="/#">DGAPP</a>
            </div>
            {/* Copyright */}
          </footer>
    </>
  )
}

export default DashboardForm