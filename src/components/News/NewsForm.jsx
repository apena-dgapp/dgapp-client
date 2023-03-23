import React, { useContext } from 'react'
import ReactPaginate from 'react-paginate';
import { shortDate } from "../../utils/shortDate";
import DashboardSection5 from "../Dashboard/DashboardSection5";
import DashboardSection6 from "../Dashboard/DashboardSection6";
import DashboardSection7 from "../Dashboard/DashboardSection7";
import { FiEdit } from "react-icons/fi";
import { CiSquareRemove } from "react-icons/ci";
import GlobalContext from "../../context/GlobalContext";
import ImagesPost from "../../common/components/imagesPost/ImagesPost"

const NewsForm = ({
  handlePageClick,
  items,
  pageCount,
  multimedia,
  multimediaMain,
  goToPost,
  modalToggle,
  getImagesHandler,
  otherNews,
  tags,
  setRelated,
  instagram,
  EditToggle,
  messageToggle,
  width,
  related
}) => {
  const [contextState] = useContext(GlobalContext);

  console.log(pageCount);

  return (
    <>
      <div className="news-container">
        <div className="news-title">
          <p>NOTICIAS</p>
          <span className='news-title-line'></span>
        </div>
        <div className="news-grid-container">
          <div className="news-grid-panel1">
            {
              related ?
                <>
                  <div className="dashboard-section-1-news-header d-flex">
                    <p style={{ fontSize: "0.8rem", paddingLeft: contextState.userRole === 1 || contextState.userRole === 3 ? "1.5rem" : "0" }}>TEMAS RELACIONADOS CON:</p>
                    <p style={{ color: "#75AAD3", paddingLeft: "0.5rem", fontSize: "0.8rem" }}>{related}</p>
                  </div>
                  <div style={{ height: "0.1rem", marginLeft: contextState.userRole === 1 || contextState.userRole === 3 ? "1.5rem" : "0" }} className="dashboard-section-1-news-title-line"></div>
                </> : null
            }
            {
              items.rows?.map((item, index) => {
                return (
                  <div key={index} className="news-box">
                    {contextState.userRole === 1 || contextState.userRole === 3 ?
                      <div className="news-box-img-icon">
                        <span onClick={() => EditToggle(item)}>
                          <i className="fi fi-edit" />
                          <FiEdit
                            style={{ cursor: "pointer" }}
                            size="1.1rem"
                            color="#FBB454"
                          />
                        </span>
                        <span onClick={() => messageToggle(item)}>
                          <i className="ci ci-square-remove" />
                          <CiSquareRemove
                            style={{ cursor: "pointer" }}
                            size="1.2rem"
                            color="#FB2576"
                          />
                        </span>
                      </div> : null}
                    <div onClick={() => goToPost(item)} className="news-box-img">
                      {/* <img src={item.image} alt="" /> */}
                      <ImagesPost id={item.postId} table="post" />
                    </div>
                    <div onClick={() => goToPost(item)} className="news-box-text">
                      <p className='news-box-text-title'>{item.title}</p>
                      <p className='news-box-text-date'>{shortDate(item.createdAt)}</p>
                      <p style={{ WebkitLineClamp: width <= 1366 && item?.title.length > 104 ? "2" : "3" }} className='news-box-text-cont'>{item.description.replace(/(<([^>]+)>)/gi, "")}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <span></span>
          <div className="news-grid-panel2">
            <div className="news-section-1-news">
              <div className="dashboard-section-1-news-header">
                <p>OTRAS NOTICIAS</p>
              </div>
              <div className="dashboard-section-1-news-title-line"></div>
              <div className="dashboard-section-1-news-multi">
                {otherNews.length ? (
                  otherNews?.map((item, index) => {
                    return (
                      <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noreferrer"
                        className="dashboard-section-1-news-content"
                        style={{ textDecoration: "none" }}
                      >
                        <div className="dashboard-section-1-news-content-txt">
                          {item.title}
                        </div>
                      </a>
                    );
                  })
                ) : (
                  null
                )}
              </div>
            </div>
            <div className="dashboard-section-1-news">
              <div className="dashboard-section-1-news-header">
                <p>MÁS VISTAS</p>
              </div>
              <div className="dashboard-section-1-news-title-line"></div>
              <div className="dashboard-section-1-news-multi">
                {tags.length ? (
                  tags?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setRelated(item.name)}
                        className="news-mostviewed-content"
                      >
                        <div className="news-mostviewed-content-txt">
                          {item.name}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  null
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="news-pagination-section">
          <ReactPaginate
            previousLabel={'<< Anterior'}
            nextLabel={'Siguiente >>'}
            breakLabel={'...'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
          />
        </div>
        {/* multimedia */}
        <DashboardSection5
          multimedia={multimedia}
          multimediaMain={multimediaMain}
          goToPost={goToPost}
          modalToggle={modalToggle}
          getImagesHandler={getImagesHandler}
        />

        {/* logo */}
        < DashboardSection6 />

        {/* social */}
        <DashboardSection7 instagram={instagram} />
      </div>
    </>
  )
}

export default NewsForm