import React from 'react'
import CarouselAd from "./CarouselAd";
import Images from "../../common/images";

const DashboardSection3 = () => {
  return (
    <>
      <div className="dashboard-section-3-line-cont">
        <div className="dashboard-section-3-line"></div>
      </div>
      <div className="dashboard-section-3-container">
        <div className="dashboard-section-3">
          <div className="dashboard-section-3-figure">
            <div className="dashboard-section-3-header">
              <img
                className='dashboard-section-3-img-educapp'
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
                className='dashboard-section-3-img-photoday'
                src={Images.fotoDelDia}
                alt=""
              />
            </div>
            <div className="dashboard-section-3-box">
              <CarouselAd category="PhotoDay" />
            </div>
          </div>
          <div className="dashboard-section-3-figure">
            <div className="dashboard-section-3-header">
              <img
                className='dashboard-section-3-img-valuemonth'
                src={Images.valorDelMes}
                alt=""
              />
            </div>
            <div className="dashboard-section-3-box">
              <CarouselAd category="ValueMonth" />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default DashboardSection3