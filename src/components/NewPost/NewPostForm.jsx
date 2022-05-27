import React from "react";
import Input from "../../common/components/Input/Input";
import Images from "../../common/images/index";
import { TiDelete } from "react-icons/ti";
import WYSIWYGEditor from "../../common/components/TextEditor/WYSIWYG";
import { useForm, Controller } from "react-hook-form";

const NewPostForm = ({
  sendHandlerForm,
  handlerInputChange,
  formData,
  actionHandler,
  actionInput,
  accept,
  handleruploadFiles,
  seletedHandler,
  msgDisable,
  img,
  qtyImg,
  qtyPdf,
  removeCover,
  removeGalery,
  removePdf,
}) => {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const handleSubmitOnClick = ({ editor_content }) => {
    sendHandlerForm(editor_content);
  };

  // const { reset } = useForm({
  //   defaultValues
  // });

  return (
    <>
      <div className="row post-container">
        <div className="post-title">
          <p className="m-0">CREAR UNA NUEVA PUBLICACION</p>
        </div>

        <div className="newPostContainerGrid">
          <div className="newPostContainer">
            <div className="newPostInputContainer">
              <div className="d-flex justify-content-center mb-5">
                {/* <label
                  className="input-group-text"
                  htmlFor="inputGroupSelect01"
                ></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handlerInputChange}
                  className="form-select"
                  id="inputGroupSelect01"
                >
                  <option defaultValue={true}>Elige una Categoria</option>
                  <option className="option-txt" value="Main Post">
                    Main Post
                  </option>
                  <option className="option-txt" value="Featured Post">
                    Featured Post
                  </option>
                </select> */}
                <div className="select">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handlerInputChange}
                    className="input-group"
                    id="inputGroupSelect01"
                  >
                    <option
                      className="option-txt-placeholder"
                      defaultValue={true}
                    >
                      Elige una Categoria
                    </option>
                    <option className="option-txt" value="Main Post">
                      Main Post
                    </option>
                    <option className="option-txt" value="Featured Post">
                      Featured Post
                    </option>
                  </select>
                </div>
              </div>
              <div className="pb-5">
                <Input
                  id="titleinput"
                  name="title"
                  type="text"
                  placeholder="Agregar un titulo"
                  classInput="inputTitle"
                  // maxLength="16"
                  // minLength="4"
                  onChange={handlerInputChange}
                  value={formData.title}
                />
              </div>
              <div className="pb-5">
                <Input
                  id="authorinput"
                  name="author"
                  type="text"
                  placeholder="Agregar un autor"
                  classInput="inputTitle"
                  // maxLength="16"
                  // minLength="4"
                  onChange={handlerInputChange}
                  value={formData.author}
                />
              </div>
              <div className="mb-5">
                {/* <textarea
                  id="descpinput"
                  name="description"
                  className="txtarea"
                  placeholder="Agregar el contenido de la nueva publicacion"
                  onChange={handlerInputChange}
                  value={formData.description}
                /> */}
                <form onSubmit={handleSubmit(handleSubmitOnClick)}>
                  <Controller
                    as={<WYSIWYGEditor />}
                    name="editor_content"
                    control={control}
                  />
                  <div className="btn-publish-cont">
                    <button
                      className="btn-publish"
                      name="btn-publish"
                      type="submit"
                    >
                      Publicar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="newPostContainer">
            <div className="newpost-tools-title">
              <p>Seleccionar una accion</p>
            </div>

            <div className="newPostToolsContainer">
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
                        className="text-white me-4"
                      >
                        <i className="Md Delete-Forever" />
                        <TiDelete size="2em" color="red" />
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
                        className="text-white me-4"
                      >
                        <i className="Md Delete-Forever" />
                        <TiDelete size="2em" color="red" />
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
                    src={actionInput === "pdf" ? Images.pdfActive : Images.pdf}
                    alt=".pdf"
                  />
                  {qtyPdf ? (
                    <div onClick={removePdf} className="remove-cont">
                      <p style={{ fontWeight: "bold" }} className="p-0 m-0">
                        ({qtyPdf})
                      </p>
                      <a href="#/" className="text-white me-4">
                        <i className="Md Delete-Forever" />
                        <TiDelete size="2em" color="red" />
                      </a>
                    </div>
                  ) : null}
                </figure>
                <figure>
                  <p className="newPostImg-txt">Agregar Video</p>
                  <img
                    name="video"
                    onClick={msgDisable}
                    className="newPostImg"
                    src={Images.video}
                    alt=".mp4, .avi, .mkv, .mov"
                  />
                  {/* <p className="">Remove (1)</p> */}
                </figure>
                {/* <figure>
                  <p className="newPostImg-txt">Agregar Link</p>
                  <img
                    name="link"
                    onClick={actionHandler}
                    className="newPostImg"
                    src={Images.link}
                    alt=""
                  />
                </figure> */}
              </div>
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
      {/* <div className="btn-publish-cont">
        <button
          className="btn-publish"
          name="btn-publish"
          type="submit"
          onClick={sendHandlerForm}
        >
          Publicar
        </button>
      </div> */}
    </>
  );
};

export default NewPostForm;
