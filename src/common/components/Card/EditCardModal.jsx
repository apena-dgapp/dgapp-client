import React from "react";
import Portal from "../../../utils/Portal";
import { Editor } from "react-draft-wysiwyg";

const EditCardModal = ({
  modalActive,
  modalToggle,
  data,
  setEditorState,
  editorState,
  refInput,
  inputText,
  inputDate,
  handlerInputChange,
  formData,
  sendHandlerForm,
  refBtnImg,
  changeImg,
  removeImg,
  seletedHandler
}) => {

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  return (
    <Portal>
      {modalActive && (
        <div className="ticket-wrapper">
          <div className="card-window-model">
            <p className="ticket-modal-title">Editar publicación</p>
            <div className="card-edit-grid">
              <div className="card-edit-inputs">
                <div className="">
                  <p className="edit-input-title">Título</p>
                  <input
                    onChange={handlerInputChange}
                    name="title"
                    type="text"
                    placeholder={
                      data?.item.title ? data?.item.title : "Escriba un título"
                    }
                    className="edit-input"
                    value={formData.title || ""}
                  />
                </div>
                <div className="">
                  <p className="edit-input-title">Autor</p>
                  <input
                    onChange={handlerInputChange}
                    name="author"
                    type="text"
                    placeholder={
                      data?.item.author ? data?.item.author : "Escriba un author"
                    }
                    className="edit-input"
                    value={formData.author || ""}
                  />
                </div>
                <div className="">
                  <p className="edit-input-title">Fecha</p>
                  <input
                    onChange={handlerInputChange}
                    name="date"
                    type="text"
                    onBlur={inputText}
                    onFocus={inputDate}
                    ref={refInput}
                    placeholder={
                      data?.item.date ? new Date(data?.item.date)
                        .toLocaleString('en-us', { year: 'numeric', month: '2-digit', day: '2-digit' })
                        .replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2') : "Escriba un author"
                    }
                    className="edit-input"
                    value={formData.date || ""}
                  />
                </div>
                <div className="">
                  <p className="edit-input-title">Descripción</p>
                  <div className="card-edit-editor">
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      wrapperClassName="wrapper-class"
                      editorClassName="card-edit-editor-class"
                      toolbarClassName="toolbar-class"
                      placeholder={
                        data?.item.description ? data?.item.description.replace(/<[^>]*>/g, '') : "Escriba una descripción"
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="card-edit-img-modal-cont">
                <input
                  onChange={seletedHandler}
                  name="image"
                  className="upload-file-buton"
                  type="file"
                  accept=".jpg, .jpeg, .jfif, .png, .webp"
                  ref={refBtnImg}
                />
                <img className="card-edit-img-modal" src={formData.image ? formData.image : data.img} alt="" />
                <div className="card-edit-img-btn-cont">
                  <button onClick={formData.image ? removeImg : changeImg}>{formData.image ? "REMOVER" : "CAMBIAR"}</button>
                </div>
              </div>
            </div>

            <div className="btn-publish-cont">
              <button
                onClick={sendHandlerForm}
                className="btn-publish"
                name="btn-publish"
                type="submit"
              >
                Actualizar
              </button>
            </div>

            {/* <div>{children}</div> */}
          </div>
          <div className="ticket-background" onClick={modalToggle}></div>
        </div>
      )}
    </Portal>
  );
};

export default EditCardModal;