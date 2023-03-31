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
  multimediaMain,
  arrayCarousel,
  modalToggle,
  getImagesHandler,
  getImageHandler,
  notices,
  tweets,
  instagram,
  quiz,
  HandlerAnswer,
  exists,
  ansowerCount,
  selectedCaledary,
  setSelectedCaledary,
  commemorative,
  contextState,
  EditToggle,
  messageToggle,
  messageToggleActivity,
  dayPhoto,
  monthValue,
  jsonUploadToggle,
}) => {

  return (
    <>
      <div className="dashboard-container">
        {/* carousel y noticias */}
        <DashboardSection1
          arrayCarousel={arrayCarousel}
          news={news}
          goToPost={goToPost}
        />

        {/* botones */}
        <DashboardSection2 />

        {/* Avisos */}
        <DashboardSection8
          notices={notices}
          quiz={quiz}
          HandlerAnswer={HandlerAnswer}
          exists={exists}
          ansowerCount={ansowerCount}
        />

        {/* multimedia */}
        <DashboardSection5
          multimedia={multimedia}
          multimediaMain={multimediaMain}
          goToPost={goToPost}
          modalToggle={modalToggle}
          getImagesHandler={getImagesHandler}
        />

        {/* cumpleanos y calendario */}
        <DashboardSection4
          birthday={birthday}
          events={events}
          goToProfile={goToProfile}
          selectedCaledary={selectedCaledary}
          setSelectedCaledary={setSelectedCaledary}
          commemorative={commemorative}
          contextState={contextState}
          EditToggle={EditToggle}
          messageToggle={messageToggle}
          messageToggleActivity={messageToggleActivity}
        />

        {/* educapp, foto del dia y valor del mes */}
        <DashboardSection3
          dayPhoto={dayPhoto}
          monthValue={monthValue}
          getImageHandler={getImageHandler}
        />

        {/* logo */}
        < DashboardSection6 />

        {/* social */}
        <DashboardSection7
          tweets={tweets}
          instagram={instagram}
          jsonUploadToggle={jsonUploadToggle}
          contextState={contextState}
        />
      </div>
    </>
  );
};

export default DashboardForm;
