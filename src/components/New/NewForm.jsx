import React from 'react'
import { shortDate } from "../../utils/shortDate";
import DOMPurify from "dompurify";
import { AiFillLike, AiFillDislike, AiOutlinePlayCircle } from "react-icons/ai";
import { getVideoId } from "../../utils/getYoutubeId"
import { IoMdImages } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdOutlineDoubleArrow } from "react-icons/md";
import useScreenSize from "../../hooks/useScreenSize";
import { IoRemoveCircleSharp } from "react-icons/io5";
import ImagesPost from "../../common/components/imagesPost/ImagesPost"
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";

const NewsForm = ({
  dataPost,
  recentNews,
  goToPost,
  comments,
  comment,
  handlerTextareaChange,
  sendComment,
  selectedLike,
  selectedDislike,
  handlerLike,
  like,
  dislike,
  SetselectedLike,
  SetselectedDislike,
  multimedia,
  modalToggle,
  getImagesHandler,
  related,
  removeComment,
  personId,
  count,
  filesIdCount,
  handlerBtnLeft,
  handlerBtnRight,
  filesIds
}) => {

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  const { width } = useScreenSize();

  return (
    <>
      <div className="news-container">
        <div className="news-title">
          <p>NOTICIAS</p>
          <span className='news-title-line'></span>
        </div>
        <div className="new-grid-container">
          <div className="news-grid-panel1">
            <div className='new-img-icon-container'>
              <div className='new-img-icon-left' onClick={handlerBtnLeft}>
                {
                  filesIds.length > 0 ?
                    <>
                      <i className="tfi tfi-arrow-circle-left" />
                      <TfiArrowCircleLeft
                        size={"2rem"}
                        cursor={count > 0 ? 'pointer' : null}
                        // style={{ marginRight: "1rem" }}
                        color={count > 0 ? "#75AAD3" : "gray"}
                      />
                    </> : null
                }
              </div>

              <div className="new-img-container">
                {
                  count < 1 ? <ImagesPost id={dataPost?.id} table="post" /> : <ImagesPost id={filesIds[count]?.filesId} table="" />
                }
              </div>

              <div className='new-img-icon-right' onClick={handlerBtnRight}>
                {
                  filesIds.length > 0 ?
                    <>
                      <i className="tfi tfi-arrow-circle-right" />
                      <TfiArrowCircleRight
                        color={count < filesIdCount ? "#75AAD3" : "gray"}
                        cursor={count < filesIdCount ? 'pointer' : null}
                        size={"2rem"}
                      // style={{ marginLeft: "1rem" }}
                      />
                    </> : null
                }
              </div>
            </div>

            <div className="new-title-container">
              <p>{dataPost?.title}</p>
            </div>
            <div className="new-date-container">
              <p>{`${shortDate(dataPost?.date)} | ${dataPost?.createdby}`}</p>
            </div>
            <div className="new-descrip-container">
              <p dangerouslySetInnerHTML={createMarkup(dataPost.description)}></p>
            </div>
            <div className="new-comment-header">
              <p>COMENTARIO</p>
            </div>
            <div className="new-comment-line"></div>
            <div className="">
              <textarea
                onChange={handlerTextareaChange}
                className="new-comment-textarea"
                maxLength={500}
                placeholder="Escribe un comentario"
                value={comment}
              />
            </div>
            <div className="new-comment-buttons">
              <div className="new-comment-button-box">
                <div className="new-comment-button-like">
                  <i className="ai ai-fill-like" />
                  <AiFillLike
                    onClick={() => {
                      handlerLike("like")
                      SetselectedLike(!selectedLike)
                      SetselectedDislike(false)
                    }}
                    size={"1.5rem"}
                    color={selectedLike ? "#75AAD3" : "gainsboro"}
                    cursor={"pointer"}
                    style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                  />
                  <i className="ai ai-fill-dislike" />
                  <p>{like}</p>
                </div>
                <div className="new-comment-button-dislike">
                  <AiFillDislike
                    onClick={() => {
                      handlerLike("dislike")
                      SetselectedDislike(!selectedDislike)
                      SetselectedLike(false)
                    }}
                    size={"1.5rem"}
                    color={selectedDislike ? "#EB455F" : "gainsboro"}
                    cursor={"pointer"}
                    style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                  />
                  <p>{dislike}</p>
                </div>
              </div>
              <div className="new-comment-button-send-cont">
                {
                  comment.length !== 0 ? < p style={{ color: comment.length < 500 ? "#75AAD3" : "red" }}>{comment.length}</p> : null
                }

                <button
                  onClick={sendComment}
                  name="done"
                  className="new-comment-button-send"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </div>

            {
              comments.comments?.length ? <div className="new-comment-list-cont">
                <div className="new-comment-list-header">
                  <p>Comentarios</p>
                </div>
                <div className="new-comment-list-container">
                  {
                    comments.comments?.map((item, key) => {
                      return (
                        <div key={key} className="new-comment-list">
                          <div className="new-comment-list-user">
                            <img src={item.Person.photo} alt="" />
                            <p>{item.Person.firstName.split(" ", 1) + " " + item.Person.lastName.split(" ", 1)}</p>
                          </div>
                          <div className="new-comment-lis-text">
                            <p>{item.text}</p>
                            {
                              personId === item.personId ? <span onClick={() => removeComment(item.commentId)}>
                                <i className="ci ci-square-remove" />
                                <IoRemoveCircleSharp
                                  style={{ cursor: "pointer" }}
                                  size="1rem"
                                  color="#FB2576"
                                />
                              </span> : null
                            }

                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div> : null
            }
          </div>
          <span></span>
          <div className="news-grid-panel2">
            <div className="new-recent-news">
              <div className="dashboard-section-1-news-header">
                <p>NOTICIAS RECIENTES</p>
              </div>
              <div className="dashboard-section-1-news-title-line"></div>
              <div className="dashboard-section-1-news-multi">
                {
                  recentNews.rows?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => goToPost(item)}
                        className="dashboard-section-1-news-content"
                      >
                        <div className="dashboard-section-1-news-content-txt">
                          {item.title}
                        </div>
                      </div>
                    );
                  })
                }
                {recentNews.rows ? (
                  <div className="dashboard-section-1-news-btn-container">
                    <Link to={"/publicaciones/noticias/pagina/1"}
                      state={{ category: "Noticia" }}
                      type="button"
                      className="dashboard-section-1-news-btn"
                    >
                      <i className="md md-outline-double-arrow" />
                      <p>Ir a Noticias</p>
                      <MdOutlineDoubleArrow
                        size={width < 5021 ? "1.2rem" : "2.5rem"}
                        color="white"
                        style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                      />
                    </Link>
                  </div>
                ) : null}
              </div>

            </div>
            {
              related.length > 0 ? <div className="dashboard-section-1-news">
                <div className="dashboard-section-1-news-header">
                  <p>TEMAS RELACIONADOS</p>
                </div>
                <div className="dashboard-section-1-news-title-line"></div>
                <div className="dashboard-section-1-news-multi">
                  {
                    related?.map((item, index) => {
                      return (
                        index <= 2 ?
                          <div
                            key={index}
                            onClick={() => goToPost(item)}
                            className="dashboard-section-1-news-content"
                          >
                            <div className="dashboard-section-1-news-content-txt">
                              {item.title}
                            </div>
                          </div> : null
                      );
                    })
                  }
                </div>
              </div> : null
            }

            <div className="new-multimedia-container">
              <div className="dashboard-section-1-news-header">
                <p>MULTIMEDIA</p>
              </div>
              <div className="dashboard-section-1-news-title-line"></div>
              <div className="dashboard-section-1-news-multi">
                {
                  multimedia?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        // onClick={() => goToPost(item)}
                        className="new-multimedia-content"
                      >
                        {
                          item.FilesPosts[0].type === "URL" ?
                            <>
                              <div
                                onClick={() => modalToggle({ id: item.postId, title: item.title, url: item.FilesPosts[0].file })}
                                // key={index}
                                // href={item.FilesPosts[0].file}
                                // target="_blank"
                                // rel="noreferrer"
                                className="new-multimedia-content-video"
                              // style={{ textDecoration: "none" }}
                              >
                                <i className="ai ai-outline-play-circle" />
                                <AiOutlinePlayCircle
                                  color="white"
                                  className="new-multimedia-content-img-icon"
                                />
                                <div className="new-multimedia-content-cont">
                                  <img className="new-multimedia-content-img" src={`http://img.youtube.com/vi/${getVideoId(item.FilesPosts[0].file)}/0.jpg`} alt="" />
                                </div>
                              </div>
                              <div onClick={() => modalToggle({ id: item.postId, title: item.title, url: item.FilesPosts[0].file })} className="dashboard-section-1-news-content-txt">
                                {item.title}
                              </div>
                            </>
                            :
                            <>
                              <div onClick={() => getImagesHandler(item)} key={index} className="new-multimedia-content-video">
                                <i className="io io-md-images" />
                                <IoMdImages
                                  color="white"
                                  className="new-multimedia-content-img-icon"
                                />
                                <div className="new-multimedia-content-cont">
                                  <img className="new-multimedia-content-img" src={item.FilesPosts[0].file} alt="" />
                                </div>
                              </div>
                              <div onClick={() => getImagesHandler(item)} className="dashboard-section-1-news-content-txt">
                                {item.title}
                              </div>
                            </>

                        }
                      </div>
                    );
                  })
                }
                {recentNews.rows ? (
                  <div className="dashboard-section-5-btn-container m-0">
                    <Link to="/publicaciones/multimedia/menu" type="button" className="dashboard-section-5-btn">
                      <i className="md md-outline-double-arrow" />
                      <p>Ir a Multimedia</p>
                      <MdOutlineDoubleArrow
                        size={width < 5021 ? "1.2rem" : "2.5rem"}
                        color="white"
                        style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                      />
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsForm