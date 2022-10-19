import React, { useState, useEffect, useContext } from "react";
import SiglePostForm from "./SiglePostForm";
import { getFiles, getVideo, addCommentPost, getComments } from "../../api/post";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";
import GlobalContext from "../../context/GlobalContext";
// import { getOnePerson } from "../../api/person";

const SinglePost = (state) => {
  const [contextState] = useContext(GlobalContext);
  const [visible, setVisible] = useState(false);
  const [arrayImg, setArrayImg] = useState("");
  const [video, setVideo] = useState("");
  const [loading, seLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const dataPost = state.location.state;
  // const [person, setPerson] = useState();

  // const [person, setPerson] = useState({
  //   personId: "",
  //   fullName: "",
  //   position: "",
  //   photo: "",
  // });

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

    // if (contextState.personId) {
    //   getOnePerson(contextState.personId)
    //     .then((res) => {
    //       return res.json();
    //     })
    //     .then((res) => {
    //       if (!unmounted) {
    //         setPerson({
    //           personId: res.personId,
    //           fullName:
    //             res.firstName.split(" ", 1) + " " + res.lastName.split(" ", 1),
    //           position: res.position,
    //           birthday: res.birthday,
    //           photo: res.photo,
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err.status);
    //     });
    // }

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
          // console.log(res)
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
    addCommentPost(dataPost.id,contextState.personId, comment)
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

      // const getPerson = (id)=>{
      //   getOnePerson(id)
      //   .then((res) => {
      //     return res.json();
      //   })
      //   .then((res) => {
      //     setPerson(res)
      //   })

      // }
       
      // console.log(person)

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
