import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import SiglePostForm from "./SiglePostForm";
import { getFiles, getVideo } from "../../api/post";

const SinglePost = (state) => {
  const [contextState] = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);
  const [arrayImg, setArrayImg] = useState("");
  const dataPost = state.location.state;
  const [video, setVideo] = useState("");

  const viewShow = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getFiles(contextState.token, dataPost.id)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error al hacer el fetch");
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
        // console.log(res);
        setArrayImg(res);
        // alert("el nuevo post se creo exitosamente");
      })
      .catch((err) => {
        console.error(err.status);
      });

    getVideo(contextState.token, dataPost.id)
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error al hacer el fetch");
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
        // console.log(res);
        setVideo(res);
        // alert("el nuevo post se creo exitosamente");
      })
      .catch((err) => {
        console.error(err.status);
      });
  }, [contextState.token, dataPost.id]);

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
