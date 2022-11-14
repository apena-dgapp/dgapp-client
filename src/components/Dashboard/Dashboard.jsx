import React, { useEffect, useState } from "react";
import DashboardForm from "./DashboardForm";
import { getPost, getDataCarousel, getPostMultimedia,getPostMultimediaMain } from "../../api/post";
import { getBirthday } from "../../api/person";
import { getEvents } from "../../api/events";
import { viewUpdate } from "../../api/post";
import { useNavigate } from "react-router-dom";  
import ClipLoader from "react-spinners/ClipLoader";

const Dashboard = () => {
  const [loading, seLoading] = useState(false);
  const navigate = useNavigate();
  // const [ad, setAd] = useState([]);
  const [news, setNews] = useState([]);
  const [birthday, setBirthday] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState([]);
  const [multimedia, setMultimedia] = useState([]);
  const [multimediaMain, setMultimediaMain] = useState();
  const [arrayCarousel, setArrayCarousel] = useState([]);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      seLoading(true);
    }

    getDataCarousel("Portada Principal", 3)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayCarousel(res.posts);
          setTimeout(() => {
            if (arrayCarousel) {
              seLoading(false);
            }
          }, 1000);
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

    // getPost("Anuncio", 3)
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     if (!unmounted) {
    //       setAd(res.posts);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err.status);
    //   });

    getPost("Noticia", 3)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setNews(res.posts);
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
              title: item.title,
              url: item.FilesPosts[index].file,
            });
          });
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
    
       getPostMultimedia("Multimedia", 4)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (!unmounted) {
            setMultimedia(res);
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
  
  const goToPost = (item) => {
    // console.log(item)
    viewUpdate(item.postId)
      .then((res) => {
        navigate(`/${item.category.toLowerCase()}/${item.title.toLowerCase()}`,{
          state: {
            id: item.postId,
            title: item.title,
            img: item.image,
            description: item.description,
            date: item.createdAt,
            author: item.author,
          },
        });
      })
      .catch((err) => {
        console.error(err.status);
        return;
      });
  };

  const goToProfile = (props) => {
    navigate(`/perfil/${props.name}`,{
      state: props.id,
    });
  };
  const employeeTree = () => {
    navigate("/organigrama");
  };
  const employeedirectory = () => {
    navigate("/directorio");
  };

  const allPost = () => {
    navigate("/noticias",{
      state:{
        category: "Noticia"
      }
    });  
  };

  const inConstruction = () => {
    navigate("/construccion");
  };

  // useEffect(() => {
  //   let unmounted = false;
  //   if (!unmounted) {
  //     seLoading(true);
  //   }
  //   setTimeout(() => {
  //     if (!unmounted) {
  //       seLoading(false);
  //     }
  //   }, 3500);
  //   return () => {
  //     unmounted = true;
  //   };
  // }, [arrayCarousel]);

  return (
    <>
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
          employeedirectory={employeedirectory}
          allPost={allPost}
          arrayCarousel={arrayCarousel}
          inConstruction={inConstruction}
        />
      )}
    </>
  );
};

export default Dashboard;
