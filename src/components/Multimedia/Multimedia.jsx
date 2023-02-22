import React, { useState, useEffect, useContext } from 'react'
import MultimediaForm from './MultimediaForm'
import ImagesGallery from './ImagesGallery'
import VideosGallery from './VideosGallery'
import { getMultimedia, getGallery, imagesCount, getFiles } from "../../api/post";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardPopup from "../Dashboard/DashboardPopup";
import Viewer from "react-viewer";
import GlobalContext from "../../context/GlobalContext";
import Message from "../../common/components/Message/Message";
import { disabledPost } from "../../api/post";
import toast from "react-hot-toast";
import EditImagesGallery from './EditImagesGallery';

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
    const [videoSelected, setVideoSelected] = useState(0);
    const [contextState] = useContext(GlobalContext);
    const [data, setData] = useState([]);
    const [editActive, setEditActive] = useState(false);
    const [message, setMessage] = useState({
        title: "",
        text: "",
        isActive: false
    });

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

        getGallery(currentPage, locationName === "video" ? 4 : 6, related, locationName)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!unmounted) {
                    setItems(res?.rows);
                    if (locationName === "video") {
                        setPageCount(res.count / 4);
                    } else {
                        setPageCount(res.count / 6);
                    }

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

    const handleVideoClick = (index) => {
        setVideoSelected(index)
    }

    //edit and delete
    const messageToggle = (item) => {
        setData(item)
        setMessage({
            title: locationName === "imagenes" ? "ELIMINAR GALERIA" : (locationName === "video" ? "ELIMINAR VIDEO" : null),
            text: locationName === "imagenes" ? "Seguro que desea eliminar esta galeria?" : (locationName === "video" ? "Seguro que desea eliminar este video?" : null),
            isActive: !message.isActive
        })
    };

    const btnConfirmm = () => {
        disabledPost(data.postId)
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error(locationName === "imagenes" ? "Error al intentar eliminar la galeria" : (locationName === "video" ? "Error al intentar eliminar el video" : null));
                } else {
                    navigate(0);
                    return toast.success(locationName === "imagenes" ? "La galeria se elimino exitosamente!" : (locationName === "video" ? "El video se elimino exitosamente!" : null));
                }
            })
            .catch((err) => {
                console.error(err.status);
            });
    }

    const btnCancel = () => {
        setMessage({ title: "", text: "", isActive: !message.isActive })
    };

    //edit images gallery

    const EditToggle = () => {
        setEditActive(!editActive);
    };

    return (
        <>
            <Message
                message={message}
                btnConfirmm={btnConfirmm}
                btnCancel={btnCancel}
            />

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
            <EditImagesGallery
                EditToggle={EditToggle}
                editActive={editActive}
            // uploadFiles={uploadFiles}
            // caption={caption}
            // setCaption={setCaption}
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
                        handlePageClick={handlePageClick}
                        imagesTotal={imagesTotal}
                        getImagesHandler={getImagesHandler}
                        contextState={contextState}
                        messageToggle={messageToggle}
                    // setRelated={setRelated}
                    /> : (locationName === "video" ?
                        < VideosGallery
                            items={items}
                            pageCount={pageCount}
                            handlePageClick={handlePageClick}
                            imagesTotal={imagesTotal}
                            handleVideoClick={handleVideoClick}
                            videoSelected={videoSelected}
                            contextState={contextState}
                            messageToggle={messageToggle}
                        // setRelated={setRelated}
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