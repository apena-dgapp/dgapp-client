import React, { useEffect, useState } from "react";
import DashboardForm from "./DashboardForm";
import { getPost } from "../../api/post";

const Dashboard = () => {
  const [ad, setAd] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    let unmounted = false;

    getPost("Portada", 3)
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

    return () => {
      unmounted = true;
    };
  }, []);
  return (
    <>
      <DashboardForm ad={ad} news={news} />
    </>
  );
};

export default Dashboard;
