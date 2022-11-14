import SectionsForm from "./SectionsForm.jsx";
import { useState, useEffect } from "react";
import { SectionsContext } from "../../TrainingContext"
import { useParams } from "react-router";


const Sections = (props) => {
  const { videolink } = useParams();


  /////////////////////States///////////////////////
  const [videos] = useState(
    //Filter the videos that belongs to the current section
    props.videos.filter((video) => video.sectionId === props.id)
  );
  const [duration] = useState(totalDuration());

  /////////////////Section Context//////////////////////

  const [show, setShow] = useState(false); //to show or hide the section
  const [checkCount, setCheckCount] = useState(checkedCount);
  const [checked, setChecked] = useState();

  /////////////////////////Functions///////////////////////////

  function totalDuration() {
    //To show the total duration of all videos
    let count = 0;
    videos.map((video) => {
      count += parseInt(video.duration);
      return null
    });
    return count;
  }

  function checkedCount() {
    //To check which videos has been seen by user
    let count = 0;

    videos.map((video) => {
      if (props?.records?.length > 0) {
        props?.records?.map((record) => {
          if (record.checked && video.id === record.videoId) {
            count++;
          }
          return null
        });
      }
      return null
    });
    return count;
  }

  function HandleClick() { //To show or hide the section
    setShow(!show);
  }

  ///////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (videolink === props.link) {
      setShow(true);
    }
  }, [videolink, props.link]);

  return (
    <div>
      <SectionsContext.Provider
        value={[
          { checkCount, setCheckCount },
          { show, setShow },
          { checked, setChecked },
        ]}
      >
        <SectionsForm
          section={props.section}
          videos={videos}
          records={props.records}
          number={props.number}
          duration={duration}
          show={show}
          checkCount={checkCount}
          HandleClick={HandleClick}
          globalCheck={props.globalCheck}
          setGlobalCheck={props.setGlobalCheck}
          lastVideo={props.lastVideo}
          setLastVideo={props.setLastVideo}
          userId={props.userId}
        />
      </SectionsContext.Provider>
    </div>
  );
};

export default Sections;
