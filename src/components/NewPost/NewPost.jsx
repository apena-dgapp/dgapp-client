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
  const [namePdf, setNamePdf] = useState("");
  const [nameImg, setNameImg] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    views: 0,
    isActive: true,
    video: "",
  });
  const modalToggleAceppt = () => {
    if (formData.video) {
      setModalActive(!modalActive);
    } else {
      return toast.error("Por favor de agregar el enlace del video");
    }
  };
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
    if (actionInput === "imagenes") {
      setNameImg(...nameImg, files);
    }
    if (actionInput === "pdf") {
      setNamePdf(...namePdf, files);
    }
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
    if (!formData.category) {
      return toast.error("Por favor agregar un categoria");
    } else if (!formData.title) {
      return toast.error("Por favor agregar un titulo");
    } else if (!formData.author) {
      return toast.error("Por favor agregar un autor");
    } else if (!editor_content) {
      return toast.error("Por favor agregar una descripcion");
    } else if (!img) {
      return toast.error("Por favor agregar una imagen de portada");
    }
    newPostApi(
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
        return res.json();
      })
      .then((res) => {
        console.log(res.status);

        postId(formData.title, formData.category, formData.author)
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            const id = res.post.postId;
            const newArrayImg = uploadFiles.imagenes;
            const newArrayPdf = uploadFiles.pdf;
            if (newArrayImg) {
              if (Array.isArray(newArrayImg)) {
                for (let i = 0; i < newArrayImg.length; i++) {
                  const typeSplit = newArrayImg[i].split(";");
                  const type = typeSplit[0].split("/");

                  createFile(
                    id,
                    nameImg[i].name,
                    type[1],
                    newArrayImg[i],
                    nameImg[i].size
                  ).then((res) => {
                    console.log(res.status);
                  });
                }
              } else {
                const typeSplit = newArrayImg.split(";");
                const type = typeSplit[0].split("/");

                createFile(
                  id,
                  nameImg[0].name,
                  type[1],
                  newArrayImg,
                  nameImg[0].size
                ).then((res) => {
                  console.log(res.status);
                });
              }
            }

            if (newArrayPdf) {
              if (Array.isArray(newArrayPdf)) {
                for (let x = 0; x < newArrayPdf.length; x++) {
                  const typeSplit = newArrayPdf[x].split(";");
                  const type = typeSplit[0].split("/");
                  createFile(
                    id,
                    namePdf[x].name,
                    type[1],
                    newArrayPdf[x],
                    namePdf[x].size
                  ).then((res) => {
                    console.log(res.status);
                  });
                }
              } else {
                const typeSplitPdf = newArrayPdf.split(";");
                const typePdf = typeSplitPdf[0].split("/");

                createFile(
                  id,
                  namePdf[0].name,
                  typePdf[1],
                  newArrayPdf,
                  namePdf[0].size
                ).then((res) => {
                  console.log(res.status);
                });
              }
            }

            if (formData.video) {
              createFile(id, "", "URL", formData.video).then((res) => {
                console.log(res.status);
              });
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
      video: "",
    });
    setImg("");
    setAccept("");
    setActionInput("");
    setQtyImg("");
    setQtyPdf("");
    setNameImg("");
    setNamePdf("");
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
        modalToggleAceppt={modalToggleAceppt}
      />
    </>
  );
};

export default NewPost;
