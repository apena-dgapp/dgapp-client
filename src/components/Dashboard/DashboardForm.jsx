import React from "react";
import DashboardSection1 from "./DashboardSection1";
import DashboardSection2 from "./DashboardSection2";
import DashboardSection3 from "./DashboardSection3";
import DashboardSection4 from "./DashboardSection4";
import DashboardSection5 from "./DashboardSection5";
import DashboardSection6 from "./DashboardSection6";
import DashboardSection7 from "./DashboardSection7";
import DashboardSection8 from "./DashboardSection8";

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
  getImagesHandler,
  notices,
  tweets
}) => {

  return (
    <>
      <div className="dashboard-container">
        {/* carousel y noticias */}
        <DashboardSection1 arrayCarousel={arrayCarousel} news={news} goToPost={goToPost} allPost={allPost} />

        {/* botones */}
        <DashboardSection2 employeedirectory={employeedirectory} requestMenu={requestMenu} inConstruction={inConstruction} />

        {/* Avisos */}
        <DashboardSection8 notices={notices} />

        {/* multimedia */}
        <DashboardSection5 multimedia={multimedia} multimediaMain={multimediaMain} goToPost={goToPost} modalToggle={modalToggle} getImagesHandler={getImagesHandler} />

        {/* cumpleanos y calendario */}
        <DashboardSection4 birthday={birthday} events={events} goToProfile={goToProfile} />

        {/* educapp, foto del dia y valor del mes */}
        <DashboardSection3 />

        {/* logo */}
        < DashboardSection6 />

        {/* social */}
        <DashboardSection7 tweets={tweets} />
      </div>
    </>
  );
};

export default DashboardForm;
