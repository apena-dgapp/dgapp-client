import React, { useState, useContext } from "react";
import GlobalContext from "../../context/GlobalContext";
import NewPostForm from "./NewPostForm";
import { newPostApi, postId, createFile } from "../../api/post";
import { blobToBase64, getBase64 } from "../../utils/blobManager";
import toast from "react-hot-toast";

const NewPost = () => {
  const [contextState] = useContext(GlobalContext);
  const [modalActive, setModalActive] = useState(false);

  const [img, setImg] = useState("");
  const [actionInput, setActionInput] = useState("");
  const [accept, setAccept] = useState("");
  const [qtyImg, setQtyImg] = useState("");
  const [qtyPdf, setQtyPdf] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    views: 0,
    isActive: true,
  });
  const modalToggle = () => {
    setModalActive(!modalActive);
  };
  const modalToggleCancel = () => {
    setModalActive(!modalActive);
    setFormData({
      video: "",
    });
  };
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const [uploadFiles, setUploadFiles] = useState({
    imagenes: "",
    pdf: "",
    video: "",
  });

  const handlerInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const seletedHandler = async (e) => {
    setImg(await getBase64(e.target.files[0]));
  };
  const msgDisabled = () => {
    return toast.error(
      "Lo sentimos por el momento esta opción esta deshabilita. Estamos trabajando en ello."
    );
  };

  const handleruploadFiles = async (e) => {
    const { name, files } = e.target;

    if (files.length > 1) {
      setUploadFiles({
        ...uploadFiles,
        [name]: await blobToBase64(files),
      });
    } else {
      setUploadFiles({
        ...uploadFiles,
        [name]: await getBase64(files[0]),
      });
    }

    if (actionInput === "imagenes" && files.length > 1) {
      setQtyImg(files.length);
    } else if (actionInput === "imagenes" && files.length === 1) {
      setQtyImg(1);
    }

    if (actionInput === "pdf") {
      setQtyPdf(files.length);
    }
  };

  const actionHandler = (e) => {
    setActionInput(e.target.name);
    setAccept(e.target.alt);
  };

  const removeCover = () => {
    setImg("");
    document.getElementById("fileinput").value = "";
  };

  const removeGalery = () => {
    setUploadFiles({
      imagenes: "",
    });
    setQtyImg("");
    document.getElementById("fileinput").value = "";
  };

  const removePdf = () => {
    setUploadFiles({
      pdf: "",
    });
    setQtyPdf("");
    document.getElementById("fileinput").value = "";
  };

  const removeVideo = () => {
    setFormData({
      video: "",
    });
  };

  const sendHandlerForm = async (editor_content) => {
    console.log(formData);
    if (!formData.category) {
      alert("Por favor agregar un categoria");
      return;
    } else if (!formData.title) {
      alert("Por favor agregar un titulo");
      return;
    } else if (!formData.author) {
      alert("Por favor agregar un autor");
      return;
    } else if (!editor_content) {
      alert("Por favor agregar una descripcion");
      return;
    } else if (!img) {
      alert("Por favor agregar una imagen de portada");
      return;
    }
    newPostApi(
      contextState.token,
      formData.title,
      editor_content,
      formData.category,
      formData.author,
      img,
      formData.views,
      formData.isActive,
      contextState.userName,
      ""
    )
      .then((res) => {
        if (res.status >= 400) throw new alert.err("error al hacer el fetch");
        return res.json();
      })
      .then((res) => {
        console.log(res.status);
        if (
          uploadFiles.imagenes !== "" ||
          uploadFiles.pdf !== "" ||
          uploadFiles.video !== ""
        ) {
          postId(
            contextState.token,
            formData.title,
            formData.category,
            formData.author
          )
            .then((res) => {
              if (res.status >= 400)
                throw new alert.err("error al hacer el fetch");
              return res.json();
            })
            .then((res) => {
              const id = res.post.postId;
              for (let i = 0; i < uploadFiles.imagenes.length; i++) {
                const typeSplit = uploadFiles.imagenes[i].split(";");
                const type = typeSplit[0].split("/");

                createFile(
                  contextState.token,
                  id,
                  type[1],
                  uploadFiles.imagenes[i]
                ).then((res) => {
                  console.log(res.status);
                });
              }

              if (formData.video) {
                createFile(contextState.token, id, "URL", formData.video).then(
                  (res) => {
                    console.log(res.status);
                  }
                );
              }
              // toast.dismiss(loadingId);
              toast.success("Publicacion guardada exitosamente!");
              scrollToTop();
              // setTimeout(function () {
              //   window.location.reload(true);
              // }, 1100);
            })
            .catch((err) => {
              // toast.dismiss(loadingId);
              console.error(err.status);
              toast.error("Error al intentar guardar la publicacion!");
            });
        } else {
          // toast.dismiss(loadingId);
          toast.success("Publicacion guardada exitosamente!");
          scrollToTop();
          // setTimeout(function () {
          //   window.location.reload(true);
          // }, 1100);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    setFormData({
      title: "",
      description: "",
      category: "",
      author: "",
      views: 0,
      isActive: true,
    });
    setImg("");
    setAccept("");
    setActionInput("");
    setQtyImg("");
    setQtyPdf("");
    setUploadFiles({
      imagenes: "",
      pdf: "",
      video: "",
    });
  };

  return (
    <>
      <NewPostForm
        // seletedHandler={seletedHandler}
        sendHandlerForm={sendHandlerForm}
        handlerInputChange={handlerInputChange}
        formData={formData}
        setFormData={setFormData}
        actionHandler={actionHandler}
        actionInput={actionInput}
        accept={accept}
        handleruploadFiles={handleruploadFiles}
        seletedHandler={seletedHandler}
        msgDisable={msgDisabled}
        img={img}
        qtyImg={qtyImg}
        qtyPdf={qtyPdf}
        removeCover={removeCover}
        removeGalery={removeGalery}
        removePdf={removePdf}
        removeVideo={removeVideo}
        modalActive={modalActive}
        modalToggle={modalToggle}
        modalToggleCancel={modalToggleCancel}
      />
    </>
  );
};

export default NewPost;
