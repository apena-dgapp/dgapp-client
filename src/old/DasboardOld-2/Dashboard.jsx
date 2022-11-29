import React, { useEffect, useState } from "react";
import DashboardForm from "./DashboardForm";
import { getPost, getPostMultimedia } from "../../api/post";
import { getBirthday } from "../../api/person";
import { getEvents } from "../../api/events";
import { viewUpdate } from "../../api/post";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Dashboard = () => {
  const [loading, seLoading] = useState(false);
  const navigate = useNavigate();
  const [ad, setAd] = useState([]);
  const [news, setNews] = useState([]);
  const [birthday, setBirthday] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState([]);
  const [multimedia, setMultimedia] = useState();

  useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      seLoading(true);
    }
    setTimeout(() => {
      if (!unmounted) {
        seLoading(false);
      }
    }, 1500);
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;

    getPost("Aviso", 3)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setAd(res.posts);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    getPost("Noticia", 2)
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

    getPostMultimedia("Multimedia", 1)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          // setMultimedia(res[0]);
          res.map((item, index) => {
            return setMultimedia({
              title: item.title,
              url: item.FilesPosts[index].file,
            });
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

  const goToPost = (item) => {
    viewUpdate(item.postId)
      .then((res) => {
        navigate("/contenido", {
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

  const goToProfile = (id) => {
    navigate("/perfil", {
      state: id,
    });
  };
  const employeeTree = () => {
    navigate("/organigrama");
  };
  const employeedirectory = () => {
    navigate("/directorio");
  };

  const allPost = () => {
    navigate("/publicaciones/noticias");
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#113250" loading={loading} size={150} />
        </div>
      ) : (
        <DashboardForm
          ad={ad}
          news={news}
          birthday={birthday}
          events={events}
          eventDate={eventDate}
          multimedia={multimedia}
          goToPost={goToPost}
          goToProfile={goToProfile}
          employeeTree={employeeTree}
          employeedirectory={employeedirectory}
          allPost={allPost}
        />
      )}
    </>
  );
};

export default Dashboard;
