import React from "react";
import DashboardSection1 from "./DashboardSection1";
import DashboardSection2 from "./DashboardSection2";
import DashboardSection3 from "./DashboardSection3";
import DashboardSection4 from "./DashboardSection4";
import DashboardSection5 from "./DashboardSection5";
import DashboardSection6 from "./DashboardSection6";

const DashboardForm = ({
  news,
  birthday,
  events,
  multimedia,
  goToPost,
  goToProfile,
  employeedirectory,
  allPost,
  multimediaMain,
  arrayCarousel,
  requestMenu,
  inConstruction,
  modalToggle,
  getImagesHandler
}) => {

  return (
    <>
      <div className="dashboard-container">
        {/* carousel y noticias */}
        <DashboardSection1 arrayCarousel={arrayCarousel} news={news} goToPost={goToPost} allPost={allPost} />

        {/* botones */}
        <DashboardSection2 employeedirectory={employeedirectory} requestMenu={requestMenu} inConstruction={inConstruction} />

        {/* avisos y educapp */}
        <DashboardSection3 />

        {/* cumpleanos y calendario */}
        <DashboardSection4 birthday={birthday} events={events} goToProfile={goToProfile} />

        {/* multimedia */}
        <DashboardSection5 multimedia={multimedia} multimediaMain={multimediaMain} goToPost={goToPost} modalToggle={modalToggle} getImagesHandler={getImagesHandler} />

        {/* logo */}
        < DashboardSection6 />

        {/* social */}
        {/* <DashboardSection7/> */}

      </div>
    </>
  );
};

export default DashboardForm;
