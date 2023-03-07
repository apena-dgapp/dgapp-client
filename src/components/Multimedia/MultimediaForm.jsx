import React from 'react'
import Slider from "react-slick";
import { IoMdImages } from "react-icons/io";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { MdOutlineDoubleArrow } from "react-icons/md";
import ImagesPost from "../../common/components/imagesPost/ImagesPost"
// import { getVideoId } from "../../utils/getYoutubeId"

const MultimediaForm = ({
    imagesFiles,
    videoFiles,
    goTomultimedia,
    getImagesHandler,
    modalToggle,
}) => {
    var settingsImages = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: imagesFiles.length > 4 ? 4 : imagesFiles.length,
        slidesToScroll: 4
    };
    var settingsVideos = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: videoFiles.length > 4 ? 4 : videoFiles.length,
        slidesToScroll: 4
    };

    return (
        <>
            <div className="news-container">
                <div className="news-title multimedia-dashboard-title">
                    <p>MULTIMEDIA</p>
                    <span className='news-title-line'></span>
                </div>
                <div className="multimedia-dashboard-container">
                    <div className="multimedia-dashboard-fotos">
                        <div className="multimedia-dashboard-btn-container">
                            <div onClick={() => goTomultimedia("imagenes")} type="button" className="multimedia-dashboard-btn">
                                <i className="md md-outline-double-arrow" />
                                <p>Más Fotos</p>
                                <MdOutlineDoubleArrow
                                    // size={width < 5021 ? "1.2rem" : "2.5rem"}
                                    color="white"
                                    style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                                />
                            </div>
                        </div>
                        <Slider {...settingsImages}>
                            {
                                imagesFiles.length > 0 ?
                                    imagesFiles?.map((item, index) => {
                                        return (
                                            <div key={index} onClick={() => getImagesHandler(item)} className="multimedia-dashboard-fotos-img">
                                                <i className="io io-md-images" />
                                                <IoMdImages className="multimedia-dashboard-galery-icon" />
                                                {/* <img src={item.FilesPosts[0].file} alt='imagem' title='imagem' /> */}
                                                <ImagesPost id={item.FilesPosts[0].filesId} />
                                                <p>{item.title}</p>
                                            </div>
                                        )
                                    }) : null
                            }

                        </Slider>
                    </div>
                    <div className="multimedia-dashboard-fotos">
                        <div className="multimedia-dashboard-btn-container">
                            <div onClick={() => goTomultimedia("videos")} type="button" className="multimedia-dashboard-btn">
                                <i className="md md-outline-double-arrow" />
                                <p>Más Videos</p>
                                <MdOutlineDoubleArrow
                                    // size={width < 5021 ? "1.2rem" : "2.5rem"}
                                    color="white"
                                    style={{ marginLeft: "0.3rem", marginRight: "0.5rem" }}
                                />
                            </div>
                        </div>
                        <Slider {...settingsVideos}>
                            {
                                videoFiles.length > 0 ?
                                    videoFiles?.map((item, index) => {
                                        return (
                                            <div
                                                key={index}
                                                onClick={() => modalToggle({ id: item.postId, title: item.title, url: item.FilesPosts[0].file })}
                                                className="multimedia-dashboard-fotos-img"
                                            >
                                                <i className="ai ai-outline-play-circle" />
                                                <AiOutlinePlayCircle className="multimedia-dashboard-galery-icon" />
                                                <ImagesPost id={item.FilesPosts[0].filesId} />
                                                {/* <img src={`http://img.youtube.com/vi/${getVideoId(item.FilesPosts[0].file)}/mqdefault.jpg`} alt='video' title='video' /> */}
                                                <p>{item.title}</p>
                                            </div>
                                        )
                                    }) : null
                            }

                        </Slider>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MultimediaForm