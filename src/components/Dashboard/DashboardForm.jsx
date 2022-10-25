import React from "react";
import DashboardSection1 from "./DashboardSection1";
import DashboardSection2 from "./DashboardSection2";
import DashboardSection3 from "./DashboardSection3";
import DashboardSection4 from "./DashboardSection4";
import DashboardSection5 from "./DashboardSection5";
import DashboardSection6 from "./DashboardSection6";
// import DashboardSection7 from "./DashboardSection7";
// import { GoMegaphone } from "react-icons/go";
// import { FaBirthdayCake, FaConciergeBell, FaVideo } from "react-icons/fa";
// import { MdEventNote } from "react-icons/md";
// import { GiNewspaper, GiOrganigram, GiFullFolder } from "react-icons/gi";
// import { ImNewspaper } from "react-icons/im";

const DashboardForm = ({
  // ad,\
  news,
  birthday,
  events,
  eventDate,
  multimedia,
  goToPost,
  goToProfile,
  employeeTree,
  employeedirectory,
  allPost,
  multimediaMain
}) => {

  return (
    <>
      <div className="dashboard-container">
        {/* carousel y noticias */}
        <DashboardSection1 news={news} goToPost={goToPost} allPost={allPost}/>
        
        {/* botones */}
        <DashboardSection2 employeedirectory={employeedirectory}/>

        {/* avisos y educapp */}
        <DashboardSection3/>

        {/* cumpleanos y calendario */}
        <DashboardSection4 birthday={birthday} events={events} goToProfile={goToProfile}/>

        {/* multimedia */}
        <DashboardSection5 multimedia={multimedia} multimediaMain={multimediaMain} goToPost={goToPost}/>

        {/* logo */}
        <DashboardSection6/>

        {/* social */}
        {/* <DashboardSection7/> */}
            
      </div>
    </>
  );
};

export default DashboardForm;
