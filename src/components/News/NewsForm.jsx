import React from 'react'
import ReactPaginate from 'react-paginate';
import { shortDate } from "../../utils/shortDate";
import DashboardSection5 from "../Dashboard/DashboardSection5"

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
  tags
}) => {

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
              items.rows?.map((item, index) => {
                return (
                  <div key={index} onClick={() => goToPost(item)} className="news-box">
                    <div className="news-box-img">
                      <img src={item.image} alt="" />
                    </div>
                    <div className="news-box-text">
                      <p className='news-box-text-title'>{item.title}</p>
                      <p className='news-box-text-date'>{shortDate(item.createdAt)}</p>
                      <p className='news-box-text-cont'>{item.description.replace(/(<([^>]+)>)/gi, "")}</p>
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
                        // onClick={() => goToPost(item)}
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
      </div>
    </>
  )
}

export default NewsForm