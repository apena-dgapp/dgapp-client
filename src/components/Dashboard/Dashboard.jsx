import React, { useEffect, useState, useContext, useRef } from "react";
import DashboardForm from "./DashboardForm";
import { getPost, getDataCarousel, getPostMultimedia, getPostMultimediaMain, expirationNoticies, expirationPost, updatePost, disabledPost } from "../../api/post";
import { incrementClick } from '../../api/tags';
import { getNews } from '../../api/news';
import { getFiles } from "../../api/post";
import { getBirthday } from "../../api/person";
import { getEvents, disabledEvent } from "../../api/events";
import { viewUpdate } from "../../api/post";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import DashboardPopup from "./DashboardPopup";
// import Viewer from "react-viewer";
import ImageViewer from "../../common/components/ImageViewer/ImageViewer";
import { getQuiz, expirationQuiz, sendAnswer } from "../../api/quiz";
import GlobalContext from "../../context/GlobalContext";
import Message from "../../common/components/Message/Message";
import toast from "react-hot-toast";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { convertToHTML } from "draft-convert";
import { getBase64 } from "../../utils/blobManager";
import EditCardModal from "../../common/components/Card/EditCardModal";
// import { getTweets } from "../../api/tweets";
// import { TwitterApi } from 'twitter-api-v2';

const Dashboard = () => {
  const [contextState, ,] = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [birthday, setBirthday] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState([]);
  const [multimedia, setMultimedia] = useState([]);
  const [multimediaMain, setMultimediaMain] = useState();
  const [galleryName, setGalleryName] = useState("");
  const [arrayCarousel, setArrayCarousel] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [selectedCaledary, setSelectedCaledary] = useState("activities");
  const [modalData, setModalData] = useState("");
  const [visible, setVisible] = useState(false);
  const [arrayImg, setArrayImg] = useState("");
  const [notices, setNotices] = useState([]);
  // const [tweets, setTweets] = useState([]);
  const [instagram, setInstagram] = useState([]);
  const [ansowerCount, setAnsowerCount] = useState({});
  const [quiz, setQuiz] = useState("");
  const [exists, setExists] = useState("");
  const [commemorative, setCommemorative] = useState("");
  const [data, setData] = useState("");
  const [editorState, setEditorState] = useState();
  const [isEvent, setIsEvent] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const modalToggle = (data) => {
    setModalActive(!modalActive);
    setModalData(data)
  };
  const [message, setMessage] = useState({
    title: "",
    text: "",
    isActive: false
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
    date: "",
    tags: "",
    action: ""
  });

  // useEffect(() => {
  //   let unmounted = false;
  //   getTweets()
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       if (!unmounted) {
  //         setTweets(res.tweets);
  //         console.log(res);
  //       }
  //     });
  //   return () => {
  //     unmounted = true;
  //   };
  // }, []);

  useEffect(() => {
    let unmounted = false;

    expirationPost("Fechas Conmemorativas", "createdAt")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted && res === 200) {
          getPost("Fechas Conmemorativas", 100)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              if (!unmounted) {
                setCommemorative(res.posts);
              }
            })
            .catch((err) => {
              console.error(err.status);
            });
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
    return () => {
      unmounted = true;
    };
  }, []);


  // useEffect(() => {
  //   let unmounted = false;
  //   getPost("Fechas Conmemorativas", 100)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       if (!unmounted) {
  //         setCommemorative(res.posts);
  //       }
  //     });
  //   return () => {
  //     unmounted = true;
  //   };
  // }, []);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      fetch(
        `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,timestamp,caption&limit=3&access_token=${process.env.REACT_APP_INSTAGRAM_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setInstagram(data.data);
        });
    }

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      setLoading(true);
    }
    setTimeout(() => {
      if (!unmounted) {
        setLoading(false);
      }
    }, 2500);
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;

    getDataCarousel("Portada Principal", 3)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayCarousel(res.posts);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    expirationQuiz()
      .then((res) => res.json());

    getQuiz()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setQuiz(res);
          setExists(res[0]?.Answers.find(o => o.personId === contextState.personId))
          var count = {};
          res[0]?.Answers.forEach(function (v) {
            count[v.selected] = (count[v.selected] || 0) + 1;
          })
          setAnsowerCount(count)
          // console.log(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
    return () => {
      unmounted = true;
    };
  }, [contextState.personId]);

  useEffect(() => {
    let unmounted = false;

    getNews("0", 3, "")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setNews(res?.rows);

          // var arr
          // arr = res?.rows[2].tags;

          // console.log(arr);
          // console.log(arr.split(/[\s,{""}]+/));
          // console.log(res?.rows[2].tags);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    getPostMultimediaMain("Multimedia", 1)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setMultimedia(res[0]);
          res.map((item, index) => {
            return setMultimediaMain({
              id: item.postId,
              title: item.title,
              url: item.FilesPosts[index].file,
            });
          });

          getPostMultimedia("Multimedia", 5)
            .then((data) => {
              return data.json();
            })
            .then((data) => {
              if (!unmounted) {
                setMultimedia((data?.filter((item) => item.postId !== res[0].postId)));
              }
            })
            .catch((err) => {
              console.error(err.status);
            });
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    getBirthday()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          // setBirthday(res);
          var array1 = [];
          var array2 = [];
          var arrayUnion = [];
          var x = 0
          var y = 0

          for (var i = 0; i < res.length; i++) {
            if (res[i].nextMonth === "Mes Próximo") {
              array2[x] = res[i]
              x = x + 1
            } else {
              array1[y] = res[i]
              y = y + 1
            }
          }

          arrayUnion = array1.concat(array2);
          setBirthday(arrayUnion);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    getEvents()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setEvents(res);
          res?.map((item) => {
            return setEventDate((eventDate) => [...eventDate, item.from]);
          });
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;

    expirationNoticies()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted && res === 200) {
          getPost("Aviso", 2)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              if (!unmounted) {
                setNotices(res.posts);
              }
            })
            .catch((err) => {
              console.error(err.status);
            });
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
    return () => {
      unmounted = true;
    };
  }, []);

  const goToPost = (item) => {

    if (item?.tags) {
      var arr
      arr = item?.tags.split(/[{","}]+/);
      arr.map((item) => {
        return (
          item ?
            incrementClick(item)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                return console.error(err.status);
              }) : null
        )
      })
    }
    viewUpdate(item.postId)
      .then((res) => {
        navigate(`/publicaciones/noticias/${item.title.toLowerCase()}`, {
          state: {
            id: item.postId,
            title: item.title,
            img: item.image,
            description: item.description,
            date: item.createdAt,
            author: item.author,
            createdby: item.createdBy,
            tags: item.tags,
            tagsArray: arr
          },
        });
      })
      .catch((err) => {
        return console.error(err.status);
      });
  };

  const goToProfile = (props) => {
    navigate(`/perfil/${props.name}`, {
      state: props.id,
    });
  };
  const employeeTree = () => {
    navigate("/organigrama");
  };

  // const getImagesHandler = (id) => {
  //   getFiles(id)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       setArrayImg(res);
  //       setVisible(true);
  //     })
  //     .catch((err) => {
  //       console.error(err.status);
  //     });
  // }

  const getImagesHandler = (item) => {
    setLoading(true);
    getFiles(item.postId)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArrayImg(res);
        setVisible(true);
        setGalleryName(item.title)
        setTimeout(() => {
          if (res) {
            setLoading(false);
          }
        }, 2500);
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  const HandlerAnswer = (selected) => {
    sendAnswer(quiz[0].quizId, contextState.personId, selected)
      .then((res) => {
        setLoading(true);
        return res.json();
      })
      .then((res) => {
        if (res === 200) {
          getQuiz()
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              setQuiz(res);
              setExists(res[0]?.Answers.find(o => o.personId === contextState.personId))
              var count = {};
              res[0]?.Answers.forEach(function (v) {
                count[v.selected] = (count[v.selected] || 0) + 1;
              })
              setAnsowerCount(count)
              setTimeout(() => {
                setLoading(false);
              }, 1500);
            })
            .catch((err) => {
              console.error(err.status);
            });
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  //edit and delete

  const messageToggle = (item) => {
    setData(item)
    setMessage({ title: "ELIMINAR FECHA", text: "Seguro que desea eliminar esta fecha conmemorativa?", isActive: !message.isActive })
  };

  const btnConfirmm = () => {
    disabledPost(data.postId)
      .then((res) => {
        if (res.status !== 200) {
          return toast.error("Error al intentar eliminar la fecha conmemorativa");
        } else {
          navigate(0);
          return toast.success("La fecha conmemorativa se elimino exitosamente!");
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  const btnCancel = () => {
    setMessage({ title: "", text: "", isActive: !message.isActive })
  };

  const handlerInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const seletedHandler = async (e) => {
    // setFormData({ image: (await getBase64(e.target.files[0])) });
    setFormData({
      title: formData.title,
      description: formData.description,
      image: (await getBase64(e.target.files[0])),
      author: formData.author,
      date: formData.date,
      tags: formData.tags,
      action: formData.action
    })
  };

  const refInput = useRef();

  const refBtnImg = useRef();

  const inputDate = () => {
    refInput.current.type = "date";
  };

  const inputText = () => {
    refInput.current.type = "text";
  };

  const changeImg = () => {
    refBtnImg.current.click();
  }

  const removeImg = () => {
    refBtnImg.current.value = "";
    setFormData({
      title: formData.title,
      description: formData.description,
      image: "",
      author: formData.author,
      date: formData.date,
      tags: formData.tags,
      action: formData.action
    })
    // setFormData({ image: "" })
  };

  const EditToggle = (item) => {
    // const state = Object.assign({ item }, { img });
    // console.log(item);
    setData(item);
    setEditorState(EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(item?.description)
      ),
    ),)
    setEditModal(!editModal);
    setFormData({
      title: item?.title,
      description: item?.description,
      image: item?.image,
      author: item?.author,
      date: item?.createdAt,
      tags: item?.tags,
      action: "commemorative"
    });
  };

  const sendHandlerForm = () => {

    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());

    updatePost(data?.postId, formData.title === "" || formData.title === undefined ? data?.title : formData.title
      , currentContentAsHTML === "<p></p>" ? data?.description : currentContentAsHTML
      , formData.author === "" || formData.author === undefined ? data?.author : formData.author
      , formData.image === "" || formData.image === undefined ? data?.image : formData.image
      , formData.date === "" || formData.date === undefined ? data?.date : formData.date
      , formData.tags === "" || formData.tags === undefined ? data?.tags : formData.tags)
      .then((res) => {
        if (res.status !== 200) {
          return toast.error("Error al intentar actualizar");
        } else {
          setFormData({
            title: "",
            description: "",
            image: "",
            author: "",
            date: "",
            tags: "",
            action: ""
          });
          setEditorState(EditorState.createEmpty());
          setModalActive(false);
          navigate(0);
          return toast.success("Se realizo la actualizo exitosamente!");
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  }


  /// EDIT AND REMOVE
  const messageToggleActivity = (item) => {
    setData(item);
    setIsEvent(true);
    setMessage({ title: "ELIMINAR EVENTO", text: "Seguro que desea eliminar este evento?", isActive: !message.isActive })
  };

  const btnConfirmmActivity = () => {
    disabledEvent(data.eventId)
      .then((res) => {
        if (res.status !== 200) {
          return toast.error("Error al intentar eliminar el evento");
        } else {
          navigate(0);
          return toast.success("El evento se elimino exitosamente!");
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  const btnCancelActivity = () => {
    setMessage({ title: "", text: "", isActive: !message.isActive })
  };

  return (
    <>
      <Message
        message={message}
        btnConfirmm={isEvent ? btnConfirmmActivity : btnConfirmm}
        btnCancel={isEvent ? btnCancelActivity : btnCancel}
      />

      {/* <Viewer
        visible={visible}
        images={arrayImg}
        onClose={() => {
          setVisible(false);
        }}
        zoomSpeed={0.2}
        // activeIndex={activeIndex}
        downloadable
      /> */}

      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#113250" loading={loading} size={150} />
        </div>
      ) : (
        <ImageViewer
          visible={visible}
          setVisible={setVisible}
          arrayImg={arrayImg}
          galleryName={galleryName}
          length={arrayImg.length - 1}
        />
      )}

      <DashboardPopup modalToggle={modalToggle} modalActive={modalActive} modalData={modalData} />

      <EditCardModal
        modalToggle={EditToggle}
        modalActive={editModal}
        setModalActive={setEditModal}
        setEditorState={setEditorState}
        editorState={editorState}
        refInput={refInput}
        inputDate={inputDate}
        inputText={inputText}
        handlerInputChange={handlerInputChange}
        formData={formData}
        sendHandlerForm={sendHandlerForm}
        refBtnImg={refBtnImg}
        changeImg={changeImg}
        removeImg={removeImg}
        seletedHandler={seletedHandler}
      />

      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#113250" loading={loading} size={150} />
        </div>
      ) : (
        <DashboardForm
          // ad={ad}
          news={news}
          birthday={birthday}
          events={events}
          eventDate={eventDate}
          multimedia={multimedia}
          multimediaMain={multimediaMain}
          goToPost={goToPost}
          goToProfile={goToProfile}
          employeeTree={employeeTree}
          arrayCarousel={arrayCarousel}
          modalToggle={modalToggle}
          getImagesHandler={getImagesHandler}
          notices={notices}
          // tweets={tweets}
          instagram={instagram}
          quiz={quiz}
          HandlerAnswer={HandlerAnswer}
          exists={exists}
          ansowerCount={ansowerCount}
          selectedCaledary={selectedCaledary}
          setSelectedCaledary={setSelectedCaledary}
          commemorative={commemorative}
          contextState={contextState}
          EditToggle={EditToggle}
          messageToggle={messageToggle}
          messageToggleActivity={messageToggleActivity}
        />
      )}
    </>
  );
};

export default Dashboard;
