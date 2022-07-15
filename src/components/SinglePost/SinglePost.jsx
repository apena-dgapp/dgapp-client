import React, { useState, useEffect, useContext } from "react";
import SiglePostForm from "./SiglePostForm";
import { getFiles, getVideo } from "../../api/post";
import GlobalContext from "../../context/GlobalContext";

const SinglePost = (state) => {
  const [visible, setVisible] = useState(false);
  const [arrayImg, setArrayImg] = useState("");
  const dataPost = state.location.state;
  const [video, setVideo] = useState("");
  const [, , contextMiddleware] = useContext(GlobalContext);

  const viewShow = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getFiles(dataPost.id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        contextMiddleware.showSpinner(true);
        setArrayImg(res);
        contextMiddleware.showSpinner(false);
      })
      .catch((err) => {
        contextMiddleware.showSpinner(false);
        console.error(err.status);
      });

    getVideo(dataPost.id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setVideo(res);
        contextMiddleware.showSpinner(false);
      })
      .catch((err) => {
        contextMiddleware.showSpinner(false);
        console.error(err.status);
      });
  }, [dataPost.id]);

  return (
    <>
      <SiglePostForm
        dataPost={dataPost}
        viewShow={viewShow}
        visible={visible}
        arrayImg={arrayImg}
        video={video}
      />
    </>
  );
};

export default SinglePost;
