import React, { useEffect, useState } from "react";
import DashboardForm from "./DashboardForm";
import { getPost, getDataCarousel, getPostMultimedia, getPostMultimediaMain, expirationNoticies } from "../../api/post";
import { incrementClick } from '../../api/tags';
import { getNews } from '../../api/news';
import { getFiles } from "../../api/post";
import { getBirthday } from "../../api/person";
import { getEvents } from "../../api/events";
import { viewUpdate } from "../../api/post";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import DashboardPopup from "./DashboardPopup";
import Viewer from "react-viewer";
// import { getTweets } from "../../api/tweets";
// import { TwitterApi } from 'twitter-api-v2';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [birthday, setBirthday] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState([]);
  const [multimedia, setMultimedia] = useState([]);
  const [multimediaMain, setMultimediaMain] = useState();
  const [arrayCarousel, setArrayCarousel] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [modalData, setModalData] = useState("");
  const [visible, setVisible] = useState(false);
  const [arrayImg, setArrayImg] = useState("");
  const [notices, setNotices] = useState([]);
  // const [tweets, setTweets] = useState([]);
  const [instagram, setInstagram] = useState([]);

  const modalToggle = (data) => {
    setModalActive(!modalActive);
    setModalData(data)
  };

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
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;

    getNews("0", 3)
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
          setBirthday(res);
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

  const getImagesHandler = (id) => {
    getFiles(id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArrayImg(res);
        setVisible(true);
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  return (
    <>
      <Viewer
        visible={visible}
        images={arrayImg.files}
        onClose={() => {
          setVisible(false);
        }}
        zoomSpeed={0.2}
        // activeIndex={activeIndex}
        downloadable
      />
      <DashboardPopup modalToggle={modalToggle} modalActive={modalActive} modalData={modalData} />
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
        />
      )}
    </>
  );
};

export default Dashboard;
