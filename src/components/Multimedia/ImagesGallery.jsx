import React from 'react'
import ReactPaginate from 'react-paginate';
import { shortDate } from "../../utils/shortDate";
// import { FiEdit } from "react-icons/fi";
import { CiSquareRemove } from "react-icons/ci";
import ImagesPost from "../../common/components/imagesPost/ImagesPost"

const ImagesGallery = ({
    handlePageClick,
    items,
    pageCount,
    imagesTotal,
    getImagesHandler,
    contextState,
    messageToggle
}) => {

    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>GALERIAS IMAGENES</p>
                    <span className='news-title-line'></span>
                </div>
                <div className="multimedia-images-container">
                    <div className="multimedia-images">
                        {
                            items?.map((item, index) => {
                                return (
                                    <div key={index} className="multimedia-images-box">
                                        {contextState.userRole === 1 || contextState.userRole === 3 ?
                                            <div className="multimedia-box-img-icon">
                                                {/* <span>
                                                    <i className="fi fi-edit" />
                                                    <FiEdit
                                                        style={{ cursor: "pointer", marginRight: '1rem' }}
                                                        size="1.1rem"
                                                        color="#FBB454"
                                                    />
                                                </span> */}
                                                <span onClick={() => messageToggle(item)}>
                                                    <i className="ci ci-square-remove" />
                                                    <CiSquareRemove
                                                        style={{ cursor: "pointer" }}
                                                        size="1.2rem"
                                                        color="#FB2576"
                                                    />
                                                </span>
                                            </div> : null}
                                        {/* <img onClick={() => getImagesHandler(item.postId)} src={item.FilesPosts[0].file} alt="" /> */}
                                        <ImagesPost func={() => getImagesHandler(item.postId)} id={item.FilesPosts[0].filesId} />
                                        <div onClick={() => getImagesHandler(item.postId)} className="multimedia-images-box-text">
                                            <p className='multimedia-images-box-text-title'>{item.title}</p>
                                            <p className='multimedia-images-box-text-date'>{`${imagesTotal[index]?.length} fotos | ${shortDate(item.createdAt)}`}</p>
                                            {/* <p className='multimedia-images-box-text-date'>{shortDate(item.createdAt)}</p> */}
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