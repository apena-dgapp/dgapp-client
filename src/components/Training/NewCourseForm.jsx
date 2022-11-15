import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { TrainingContext } from "./TrainingContext";
import { useContext } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { BsDashCircleFill, BsImage } from "react-icons/bs";
import AWN from "awesome-notifications";

const NewCourseForm = (props) => {
  const [
    { courseData, setCourseData },
    { sectionData, setSectionData },
    { videoData, setVideoData },
    { videoCount, setVideoCount },
    { sectionCount, setSectionCount },
    { newInputSection, setNewInputSection },
    { tabIndex, setTabIndex },
    { setRefresh },
    { edit, setEdit },
    { img, setImg },
  ] = useContext(TrainingContext);

  return (
    <>
      <h2 className="create-course-title">DETALLES DEL CURSO</h2>
      <div className="course-details">
        <div className="input-container">
          <div className="input-course">
            <p className="label-details">Título:</p>
            <input
              value={courseData[0].title}
              type="text"
              onChange={(e) => {
                setCourseData([{ ...courseData[0], title: e.target.value }]);
              }}
            />
          </div>
          <div className="input-course">
            <p className="label-details">Descripción:</p>
            <textarea
              // rows="5"
              // cols="60"
              maxLength={450}
              name="description"
              value={courseData[0].description}
              onChange={(e) => {
                setCourseData([
                  { ...courseData[0], description: e.target.value },
                ]);
              }}
            />
          </div>
          {/* <div className="input-course">
            <p className="label-details">Información adicional:</p>
            <textarea
              rows="2"
              cols="60"
              name="description"
              value={courseData[0].additional_info}
              onChange={(e) => {
                setCourseData([
                  { ...courseData[0], additional_info: e.target.value },
                ]);
              }}
            />
          </div> */}
          <div className="input-course">
            <p className="label-details">Creado por:</p>
            <input
              value={courseData[0].madeBy}
              onChange={(e) => {
                setCourseData([{ ...courseData[0], madeBy: e.target.value }]);
              }}
            />
          </div>
          <div className="input-course">
            <p className="label-details">Colaboradores:</p>
            <input
              value={courseData[0].collaborators}
              onChange={(e) => {
                setCourseData([
                  { ...courseData[0], collaborators: e.target.value },
                ]);
              }}
            />
          </div>
        </div>
        <div className="image-uploader" htmlFor="getImage">
          <p style={{display: img !== null ? "none":"block"}}>Click para agregar una image de portada</p>
          <input
            id="getImage"
            className={"hide"}
            type="file"
            accept=".jpg,.png"
            onChange={(e) => {
              props.selectedHandler(e);
            }}
          />
          <BsDashCircleFill
            className={img !== null ? "delete-icon" : "hide-icon"}
            onClick={() => {
              setImg(null);
            }}
          />
          <BsImage
            className={img === null ? "select-image" : "hide"}
            htmlFor="#getImage"
            onClick={() => {
              document.getElementById("getImage").click();
            }}
          />
          {/* <label
            className={img === null ? "select-image" : "hide"}
            htmlFor="getImage"
          >
            Selecciona tu portada
          </label> */}

          <img style={{display: img !== null ? "block":"contents"}} src={img} alt=" " />
        </div>
      </div>
      <div className="section-details-container">
        <h2 className="create-course-title">DETALLES DE LA SECCIONES</h2>
        <Tabs
          selectedIndex={tabIndex}
          onSelect={(e) => {
            setTabIndex(e);
          }}
        >
          <TabList>
            {sectionData.map((data, index) => {
              return (
                <Tab key={index}>
                  {/* <FontAwesomeIcon
                    className={
                      data.localId === tabIndex ? "show-icon" : "hide-icon"
                    }
                    icon={faPenToSquare}
                    onClick={() => {
                      setEdit(true);
                      document.getElementById(data.localId).focus();
                    }}
                  /> */}
                  <AiFillEdit
                    className={
                      data.localId === tabIndex ? "edit-icon" : "hide-icon"
                    }
                    onClick={() => {
                      setEdit(true);
                      document.getElementById(data.localId).focus();
                    }}
                  />
                  <input
                    id={data.localId}
                    className={!edit ? "input-section" : "input-section-edit"}
                    value={data.title}
                    onBlur={() => {
                      setEdit(false);
                    }}
                    onChange={(e) => {
                      if (edit) {
                        const currentSection = {
                          ...sectionData[index],
                          title: e.target.value,
                        };
                        const filtered = sectionData.filter(
                          (section) => section.localId !== data.localId
                        );
                        setSectionData(
                          [...filtered, currentSection].sort((a, b) => {
                            return a.localId - b.localId;
                          })
                        );
                      }
                    }}
                  />
                  <FaTrash
                    className={
                      data.localId === tabIndex ? "show-icon" : "hide-icon"
                    }
                    onClick={() => {
                      const globalOptions = {
                        position: "bottom-left",
                        labels: {
                          confirmOk: "Si",
                          confirmCancel: "Cancelar",
                          success: "Exito!",
                          confirm: "¿Deseas eliminar esta sección?",
                        },
                      };

                      const notifier = new AWN(globalOptions);

                      notifier.confirm(
                        " ",
                        () => {
                          if (data.id !== undefined) {
                            props.deleteElement("section", data);
                          }
                          const filteredSections = sectionData.filter(
                            (section) => section.localId !== data.localId
                          );

                          let sections = [...filteredSections].sort((a, b) => {
                            return a.localId - b.localId;
                          });

                          const filteredVideos = videoData.filter(
                            (video) => video.sectionId !== data.localId
                          );

                          let videos = [...filteredVideos].sort((a, b) => {
                            return a.localId - b.localId;
                          });

                          sections.map((section, index) => {
                            videos.map((video) => {
                              if (section.localId === video.sectionId) {
                                video.sectionId = index;
                              }
                              return null;
                            });
                            section.localId = index;
                            return null;
                          });

                          setSectionData(sections);
                          setVideoData(videos);
                          setSectionCount(sectionCount - 1);

                          setSectionData(
                            [...filteredSections].sort((a, b) => {
                              return a.localId - b.localId;
                            })
                          );
                          setTabIndex(0);
                          setRefresh(true);
                          notifier.success(
                            "La sección ha sido eliminada.",
                            globalOptions
                          );
                        },
                        () => {},
                        globalOptions
                      );
                    }}
                  />
                </Tab>
              );
            })}
            <input
              onBlur={() => {
                if (!newInputSection.length <= 0 && newInputSection !== "") {
                  setSectionData(
                    props.addLocalId([
                      ...sectionData,
                      props.defaultSection(newInputSection, sectionCount + 1),
                    ])
                  );
                  setSectionCount(sectionCount + 1);
                  setNewInputSection("");
                  setRefresh(true);
                }
              }}
              className="input-newSection"
              placeholder="Nueva sección"
              onChange={(e) => {
                setNewInputSection(e.target.value);
              }}
              value={newInputSection}
            />
          </TabList>
          {sectionData.map((section, i) => {
            return (
              <TabPanel key={i}>
                {videoData.map((data, index) => {
                  if (
                    data.sectionId === section.id ||
                    data.sectionId === section.localId
                  ) {
                    return (
                      <div key={index}>
                        <div className="video-details-container">
                          <div className="video-details-grid">
                            {/* <div className="order-details-grid">
                              <label>Orden: </label>
                              <input
                                value={data.order}
                                onChange={(e) => {
                                  const currentVideo = {
                                    ...videoData[index],
                                    order: e.target.value,
                                  };
                                  const filtered = videoData.filter(
                                    (video) => video.localId !== data.localId
                                  );
                                  setVideoData(
                                    [...filtered, currentVideo].sort((a, b) => {
                                      return a.localId - b.localId;
                                    })
                                  );
                                }}
                              />
                            </div> */}
                            <div className="title-details-grid">
                              <label>Título del video: </label>
                              <input
                                value={data.title}
                                onChange={(e) => {
                                  const currentVideo = {
                                    ...videoData[index],
                                    title: e.target.value,
                                  };
                                  const filtered = videoData.filter(
                                    (video) => video.localId !== data.localId
                                  );
                                  setVideoData(
                                    [...filtered, currentVideo].sort((a, b) => {
                                      return a.localId - b.localId;
                                    })
                                  );
                                }}
                              />
                            </div>
                            <div className="link-details-grid">
                              <label>Link del video: </label>
                              <input
                                value={data.link}
                                onChange={(e) => {
                                  const currentVideo = {
                                    ...videoData[index],
                                    link: e.target.value,
                                  };
                                  const filtered = videoData.filter(
                                    (video) => video.localId !== data.localId
                                  );
                                  setVideoData(
                                    [...filtered, currentVideo].sort((a, b) => {
                                      return a.localId - b.localId;
                                    })
                                  );
                                }}
                              />
                            </div>
                            <button
                              onClick={() => {
                                const globalOptions = {
                                  position: "bottom-left",
                                  labels: {
                                    success: "Exito!",
                                    confirm: "¿Deseas eliminar este video?",
                                  },
                                };

                                const notifier = new AWN(globalOptions);

                                notifier.confirm(
                                  " ",
                                  () => {
                                    if (data.id !== undefined) {
                                      props.deleteElement("video", data);
                                    }

                                    const filtered = videoData.filter(
                                      (video) => video.localId !== data.localId
                                    );
                                    setVideoData(
                                      [...filtered].sort((a, b) => {
                                        return a.localId - b.localId;
                                      })
                                    );

                                    notifier.success(
                                      "El video ha sido eliminado.",
                                      globalOptions
                                    );
                                  },
                                  () => {},
                                  globalOptions
                                );
                              }}
                              className="btn-training delete-video-btn"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </TabPanel>
            );
          })}

          <button
            className="btn-training-add adding-videos-btn"
            onClick={() => {
              setVideoData(
                props.addLocalId([
                  ...videoData,
                  props.defaultVideo(tabIndex, videoCount + 1),
                ])
              );
              setVideoCount(videoCount + 1);
              setRefresh(true);
            }}
          >
            Nuevo video
          </button>
        </Tabs>
      </div>
      {props.courseId === undefined ? (
        <div className="trainig-btn-publish-cont">
           <button
            className="btn-training"
            onClick={() => {
              const globalOptions = {
                labels: {
                  success: "Exito!",
                  confirm: "¿Deseas publicar este curso?",
                  confirmOk: "Si",
                  confirmCancel: "Cancelar",
                },
              };
              const notifier = new AWN(globalOptions);

              notifier.confirm(
                " ",
                () => {
                  props.postNewCourse();
                },
                (() => {}, globalOptions)
              );
            }}
          >
            Publicar
          </button>
        </div>
       
      ) : (
        <div className="trainig-btn-publish-cont">
          <button
            className="btn-training"
            onClick={() => {
              const globalOptions = {
                labels: {
                  success: "Exito!",
                  confirm: "¿Deseas actualizar este curso?",
                  confirmOk: "Si",
                  confirmCancel: "Cancelar",
                },
              };
              const notifier = new AWN(globalOptions);

              notifier.confirm(
                " ",
                () => {
                  if (
                    !props.checkEmptyValue(videoData) &&
                    !props.checkEmptyValue(sectionData)
                  ) {
                    props.postNewCourse();
                  } else {
                    const globalOptions = {
                      position: "bottom-left",
                      labels: {
                        warning: "Error",
                      },
                    };
                    const notifier = new AWN(globalOptions);
                    notifier.warning(
                      "Verifique de no dejar ningún elemento vacio.",
                      globalOptions
                    );
                  }
                },
                (() => {}, globalOptions)
              );
            }}
          >
            Actualizar
          </button>
        </div>
      )}
    </>
  );
};

export default NewCourseForm;
