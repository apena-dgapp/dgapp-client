import React, { useState, useRef, useEffect } from "react";
import NewPostForm from "./NewPostForm";
import { newPostApi, postId, createFile } from "../../api/post";
import { blobToBase64, getBase64 } from "../../utils/blobManager";
import toast from "react-hot-toast";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { useLocation } from "react-router-dom";
import { TagsInput } from "react-tag-input-component";
import { MultiSelect } from "react-multi-select-component";
import { newTags, getTags } from "../../api/tags";
// import { set } from "immutable";

const NewPost = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const location = useLocation();
  const state = location.state;
  const [modalActive, setModalActive] = useState(false);
  const [captionActive, setCaptionActive] = useState(false);
  const [img, setImg] = useState("");
  const [actionInput, setActionInput] = useState("");
  const [accept, setAccept] = useState("");
  const [qtyImg, setQtyImg] = useState("");
  const [qtyPdf, setQtyPdf] = useState("");
  const [namePdf, setNamePdf] = useState("");
  const [nameImg, setNameImg] = useState("");
  const [selected, setSelected] = useState([]);
  const [tags, setTags] = useState([]);
  const [caption, setCaption] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    author: "",
    views: 0,
    isActive: true,
    video: "",
    date: "",
    expiration: "",
    link: ""
  });

  const refInput = useRef();

  const inputDate = () => {
    refInput.current.type = "date";
  };

  const inputText = () => {
    refInput.current.type = "text";
  };

  const refExpiration = useRef();

  const expirationDate = () => {
    refExpiration.current.type = "date";
  };

  const expirationText = () => {
    refExpiration.current.type = "text";
  };

  const options = [
    {
      id: "1",
      value: "Portada Principal",
    },
    {
      id: "2",
      value: "Noticia",
    },
    {
      id: "3",
      value: "Aviso",
    },
    {
      id: "4",
      value: "EducAPP",
    },
    {
      id: "5",
      value: "Foto del Día",
    },
    {
      id: "6",
      value: "Valor del Mes",
    },
    {
      id: "7",
      value: "Multimedia",
    },
    {
      id: "8",
      value: "Otras Noticias",
    },
    {
      id: "9",
      value: "Fechas Conmemorativas",
    }
  ];

  useEffect(() => {
    let unmounted = false;

    getTags()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          if (state?.fullName !== "Yelissa Díaz") {
            setTagsList(res)
          } else {
            setSelected(res.map(function (item) {
              return item['value'];
            }));

            setTags(res.map(function (item) {
              return item['value'];
            }));
          }

        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [state]);

  const reloadTags = () => {
    getTags()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (state?.fullName !== "Yelissa Díaz") {
          setTagsList(res)
        } else {
          setSelected(res.map(function (item) {
            return item['value'];
          }));

          setTags(res.map(function (item) {
            return item['value'];
          }));
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  const [uploadFiles, setUploadFiles] = useState({
    imagenes: [],
    pdf: "",
    video: ""
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
    setActionInput("video");
  };

  const modalToggleCancel = () => {
    setModalActive(!modalActive);
    setFormData({ ...formData, video: "" });
    setActionInput("");
  };
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
      "Lo sentimos, por el momento esta opción está deshabilita. Estamos trabajando en ello."
    );
  };

  const handleruploadFiles = async (e) => {
    const { name, files } = e.target;

    for (var key in files) {
      var obj = files[key];

      if (obj.size?.toString().length > 7 && obj.size?.toString().split('')[0] > 1) {
        return toast.error("Error Las fotos no puede exceder los 2.5MB");
      }
    }

    if (actionInput === "imagenes") {
      setNameImg(...nameImg, files);
    }

    if (actionInput === "pdf") {
      setNamePdf(...namePdf, files);
    }

    if (files.length > 1) {
      setUploadFiles({
        ...uploadFiles,
        [name]: await blobToBase64(files)
      });
    } else {
      setUploadFiles({
        ...uploadFiles,
        [name]: [await getBase64(files[0])],
      });
    }

    if (actionInput === "imagenes" && files.length > 1) {
      setQtyImg(files.length);
      setCaptionActive(true);
    } else if (actionInput === "imagenes" && files.length === 1) {
      setQtyImg(1);
      setCaptionActive(true);
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
    setCaption([]);
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
    setFormData({ ...formData, video: "" });
    setActionInput("");
  };

  const captionToggle = () => {
    setCaptionActive(!captionActive);
  };

  const sendHandlerForm = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());

    if (!formData.category) {
      return toast.error("Por favor agregar un categoría");
    } else if ((!formData.title && formData.category === "Portada Principal")
      || (!formData.title && formData.category === "Noticia")
      || (!formData.title && formData.category === "EducAPP")
      || (!formData.title && formData.category === "Foto del Día")
      || (!formData.title && formData.category === "Multimedia")
      || (!formData.title && formData.category === "Otras Noticias")
      || (!formData.title && formData.category === "Fechas Conmemorativas")
    ) {
      return toast.error("Por favor agregar un título");
      // } else if (!formData.author) {
      //   return toast.error("Por favor agregar un autor");
    } else if (!formData.date && formData.category !== "Otras Noticias") {
      return toast.error("Por favor agregar una fecha");
    } else if (!formData.expiration && formData.category === "Aviso") {
      return toast.error("Por favor agregar una fecha de expiración");
    } else if (currentContentAsHTML === "<p></p>" && formData.category === "Noticia") {
      return toast.error("Por favor agregar una descripción");
    } else if (currentContentAsHTML === "<p></p>" && formData.category === "Aviso") {
      return toast.error("Por favor agregar una descripción");
    } else if (currentContentAsHTML.length > 150 && formData.category === "Aviso") {
      return toast.error("El máximo de caracteres permitidos es de 150");
      // } else if (currentContentAsHTML === "<p></p>" && formData.category === "Multimedia") {
      //   return toast.error("Por favor agregar una descripción");
    } else if (!img && formData.category === "Portada Principal") {
      return toast.error("Por favor agregar una imagen de portada");
    } else if (!img && formData.category === "Noticia") {
      return toast.error("Por favor agregar una imagen de portada");
    } else if (!img && formData.category === "EducAPP") {
      return toast.error("Por favor agregar una imagen de portada");
    } else if (!img && formData.category === "Foto del Día") {
      return toast.error("Por favor agregar una imagen de portada");
    } else if (!img && formData.category === "Valor del Mes") {
      return toast.error("Por favor agregar una imagen de portada");
    } else if (!actionInput && formData.category === "Multimedia") {
      return toast.error("Por favor agregar fotos o Video");
    } else if (actionInput === "imagenes" && formData.category === "Multimedia" && !uploadFiles.imagenes) {
      return toast.error("Por favor agregar fotos o Video");
    }

    newPostApi(
      formData.title,
      formData.category === "Multimedia" ? actionInput : currentContentAsHTML,
      formData.category,
      formData.author,
      img,
      formData.views,
      formData.isActive,
      state?.fullName,
      formData.date,
      formData.expiration ? formData.expiration : null,
      formData.category === "Noticia" || formData.category === "Multimedia" ? selected.toString() : "",
      // formData.category === "Noticia" || formData.category === "Multimedia" ? state?.fullName === "Yelissa Díaz" ? selected : selected.map(function (item) {
      //   return item['value'];
      // }) : [],
      formData.link,
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
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
                    nameImg[i].size,
                    caption[i]
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
                  nameImg[0].size,
                  caption[0]
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

            if (state?.fullName === "Yelissa Díaz") {
              var final = selected.filter(function (item) {
                return !tags.includes(item.split('.')[0]);
              })

              final.map((item) => {
                return (newTags(item, state?.fullName))
              })
            }
          })
          .catch((err) => {
            // toast.dismiss(loadingId);
            console.error(err.status);
            toast.error("Error al intentar guardar la publicación!");
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
      date: "",
      expiration: "",
      link: ""
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

    setEditorState(EditorState.createEmpty());

    setTagsList([]);
    setSelected([]);
    setTags([]);
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
        setEditorState={setEditorState}
        editorState={editorState}
        options={options}
        refInput={refInput}
        inputDate={inputDate}
        inputText={inputText}
        refExpiration={refExpiration}
        expirationDate={expirationDate}
        expirationText={expirationText}
        TagsInput={TagsInput}
        selected={selected}
        setSelected={setSelected}
        user={state?.fullName}
        MultiSelect={MultiSelect}
        tagsList={tagsList}
        reloadTags={reloadTags}
        captionToggle={captionToggle}
        captionActive={captionActive}
        uploadFiles={uploadFiles}
        caption={caption}
        setCaption={setCaption}
      />
    </>
  );
};

export default NewPost;
