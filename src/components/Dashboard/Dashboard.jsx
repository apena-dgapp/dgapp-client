import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import DashboardForm from "./DashboardForm";
import { getPost, interestPost } from "../../api/post";
import GlobalContext from "../../context/GlobalContext";
import socket from "../../utils/socket";

const Dashboard = () => {
  const history = useHistory();

  const [arrayPost, setArrayPost] = useState([]);
  const [interest, setInterest] = useState("");
  const [contextState, , contextMiddleware] = useContext(GlobalContext);

  useEffect(() => {
    socket.on("active-users", (users) => {
      console.log(users);
    });
  }, []);

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      if (contextState.personId)
        socket.emit("user", { id: contextState.personId });
    }

    getPost("Featured Post")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        contextMiddleware.showSpinner(true);
        if (!unmounted) {
          setArrayPost((arrayPost) => [...arrayPost, ...res.posts]);
        }
        contextMiddleware.showSpinner(false);
      })
      .catch((err) => {
        console.error(err.status);
        contextMiddleware.showSpinner(false);
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
        contextMiddleware.showSpinner(false);
      })
      .catch((err) => {
        contextMiddleware.showSpinner(false);
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
