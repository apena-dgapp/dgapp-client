import React from 'react'
import CarouselAd from "./CarouselAd";
import Images from "../../common/images";

const DashboardSection3 = () => {
  return (
    <>
        <div className="dashboard-section-3-header">
          <div className="dashboard-section-3-title">
            <img
              className="dashboard-section-3-img-ad"
              src={Images.avisos}
              alt=""
            />
          </div>
          <div className="dashboard-section-3-title">
            <img
              className="dashboard-section-3-img-educ"
              src={Images.educ}
              alt=""
            />
          </div>
        </div>
       
        <div className="dashboard-section-3">
          <div className="dashboard-section-3-cont">
            <div className="dashboard-section-3-figure"></div>
            <div className="dashboard-section-3-ad-educ">
              <div className="dashboard-section-3-ad">
              <CarouselAd category="Aviso"/>
              </div>
              <div className="dashboard-section-3-ad">
              <CarouselAd category="EducAPP"/>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default DashboardSection3