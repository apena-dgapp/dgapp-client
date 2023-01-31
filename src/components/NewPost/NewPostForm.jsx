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
  options,
  refInput,
  inputDate,
  inputText,
  refExpiration,
  expirationDate,
  expirationText,
  TagsInput,
  selected,
  setSelected,
  user,
  MultiSelect,
  tagsList
}) => {
  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const customValueRenderer = (selected, _options) => {
    return selected.length
      ? selected.map(({ label }) => "✔️ " + label)
      : "Agregar etiquetas";
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
      <div className="news-container">
        <div className="news-title">
          <p>CREAR NUEVA ENTRADA</p>
          <span className='news-title-line'></span>
        </div>

        <div className="newPostContainerGrid">
          <div className="newPostContainer">
            <div className="newPostInputContainer">
              <div className="select">
                <select
                  name="category"
                  className="input-group"
                  value={formData.category || ""}
                  onChange={handlerInputChange}
                >
                  <option disabled={true} value="">Elige una Categoría</option>
                  {options?.map(({ value, id }) => {
                    return <option key={id} value={value}>{value}</option>;
                  })}
                </select>
              </div>
              <div>
                <input
                  id="titleinput"
                  name="title"
                  type="text"
                  maxLength={formData.category === "Aviso" ? 40 : 200}
                  placeholder="Agregar un título"
                  className="inputTitle"
                  onChange={handlerInputChange}
                  value={formData.title || ""}
                />
              </div>
              {
                formData.category === "Aviso" || formData.category === "Otras Noticias" ? null : <div>
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
              }
              {
                formData.category === "Otras Noticias" ? <div>
                  <input
                    id="link"
                    name="link"
                    type="text"
                    placeholder="Agregar enlace"
                    className="inputTitle"
                    onChange={handlerInputChange}
                    value={formData.link || ""}
                  />
                </div> : null}
              <div>
                <input
                  id="date"
                  name="date"
                  type="text"
                  onBlur={inputText}
                  onFocus={inputDate}
                  className="inputTitle"
                  placeholder={formData.category === "Aviso" ? "Agregar una fecha inicial" : "Agregar una fecha"}
                  onChange={handlerInputChange}
                  value={formData.date || ""}
                  ref={refInput}
                />
              </div>

              {
                formData.category === "Aviso" ? <div>
                  <input
                    id="expiration"
                    name="expiration"
                    type="text"
                    onBlur={expirationText}
                    onFocus={expirationDate}
                    className="inputTitle"
                    placeholder="Agregar una fecha de caducidad"
                    onChange={handlerInputChange}
                    value={formData.expiration || ""}
                    ref={refExpiration}
                  />
                </div> : null
              }
              <div>
                {
                  formData.category === "Noticia" || formData.category === "Multimedia" ?
                    user !== "Yelissa Diaz" ? <div className="tags-container">
                      <MultiSelect
                        options={tagsList}
                        value={selected}
                        onChange={setSelected}
                        labelledBy="Select"
                        valueRenderer={customValueRenderer}
                      />
                    </div> : <div className="tags-container">
                      <TagsInput
                        value={selected}
                        onChange={setSelected}
                        name="tags"
                        placeHolder="Agregar etiquetas"
                      />
                    </div> : null
                }

                <div className="newpost-form">
                  <div className="editor">
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      placeholder="Escribir aquí..."
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

          {
            formData.category === "Aviso" || formData.category === "Otras Noticias" ? null : <div className="newPostContainer">
              <div className="newpost-tools-title">
                <p>Seleccionar una acción</p>
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
                      <p className="newPostImg-txt">Agregar Imágenes</p>
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
          }
        </div>
      </div>
    </>
  );
};

export default NewPostForm;
