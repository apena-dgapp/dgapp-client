import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import DashboardForm from "./DashboardForm";
import { getPost, interestPost } from "../../api/post";

const Dashboard = () => {
  const [contextState] = useContext(GlobalContext);
  const history = useHistory();

  const [arrayPost, setArrayPost] = useState([]);
  const [interest, setInterest] = useState("");

  useEffect(() => {
    let unmounted = false;

    getPost(contextState.token, "Featured Post")
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error usuario incorrecto");
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
  }, [contextState.token]);

  useEffect(() => {
    let unmounted = false;

    interestPost(contextState.token)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error usuario incorrecto");
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
  }, [contextState.token]);

  const singleInsterest = () => {
    const interestNewObj = {
      id: interest.postId,
      title: interest.title,
      img: interest.image,
      description: interest.description,
      date: interest.createdAt,
    };

    history.push({
      pathname: "./siglepost",
      state: interestNewObj,
    });
  };

  const allPost = () => {
    history.push("./allpost");
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
