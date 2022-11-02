import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import DashboardForm from "./DashboardForm";
import { getPost, interestPost } from "../../api/post";

const Dashboard = () => {
  const history = useHistory();

  const [arrayPost, setArrayPost] = useState([]);
  const [interest, setInterest] = useState("");

  useEffect(() => {
    let unmounted = false;

    getPost("Featured Post")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayPost((arrayPost) => [...arrayPost, ...res.posts]);
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

    interestPost()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setInterest(res.post);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  const singleInsterest = () => {
    const interestNewObj = {
      id: interest.postId,
      title: interest.title,
      img: interest.image,
      description: interest.description,
      date: interest.createdAt,
      author: interest.author,
    };

    history.push({
      pathname: "./contenido",
      state: interestNewObj,
    });
  };

  const allPost = () => {
    history.push("./noticias");
  };

  return (
    <>
      <DashboardForm
        arrayPost={arrayPost}
        interest={interest}
        singleInsterest={singleInsterest}
        allPost={allPost}
      />
    </>
  );
};

export default Dashboard;
