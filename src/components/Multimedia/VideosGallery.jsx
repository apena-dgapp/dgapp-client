import React from 'react'
import ReactPaginate from 'react-paginate';
import { shortDate } from "../../utils/shortDate";

const ImagesGallery = ({
    handlePageClick,
    items,
    pageCount,
    imagesTotal
}) => {

    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>GALERIAS VIDEOS</p>
                    <span className='news-title-line'></span>
                </div>
                <div className="multimedia-images-container">
                    <div className="multimedia-images">
                        {
                            items?.map((item, index) => {
                                return (
                                    <div key={index} className="multimedia-images-box">
                                        <img src={item.FilesPosts[0].file} alt="" />
                                        <div className="multimedia-images-box-text">
                                            <p className='multimedia-images-box-text-title'>{item.title}</p>
                                            <p className='multimedia-images-box-text-date'>{`${imagesTotal[index]?.length} fotos`}</p>
                                            <p className='multimedia-images-box-text-date'>{shortDate(item.createdAt)}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
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
            </div>
        </>
    )
}

export default ImagesGallery