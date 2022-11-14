import { useContext, useState, useEffect } from "react";
import { TrainingContext, SectionsContext } from "../../../TrainingContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";  
import Cookies from "universal-cookie"
import useUpdateRecord from "../../../../../hooks/useUpdateRecord";
import ElementsForm from "./ElementsForm"

const Elements = (props) => {
  const { courseId, videolink } = useParams();
  const cookies = new Cookies();
  const navigate = useNavigate();
  const videoId = getVideoId(props.video.link)


  //////////////////States/////////////////////////
  const [checked, setChecked] = useState(isCheck());

  //////////////////Context //////////////////////////
  const [{ checkCount, setCheckCount }, { setShow }] =
    useContext(SectionsContext);


  ///////////////Functions///////////////////

  function getVideoId(url) {
    const id = url?.split("v=")[1]?.split("&")
    if(id !== undefined) {
      return id
    }
    return url
  }


  function isCheck() {
    let bool;
    if (props.records.length > 0) {
      props.records.map((record) => {
        if (record.checked && props.video.id === record.videoId) {
          bool = record.checked;
        }
        return null
      })
    }
    return bool;
  }

  function HandleChange() {
    const data = {
      state: 0,
      courseId: courseId,
      employeeId: props.userId,
      videoId: props.video.id,
      checked: checked,
    };

    const value = useUpdateRecord(data);
    setChecked(!checked);

    if (value) {
      setCheckCount(checkCount + value);
      props.setGlobalCheck(props.globalCheck + value);
    }
  }

  function HandleCookie() {
    props.setLastVideo(videoId);
    
    cookies.set(`courseId:${courseId}:lastVideo`, `${videoId}`, {
      path: `/`,
    });
    navigate(`/entrenamiento/curso/${courseId}/${videoId}`);
  }

  //////////////////////////////////////////////
  useEffect(() => {
    if (videolink === videoId) {
      setShow(true);
    } 
  }, [videolink, videoId, setShow]); 

  return (
    <>
      <ElementsForm
        video={props.video}
        checked={checked}
        HandleChange={HandleChange}
        HandleCookie={HandleCookie}
      />
    </>
  );
};

export default Elements;
