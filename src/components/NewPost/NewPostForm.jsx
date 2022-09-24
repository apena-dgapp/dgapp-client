import React from "react";
import Images from "../../common/images/index";
import { TiDelete } from "react-icons/ti";
import Modal from "./NewPost.Modal";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const NewPostForm = ({
  sendHandlerForm,
  handlerInputChange,
  formData,
  setFormData,
  actionHandler,
  actionInput,
  accept,
  handleruploadFiles,
  seletedHandler,
  img,
  qtyImg,
  qtyPdf,
  removeCover,
  removeGalery,
  removePdf,
  removeVideo,
  modalActive,
  modalToggle,
  modalToggleCancel,
  modalToggleAceppt,
  setEditorState,
  editorState,
}) => {
  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  return (
    <>
      <Modal
        modalToggle={modalToggle}
        modalActive={modalActive}
        formData={formData}
        setFormData={setFormData}
        modalToggleCancel={modalToggleCancel}
        modalToggleAceppt={modalToggleAceppt}
      />
      <div className="post-container">
        <div className="post-title">
          <p className="Post-title-text">CREAR UNA NUEVA PUBLICACION</p>
        </div>

        <div className="newPostContainerGrid">
          <div className="newPostContainer">
            <div className="newPostInputContainer">
              <div className="d-flex justify-content-center">
                <div className="select">
                  <select
                    name="category"
                    onChange={handlerInputChange}
                    className="input-group"
                    defaultValue={"DEFAULT"}
                  >
                    <option disabled value="DEFAULT">
                      Elige una Categoria
                    </option>
                    <option className="option-txt" value={formData.room}>
                      Portada Principal
                    </option>
                    <option className="option-txt" value={formData.room}>
                      Anuncio
                    </option>
                    <option className="option-txt" value={formData.room}>
                      Noticia
                    </option>
                    <option className="option-txt" value={formData.room}>
                      Multimedia
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <input
                  id="titleinput"
                  name="title"
                  type="text"
                  placeholder="Agregar un titulo"
                  className="inputTitle"
                  onChange={handlerInputChange}
                  value={formData.title || ""}
                />
              </div>
              <div>
                <input
                  id="authorinput"
                  name="author"
                  type="text"
                  placeholder="Agregar un autor"
                  className="inputTitle"
                  onChange={handlerInputChange}
                  value={formData.author || ""}
                />
              </div>
              <div>
                <div className="newpost-form">
                  <div className="editor">
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      placeholder="Escribir aqui..."
                    />
                  </div>

                  <div className="btn-publish-cont">
                    <button
                      onClick={sendHandlerForm}
                      className="btn-publish"
                      name="btn-publish"
                      type="submit"
                    >
                      Publicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="newPostContainer">
            <div className="newpost-tools-title">
              <p>Seleccionar una accion</p>
            </div>

            <div className="newPostToolsContainer">
              {formData.category !== "Multimedia" ? (
                <div className="newPostImgCont">
                  <figure>
                    <p className="newPostImg-txt">Agregar Portada</p>
                    <img
                      name="image"
                      onClick={actionHandler}
                      className="newPostImg"
                      src={
                        actionInput === "image" ? Images.imgActive : Images.img
                      }
                      alt=".jpg, .jpeg, .jfif, .png"
                    />
                    {img ? (
                      <div onClick={removeCover} className="remove-cont">
                        <p style={{ fontWeight: "bold" }} className="p-0 m-0">
                          (1)
                        </p>
                        <a
                          style={{ color: "red" }}
                          href="#/"
                          className="text-white "
                        >
                          <i className="Md Delete-Forever" />
                          <TiDelete size="1.8rem" color="red" />
                        </a>
                      </div>
                    ) : null}
                  </figure>
                  <figure>
                    <p className="newPostImg-txt">Agregar Imagenes</p>
                    <img
                      name="imagenes"
                      onClick={actionHandler}
                      className="newPostImg"
                      src={
                        actionInput === "imagenes"
                          ? Images.galeryActive
                          : Images.galery
                      }
                      alt=".jpg, .jpeg, .jfif, .png"
                    />
                    {qtyImg ? (
                      <div onClick={removeGalery} className="remove-cont">
                        <p style={{ fontWeight: "bold" }} className="p-0 m-0">
                          ({qtyImg})
                        </p>
                        <a
                          style={{ color: "red" }}
                          href="#/"
                          className="text-white "
                        >
                          <i className="Md Delete-Forever" />
                          <TiDelete size="1.8rem" color="red" />
                        </a>
                      </div>
                    ) : null}
                  </figure>
                  <figure>
                    <p className="newPostImg-txt">Agregar PDF</p>
                    <img
                      name="pdf"
                      onClick={actionHandler}
                      className="newPostImg"
                      src={
                        actionInput === "pdf" ? Images.pdfActive : Images.pdf
                      }
                      alt=".pdf"
                    />
                    {qtyPdf ? (
                      <div onClick={removePdf} className="remove-cont">
                        <p style={{ fontWeight: "bold" }} className="p-0 m-0">
                          ({qtyPdf})
                        </p>
                        <a href="#/" className="text-white ">
                          <i className="Md Delete-Forever" />
                          <TiDelete size="1.8rem" color="red" />
                        </a>
                      </div>
                    ) : null}
                  </figure>
                  <figure>
                    <p className="newPostImg-txt">Agregar Video</p>
                    <img
                      name="video"
                      onClick={modalToggle}
                      className="newPostImg"
                      type="text"
                      src={Images.video}
                      alt=".mp4, .avi, .mkv, .mov"
                      onChange={handlerInputChange}
                      value={formData.video || ""}
                    />
                    {formData.video ? (
                      <div onClick={removeVideo} className="remove-cont">
                        <p style={{ fontWeight: "bold" }} className="p-0 m-0">
                          (1)
                        </p>
                        <a
                          style={{ color: "red" }}
                          href="#/"
                          className="text-white "
                        >
                          <i className="Md Delete-Forever" />
                          <TiDelete size="1.8rem" color="red" />
                        </a>
                      </div>
                    ) : null}
                  </figure>
                </div>
              ) : (
                <div className="newPostImgCont">
                  <figure>
                    <p className="newPostImg-txt">Agregar Video</p>
                    <img
                      name="video"
                      onClick={modalToggle}
                      className="newPostImg"
                      type="text"
                      src={Images.video}
                      alt=".mp4, .avi, .mkv, .mov"
                      onChange={handlerInputChange}
                      value={formData.video || ""}
                    />
                    {formData.video ? (
                      <div onClick={removeVideo} className="remove-cont">
                        <p style={{ fontWeight: "bold" }} className="p-0 m-0">
                          (1)
                        </p>
                        <a
                          style={{ color: "red" }}
                          href="#/"
                          className="text-white "
                        >
                          <i className="Md Delete-Forever" />
                          <TiDelete size="1.8rem" color="red" />
                        </a>
                      </div>
                    ) : null}
                  </figure>
                </div>
              )}
            </div>
            {!actionInput ? null : (
              <div className="newPostToolsContainer">
                <div className="area">
                  <p className="area-txt">
                    {`Arrastre y suelte ${actionInput} o click para agregar ${actionInput}`}
                  </p>
                  {actionInput === "image" ? (
                    <input
                      id="fileinput"
                      name="image"
                      type="file"
                      onChange={seletedHandler}
                      accept=".jpg, .jpeg, .jfif, .png"
                    />
                  ) : (
                    <input
                      id="fileinput"
                      name={actionInput}
                      type="file"
                      onChange={handleruploadFiles}
                      accept={accept}
                      multiple
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewPostForm;
