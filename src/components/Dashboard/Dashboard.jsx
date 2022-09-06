import React, { useEffect, useState } from "react";
import DashboardForm from "./DashboardForm";
import { getPost, getPostMultimedia } from "../../api/post";
import { getBirthday } from "../../api/person";
import { getEvents } from "../../api/events";

const Dashboard = () => {
  const [ad, setAd] = useState([]);
  const [news, setNews] = useState([]);
  const [birthday, setBirthday] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState([]);
  const [multimedia, setMultimedia] = useState();

  useEffect(() => {
    let unmounted = false;

    getPost("Anuncio", 3)
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

  // if (events > 0) {
  //   for (let i = 0; i < events.length; i++) {
  //     eventDate += events.from[i];
  //   }
  // }

  return (
    <>
      <DashboardForm
        ad={ad}
        news={news}
        birthday={birthday}
        events={events}
        eventDate={eventDate}
        multimedia={multimedia}
      />
    </>
  );
};

export default Dashboard;
