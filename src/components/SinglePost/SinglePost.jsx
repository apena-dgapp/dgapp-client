import React, { useState, useEffect, useContext } from "react";
import SiglePostForm from "./SiglePostForm";
import { getFiles, getVideo, addCommentPost, getComments } from "../../api/post";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import GlobalContext from "../../context/GlobalContext";
import { useLocation } from "react-router-dom";
// import { getOnePerson } from "../../api/person";

const SinglePost = () => {
  const [contextState] = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);
  const [arrayImg, setArrayImg] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const dataPost = location.state;

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      setLoading(true);
    }
    setTimeout(() => {
      if (!unmounted) {
        setLoading(false);
      }
    }, 1500);
    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;

    getFiles(dataPost.id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayImg(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    getComments(dataPost.id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setComments(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    getVideo(dataPost.id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setVideo(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [dataPost.id, contextState.personId]);

  const viewShow = () => {
    setVisible(!visible);
  };

  const handlerTextareaChange = (e) => {
    setComment(e.target.value || "");
  };

  const sendComment = () => {
    if (!comment) {
      return toast.error("Antes de enviar debes agregar un comentario");
    }
    addCommentPost(dataPost.id, contextState.personId, comment)
      .then((res) => {
        if (res.status !== 500) {
          setComment("");
          getComments(dataPost.id)
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              setComments(res);
            })
            .catch((err) => {
              console.error(err.status);
            });
          return toast.success("Su mensaje fue enviado exitosamente!");
        } else {
          return toast.error("Error del servidor");
        }
      })
      .catch((err) => {
        console.error(err.status);
        return toast.error("Error del servidor");
      });
  };

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#113250" loading={loading} size={150} />
        </div>
      ) : (
        <SiglePostForm
          dataPost={dataPost}
          viewShow={viewShow}
          visible={visible}
          arrayImg={arrayImg}
          video={video}
          handlerTextareaChange={handlerTextareaChange}
          sendComment={sendComment}
          comment={comment}
          comments={comments}
        />
      )}
    </>
  );
};

export default SinglePost;
