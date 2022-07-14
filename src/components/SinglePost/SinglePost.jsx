import React, { useState, useEffect } from "react";
import SiglePostForm from "./SiglePostForm";
import { getFiles, getVideo } from "../../api/post";

const SinglePost = (state) => {
  const [visible, setVisible] = useState(false);
  const [arrayImg, setArrayImg] = useState("");
  const dataPost = state.location.state;
  const [video, setVideo] = useState("");

  const viewShow = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getFiles(dataPost.id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setArrayImg(res);
      })
      .catch((err) => {
        console.error(err.status);
      });

    getVideo(dataPost.id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setVideo(res);
      })
      .catch((err) => {
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
