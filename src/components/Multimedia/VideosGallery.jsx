import React from 'react'
import ReactPaginate from 'react-paginate';
import { shortDate } from "../../utils/shortDate";
import { getVideoId } from "../../utils/getYoutubeId"

const ImagesGallery = ({
    handlePageClick,
    items,
    pageCount,
    handleVideoClick,
    videoSelected

}) => {

    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>GALERIAS VIDEOS</p>
                    <span className='news-title-line'></span>
                </div>

                <div className="multimedia-video-main">
                    {
                        items.length > 0 ?
                            <>
                                <iframe
                                    src={`https://www.youtube.com/embed/${getVideoId(items[videoSelected]?.FilesPosts[0]?.file === undefined ? items[0]?.FilesPosts[0]?.file : items[videoSelected]?.FilesPosts[0]?.file)}?autoplay=1`}
                                    title="video"
                                    allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    frameBorder="0"
                                />
                                <div className="multimedia-video-main-text">
                                    <p>{items[videoSelected]?.title}</p>
                                </div>
                            </>
                            : null
                    }

                </div>
                <div className="multimedia-video-slider-container">
                    {
                        items?.map((item, index) => {
                            return (
                                <span>
                                    {
                                        index !== videoSelected ?
                                            <div key={index} onClick={() => handleVideoClick(index)} className="multimedia-video-slider-box">
                                                <img src={`http://img.youtube.com/vi/${getVideoId(item.FilesPosts[0].file)}/mqdefault.jpg`} alt="" />
                                                <div className="multimedia-video-slider-box-text">
                                                    <p>{item.title}</p>
                                                </div>

                                            </div> : null
                                    }
                                </span>

                            )
                        })
                    }
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
            </div>
        </>
    )
}

export default ImagesGallery