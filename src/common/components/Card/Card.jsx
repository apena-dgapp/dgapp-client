import React, { useState, useEffect, useContext, useRef } from "react";
import { viewUpdate, getImage, updatePost, disabledPost } from "../../../api/post";
import { useNavigate } from "react-router-dom";
import { shortDate } from "../../../utils/shortDate";
import { FiEdit } from "react-icons/fi";
import { CiSquareRemove } from "react-icons/ci";
import GlobalContext from "../../../context/GlobalContext";
import EditCardModal from "./EditCardModal";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { convertToHTML } from "draft-convert";
import toast from "react-hot-toast";
import { getBase64 } from "../../../utils/blobManager";
import Message from "../../Message/Message";

const Card = (props) => {
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  // const [data, setData] = useState("");
  const [contextState] = useContext(GlobalContext);
  const [modalActive, setModalActive] = useState(false);
  const [message, setMessage] = useState({
    title: "",
    text: "",
    isActive: false
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    author: "",
    date: "",
  });

  const [editorState, setEditorState] = useState();

  const id = props.id;

  const handlerInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const seletedHandler = async (e) => {
    setFormData({ image: (await getBase64(e.target.files[0])) });
  };

  const modalToggle = (item, img) => {
    // const state = Object.assign({ item }, { img });
    setEditorState(EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(item?.description)
      ),
    ),)
    // setData(state)
    setModalActive(!modalActive);
    setFormData({
      title: item?.title,
      description: item?.description,
      image: img,
      author: item?.author,
      date: item?.date,
    });
  };

  const messageToggle = () => {
    setMessage({ title: "ELIMINAR PUBLICACIÓN", text: "Seguro que desea eliminar esta publicación?", isActive: !message.isActive })
  };

  const btnConfirmm = () => {
    disabledPost(props.id)
      .then((res) => {
        if (res.status !== 200) {
          return toast.error("Error al intentar eliminar la publicación");
        } else {
          navigate(0);
          return toast.success("La publicación se elimino exitosamente!");
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  const btnCancel = () => {
    setMessage({ title: "", text: "", isActive: !message.isActive })
  };

  const refInput = useRef();

  const refBtnImg = useRef();

  const inputDate = () => {
    refInput.current.type = "date";
  };

  const inputText = () => {
    refInput.current.type = "text";
  };

  const changeImg = () => {
    refBtnImg.current.click();
  }

  const removeImg = () => {
    refBtnImg.current.value = "";
    setFormData({ image: "" })
  };

  useEffect(() => {

    let unmounted = false;

    if (!unmounted) {
      getImage(id)
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setImage(res);
        })
        .catch((err) => {
          console.error(err.status);
        });
    }

    return () => {
      unmounted = true;
    };
  }, [id]);

  const click = () => {
    viewUpdate(props.id)
      .then((res) => {
        navigate(`/noticia/${props.title.toLowerCase()}`, { state: Object.assign({}, props, image) });
      })
      .catch((err) => {
        console.error(err.status);
        return;
      });
  };

  const sendHandlerForm = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());

    updatePost(props.id, formData.title === "" || formData.title === undefined ? props.title : formData.title
      , currentContentAsHTML === "<p></p>" ? props.description : currentContentAsHTML
      , formData.author === "" || formData.author === undefined ? props.author : formData.author
      , formData.image === "" || formData.image === undefined ? image.image : formData.image
      , formData.date === "" || formData.date === undefined ? props.date : formData.date)
      .then((res) => {
        if (res.status !== 200) {
          return toast.error("Error al intentar actualizar");
        } else {
          setFormData({
            title: "",
            description: "",
            image: "",
            author: "",
            date: "",
          });
          setEditorState(EditorState.createEmpty());
          setModalActive(false);
          navigate(0);
          return toast.success("Se realizo la actualizo exitosamente!");
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  return (
    <>
      <EditCardModal
        modalToggle={modalToggle}
        modalActive={modalActive}
        setModalActive={setModalActive}
        // data={data}
        setEditorState={setEditorState}
        editorState={editorState}
        refInput={refInput}
        inputDate={inputDate}
        inputText={inputText}
        handlerInputChange={handlerInputChange}
        formData={formData}
        sendHandlerForm={sendHandlerForm}
        refBtnImg={refBtnImg}
        changeImg={changeImg}
        removeImg={removeImg}
        seletedHandler={seletedHandler}
      />
      <Message
        message={message}
        btnConfirmm={btnConfirmm}
        btnCancel={btnCancel}
      />
      <div className="card">
        {contextState.userRole === 1 || contextState.userRole === 3 ? <div className="card-btn-cont">
          <p onClick={() => modalToggle(props, image?.image)} className="">
            <i className="fi fi-edit" />
            <FiEdit
              style={{ cursor: "pointer" }}
              size="1.1rem"
              color="#FBB454"
            />
          </p>
          <p onClick={messageToggle} className="">
            <i className="ci ci-square-remove" />
            <CiSquareRemove
              style={{ cursor: "pointer" }}
              size="1.2rem"
              color="#FB2576"
            />
          </p>
        </div> : null}

        <img
          onClick={click}
          src={image?.image}
          className="card-img-top img-costum-card-featured"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
            {props.description.replace(/(<([^>]+)>)/gi, "")}
          </p>
        </div>
        <p className="card-date">
          <small className="text-muted">{shortDate(props.date)}</small>
        </p>
        {/* <p className="card-date">
          <small className="text-muted">{`Autor: ${props.createdby}`}</small>
        </p> */}
        <button onClick={click} className="btn-dark">Leer más</button>
      </div>
    </>
  );
};

export default Card;
