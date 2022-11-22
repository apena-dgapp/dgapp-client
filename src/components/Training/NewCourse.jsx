import { useState, useEffect } from "react";
import NewCourseForm from "./NewCourseForm.jsx";
import { getBase64 } from "../../utils/blobManager";
import { TrainingContext } from "./TrainingContext";
import axios from "axios";
import AWN from "awesome-notifications";
import { useParams } from "react-router";
import useGetData from "../../hooks/useGetData";
import toast from "react-hot-toast";

const NewCourse = () => {
  const urlApi = process.env.REACT_APP_API;
  const { courseId } = useParams();
  const [modalActive, setModalActive] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    title: "",
    content: ""
  });


  ///////////////declaring states//////////////////////
  const [img, setImg] = useState(null);
  const [videoCount, setVideoCount] = useState(0);
  const [sectionCount, setSectionCount] = useState(0);
  const [newInputSection, setNewInputSection] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit] = useState(courseId !== undefined ? true : false);
  const [dataElement, setDataElement] = useState(null)

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
    try {
      const id = url?.split("v=")[1]?.split("&");
      return id[0];
    } catch (error) {

    }
  }

  function checkEmptyValue(object) {
    let array = Object.values(object)
    for (let i = 0; i < array.length; i++) {
      const newArray = Object.values(array[i])
      for (let y = 0; y < newArray.length; y++) {
        if (typeof newArray[y] === "string") {
          if (newArray[y].trim() === "") {
            return true
          }
        }
      }
    }
    return false
  }

  async function disableElement(element, data) {
    try {
      await axios({
        method: "put",
        url: `${urlApi}/${element}/${data.id}`,
        data: {
          isActive: false,
        },
      })
    } catch (error) {
      console.error(error);
    }
  }

  async function selectedHandler(e) {
    //To convert a selected img to base64
    setImg(await getBase64(e.target.files[0]));
  }

  async function invalidVideoClass(url, index) {
    let videoId = getVideoId(url);
    const tokenApi = "AIzaSyBjrn-Egkd4ZHF1JjZ9QQG7gVQuLzSnZ-0";
    await axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=contentDetails&key=${tokenApi}`
      )
      .then((res) => {
        if (Object?.keys(res?.data?.items)?.length === 0) {
          document.getElementById(`input-link-${index}`).classList.add("invalid-url")
        } else {
          document.getElementById(`input-link-${index}`).classList.remove("invalid-url")
        }
      });
  }

  function validData() {
    let bool = true
    if (
      checkEmptyValue(courseData) ||
      checkEmptyValue(videoData) ||
      checkEmptyValue(sectionData)
    ) {
      bool = false
    }
    videoData.forEach((video) => {
      let videoId = getVideoId(video.link)
      if (videoId.length < 11) {
        bool = false
      }
    })
    return bool
  }
  /////////////////axios function////////////////////////

  async function postNewCourse() {
    if (validData()) {
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
            axios({
              method: section.id === undefined ? "post" : "put",
              url:
                section.id === undefined
                  ? `${urlApi}/section/`
                  : `${urlApi}/section/${section.id}`,
              data: {
                courseId: courseId === undefined ? res.data : courseId,
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
          if (courseId === undefined) {
            setCourseData([defaultCourse()]);
            setVideoData([defaultVideo()]);
            setSectionData([defaultSection("Sección 1", 0)]);
            setImg(null);
            setTabIndex(0);
            toast.success("El curso ha sido públicado con éxito.")
          } else {
            toast.success("El curso ha sido modificado con éxito.")
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
    else {
      return toast.error("Por favor validar los campos antes de publicar el curso.")
    }
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
        if (Object?.keys(res?.data?.items)?.length > 0 && res.data.items[0] !== undefined) {
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
        } else {
          console.log(Object?.keys(res?.data?.items)?.length);
          return toast.error(`Por favor introducir un link valido para el video ${video.title}`)
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

  const modalToggleAceppt = (props) => {
    // if (formData.video) {
    //   setModalActive(!modalActive);
    // } else {
    //   return toast.error("Por favor de agregar el enlace del video");
    // }
  };
  const modalToggle = () => {
    setModalActive(!modalActive);
  };


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
          disableElement={disableElement}
          addLocalId={addLocalId}
          checkEmptyValue={checkEmptyValue}
          modalToggle={modalToggle}
          modalToggleAceppt={modalToggleAceppt}
          setModalActive={setModalActive}
          modalActive={modalActive}
          modalInfo={modalInfo}
          setModalInfo={setModalInfo}
          setDataElement={setDataElement}
          invalidVideoClass={invalidVideoClass}
        />
      </TrainingContext.Provider>
    </>
  );
};;

export default NewCourse;
