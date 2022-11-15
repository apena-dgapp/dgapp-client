import { useState, useEffect } from "react";
import NewCourseForm from "./NewCourseForm.jsx";
import { getBase64 } from "../../utils/blobManager";
import { TrainingContext } from "./TrainingContext";
import axios from "axios";
import AWN from "awesome-notifications";
import { useParams } from "react-router";
import useGetData from "../../hooks/useGetData";

const NewCourse = () => {
  const urlApi = process.env.REACT_APP_API;
  const { courseId } = useParams();

  ///////////////declaring states//////////////////////
  const [img, setImg] = useState(null);
  const [videoCount, setVideoCount] = useState(0);
  const [sectionCount, setSectionCount] = useState(0);
  const [newInputSection, setNewInputSection] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit] = useState(courseId !== undefined ? true : false);

  ////////////////states with the data///////////////////////////

  const { data: fetchCourseData } = useGetData(`${urlApi}/course/${courseId}`);
  const { data: fetchSectionData } = useGetData(`${urlApi}/section/${courseId}`);
  const { data: fetchVideoData } = useGetData(`${urlApi}/video/${courseId}`);


  const [courseData, setCourseData] = useState([defaultCourse()]);
  const [videoData, setVideoData] = useState([defaultVideo(tabIndex, 0)]);
  const [sectionData, setSectionData] = useState([
    defaultSection("Sección 1", 0),
  ]);



  //////////////functions//////////////////////

  function getVideoId(url) {
    const id = url?.split("v=")[1]?.split("&");
    return id[0];
  }

  function checkEmptyValue(object) {
    let array = Object.values(object)
    for (let i = 0; i < array.length; i++) {
      const newArray = Object.values(array[i])
      for (let y = 0; y < newArray.length; y++) {
        if(typeof newArray[y] === "string") {
          if(newArray[y].trim() === "") {
            return true
          }
        }
      }
    }
    return false
  }

  function deleteElement(element, data) {
    axios({
      method: "put",
      url: `${urlApi}/${element}/${data.id}`,
      data: {
        isActive: false,
      },
    }).then((res) => {
    });
  }

  async function selectedHandler(e) {
    //To convert a selected img to base64
    setImg(await getBase64(e.target.files[0]));
  }

  /////////////////axios function////////////////////////

  async function postNewCourse() {
    axios({
      method: courseId === undefined ? "post" : "put",
      url:
        courseId === undefined
          ? `${urlApi}/course/create`
          : `${urlApi}/course/${courseId}`,
      data: {
        title: courseData[0].title,
        description: courseData[0].description,
        additional_info: courseData[0].additional_info,
        image: img,
        madeBy: courseData[0].madeBy,
        createdBy: "admin", ////here go the rol
        collaborators: courseData[0].collaborators,
      },
    })
      .then((res) => {
        sectionData.map((section) => {
          let hasCourseId = courseId === undefined ? res.data : courseId;
          axios({
            method: section.id === undefined ? "post" : "put",
            url:
              section.id === undefined
                ? `${urlApi}/section/`
                : `${urlApi}/section/${section.id}`,
            data: {
              courseId: section.id === undefined ? hasCourseId : section.id,
              title: section.title,
              order: 1,
              createdBy: "Admin",
            },
          }).then((response) => {
            videoData.map((video) => {
              if (
                section.localId === video.sectionId ||
                section.id === video.sectionId
              ) {
                uploadVideo(
                  video,
                  section.id === undefined ? response.data : section.id,
                  courseId === undefined ? res.data : courseId
                );
              }
              return null
            });
            
          })
          return null
        });
      })
      .then(() => {
        const globalOptions = {
          position: "bottom-left",
          labels: {
            success: "Exito!",
          },
        };
        const notifier = new AWN(globalOptions);

        if (courseId === undefined) {
          setCourseData([defaultCourse()]);
          setVideoData([defaultVideo()]);
          setSectionData([defaultSection("Sección 1", 0)]);
          setImg(null);
          setTabIndex(0);
          notifier.success(
            "El curso ha sido públicado con éxito.",
            globalOptions
          );
        } else {
          notifier.success(
            "El curso ha sido modificado con éxito.",
            globalOptions
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async function uploadVideo(video, section_id, course_id) {
    const id = getVideoId(video.link)
    const tokenApi = "AIzaSyBjrn-Egkd4ZHF1JjZ9QQG7gVQuLzSnZ-0";
    let duration;

    await axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?id=${id}&part=contentDetails&key=${tokenApi}`
      )
      .then((res) => {
        if (res.data.items[0] !== undefined) {
          duration = res.data.items[0].contentDetails.duration
            .split("M")[0]
            .split("PT")[1];
          axios({
            method: video.id === undefined ? "post" : "put",
            url:
              video.id === undefined
                ? `${urlApi}/video/`
                : `${urlApi}/video/${video.id}`,
            data: {
              sectionId: section_id,
              courseId: course_id,
              title: video.title,
              link: video.link,
              duration: parseInt(duration),
              createdBy: "admin",
            },
          });
        }
      });
  }

  /////////////////default data function/////////////////////////
  function defaultCourse() {
    return {
      title: "",
      description: "",
      additional_info: "",
      madeBy: "",
      collaborators: "",
    };
  }

  function defaultVideo(index, localId) {
    return {
      sectionId: index,
      localId: localId,
      order: 1,
      title: "",
      link: "",
    };
  }

  function defaultSection(title, index) {
    return {
      localId: index,
      title: title,
    };
  }

  function addLocalId(array) {
    let newArray = [];
    array.map((a, index) => {
      newArray.push({ ...a, localId: index });
      return null
    });
    return newArray;
  }

  /////////////////////////////////////////////////////////

  useEffect(() => {
    setRefresh(false);
    setEdit(false);
  }, [refresh]);

  useEffect(() => {
    if (fetchCourseData !== null && fetchCourseData.length > 0) {
      setCourseData(fetchCourseData);
      setImg(fetchCourseData[0].image);
    }
    if (fetchSectionData !== null && fetchSectionData.length > 0) {
      setSectionData(addLocalId(fetchSectionData));
    }
    if (fetchVideoData !== null && fetchVideoData.length > 0) {
      setVideoData(addLocalId(fetchVideoData));
    }
    // window.scrollTo(0, 0);
    // console.log(fetchCourseData);
  }, [fetchCourseData, fetchSectionData, fetchVideoData]);

  return (
    <>
      <TrainingContext.Provider
        value={[
          { courseData, setCourseData },
          { sectionData, setSectionData },
          { videoData, setVideoData },
          { videoCount, setVideoCount },
          { sectionCount, setSectionCount },
          { newInputSection, setNewInputSection },
          { tabIndex, setTabIndex },
          { refresh, setRefresh },
          { edit, setEdit },
          { img, setImg },
        ]}
      >
        <NewCourseForm
          courseId={courseId}
          defaultSection={defaultSection}
          defaultVideo={defaultVideo}
          selectedHandler={selectedHandler}
          postNewCourse={postNewCourse}
          deleteElement={deleteElement}
          addLocalId={addLocalId}
          checkEmptyValue={checkEmptyValue}
        />
      </TrainingContext.Provider>
    </>
  );
};;

export default NewCourse;