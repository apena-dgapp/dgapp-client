import { useEffect, useState, useContext } from "react";
import CourseForm from "./CourseForm.jsx";
import { useParams } from "react-router";
import useGetData from "../../../hooks/useGetData";
import useUpdateRecord from "../../../hooks/useUpdateRecord";
import GlobalContext from "../../../context/GlobalContext.js";


const Course = () => {
  const urlApi = process.env.REACT_APP_API;
  const [contextState, , ] = useContext(GlobalContext);
  const userId = contextState.personId; //This is the supposed employee id

  const { courseId, videolink } = useParams();

  // ///////////////////////////////////////Fetch Data ////////////////////////////////////////
  const { data: courseData } = useGetData(`${urlApi}/course/${courseId}`);
  const { data: sectionsData } = useGetData(`${urlApi}/section/${courseId}`);
  const { data: videosData } = useGetData(`${urlApi}/video/${courseId}`);
  const { data: recordsData } = useGetData(
    `${urlApi}/record/getrecords/${courseId}/${userId}`
  );

  // ///////////Global context///////////////
  const [globalCheck, setGlobalCheck] = useState();
  const [lastVideo, setLastVideo] = useState();
  const [checkVideo, setCheckVideo] = useState();

  // /////////////Functions//////////////
    // console.log(globalCheck)
  function globalCount() {
    //count the global videos checks
    let count = 0;
    recordsData?.map((record) => {
      if (record.checked) {
        count++;
      }
      return null
    });
    setGlobalCheck(count);
  }

  function globalDuration() {
    let duration = 0;
    videosData.map((video) => {
      duration += video.duration
      return null
    });
    return duration
  }

  function loading() {
    //Check if there're a null value
    if (
      courseData !== null &&
      sectionsData !== null &&
      videosData !== null &&
      recordsData !== null
    ) {
      return true;
    }
    return false;
  }

  function HandleCheck(event, id) {
    useUpdateRecord(event.target.playerInfo.playerState, id, checkVideo);

    if (event.target.playerInfo.playerState === 0) {
      //Planeo hacer que pase al siguiente video con esto
      // {videos.map((video) => {
      //   console.log(videoId)
      //   if(video.id === props.id) {
      //     console.log("coincide");
      //   }
      // })}
    }
  }

  useEffect(() => {
    if (loading()) {
      //To check if there are a null value
      globalCount();
    }
  }, [globalCount]);

    return (
      <>
        {/* <CourseContext.Provider
          value={[
            { globalCheck, setGlobalCheck },
            { lastVideo, setLastVideo },
            { userId },
          ]}
        >     */}
        { loading() ?
          <CourseForm
            course={courseData}
            sections={sectionsData ? sectionsData: null}
            videos={videosData ? videosData : null }
            records={recordsData ? recordsData :null}
            HandleCheck={HandleCheck}
            globalDuration={globalDuration}
            link={videolink ? videolink : lastVideo}
            globalCheck={globalCheck}
            setGlobalCheck={setGlobalCheck}
            lastVideo={lastVideo}
            setLastVideo={setLastVideo}
            userId={userId}
          />
          :null}
        {/* </CourseContext.Provider> */}
      </>
    );
  
};

export default Course;
