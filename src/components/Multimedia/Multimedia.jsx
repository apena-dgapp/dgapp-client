import React, { useState, useEffect } from 'react'
import MultimediaForm from './MultimediaForm'
import ImagesGallery from './ImagesGallery'
import VideosGallery from './VideosGallery'
import { getMultimedia, getGallery, imagesCount, getFiles } from "../../api/post";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardPopup from "../Dashboard/DashboardPopup";
import Viewer from "react-viewer";

const Multimedia = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [imagesFiles, setImagesFiles] = useState("");
    const [videoFiles, setVideosFiles] = useState("");
    const [visible, setVisible] = useState(false);
    const [arrayImg, setArrayImg] = useState("");
    const [modalActive, setModalActive] = useState(false);
    const [modalData, setModalData] = useState("");
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [related, setRelated] = useState("");
    const [imagesTotal, setImagesTotal] = useState("");

    var locationName = location.pathname.split('/')[3];

    useEffect(() => {
        let unmounted = false;

        getMultimedia("Multimedia", 9, "imagenes")
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (!unmounted) {
                    setImagesFiles(data);
                    console.log(data);
                }
            })
            .catch((err) => {
                console.error(err.status);
            });

        getMultimedia("Multimedia", 9, "video")
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (!unmounted) {
                    setVideosFiles(data);
                    console.log(data);
                }
            })
            .catch((err) => {
                console.error(err.status);
            });

        return () => {
            unmounted = true;
        };

    }, []);

    useEffect(() => {
        let unmounted = false;

        getGallery(currentPage, 6, related, locationName)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!unmounted) {
                    setItems(res?.rows);
                    setPageCount(res.count / 6);
                    setImagesTotal([]);
                    // setPageCount(Math.round(res.count / 4))
                    res?.rows.map((item, index) => {
                        return (
                            imagesCount(item.postId)
                                .then((res) => {
                                    return res.json();
                                })
                                .then((res) => {
                                    setImagesTotal(imagesTotal => [...imagesTotal, res])
                                })
                        )
                    })
                }
            })
            .catch((err) => {
                console.error(err.status);
            });

        return () => {
            unmounted = true;
        };
    }, [currentPage, related, locationName]);

    const goTomultimedia = (form) => {
        navigate(`/publicaciones/multimedia/${form}`);
    };

    const getImagesHandler = (id) => {
        getFiles(id)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setArrayImg(res);
                setVisible(true);
            })
            .catch((err) => {
                console.error(err.status);
            });
    }

    const modalToggle = (data) => {
        setModalActive(!modalActive);
        setModalData(data)
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
    }

    return (
        <>
            <Viewer
                visible={visible}
                images={arrayImg.files}
                onClose={() => {
                    setVisible(false);
                }}
                zoomSpeed={0.2}
                // activeIndex={activeIndex}
                downloadable
                noImgDetails={true}
            />
            <DashboardPopup
                modalToggle={modalToggle}
                modalActive={modalActive} modalData={modalData}
            />
            {
                locationName === "imagenes" ?
                    < ImagesGallery
                        items={items}
                        pageCount={pageCount}
                        // setRelated={setRelated}
                        handlePageClick={handlePageClick}
                        imagesTotal={imagesTotal}
                        getImagesHandler={getImagesHandler}
                    /> : (locationName === "video" ? < VideosGallery
                        items={items}
                        pageCount={pageCount}
                        // setRelated={setRelated}
                        handlePageClick={handlePageClick}
                        imagesTotal={imagesTotal}
                    /> : < MultimediaForm
                        imagesFiles={imagesFiles}
                        videoFiles={videoFiles}
                        goTomultimedia={goTomultimedia}
                        getImagesHandler={getImagesHandler}
                        modalToggle={modalToggle}
                        pageCount={pageCount}
                    />)
            }

        </>
    )
}

export default Multimedia