import React from 'react'
import CarouselAd from "./CarouselAd";
import Images from "../../common/images";

const DashboardSection3 = () => {
  return (
    <>
      {/* <div className="dashboard-section-3">
        <div className="dashboard-section-3-cont">
          <div className="dashboard-section-3-figure"></div>
          <div className="dashboard-section-3-ad-educ">

            <div className="dashboard-section-3-ad">
              <div className="dashboard-section-3-title">
                <img
                  className="dashboard-section-3-img-ad"
                  src={Images.avisos}
                  alt=""
                />
              </div>
              <div className="dashboard-section-3-carousel">
                <CarouselAd category="Aviso" />
              </div>
            </div>

            <div className="dashboard-section-3-educ">
              <div className="dashboard-section-3-title">
                <img
                  className="dashboard-section-3-img-educ"
                  src={Images.educ}
                  alt=""
                />
              </div>
              <div className="dashboard-section-3-carousel">
                <CarouselAd category="EducAPP" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="dashboard-section-3-line-cont">
        <div className="dashboard-section-3-line"></div>
      </div>
      <div className="dashboard-section-3-container">
        <div className="dashboard-section-3">
          <div className="dashboard-section-3-figure">
            <div className="dashboard-section-3-header">
              <img
                src={Images.educapp}
                alt=""
              />
            </div>
            <div className="dashboard-section-3-box">
              <CarouselAd category="EducAPP" />

            </div>
          </div>
          <div className="dashboard-section-3-figure">
            <div className="dashboard-section-3-header">
              <img
                src={Images.fotoDelDia}
                alt=""
              />
            </div>
            <div className="dashboard-section-3-box">
              <CarouselAd category="EducAPP" />
            </div>
          </div>
          <div className="dashboard-section-3-figure">
            <div className="dashboard-section-3-header">
              <img
                src={Images.valorDelMes}
                alt=""
              />
            </div>
            <div className="dashboard-section-3-box">
              <CarouselAd category="EducAPP" />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default DashboardSection3