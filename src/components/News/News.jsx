import React, { useState, useEffect } from 'react'
import NewsForm from './NewsForm'
import { getNews, getOtherNews } from "../../api/news";
import { getPostMultimedia, getPostMultimediaMain } from "../../api/post";
import { incrementClick, mostviewedTags } from '../../api/tags';
import { getFiles } from "../../api/post";
import { viewUpdate } from "../../api/post";
import { useNavigate } from "react-router-dom";
import DashboardPopup from "../Dashboard/DashboardPopup";
import Viewer from "react-viewer";

const News = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [otherNews, setOtherNews] = useState([]);
    const [multimedia, setMultimedia] = useState([]);
    const [multimediaMain, setMultimediaMain] = useState();
    const [modalActive, setModalActive] = useState(false);
    const [modalData, setModalData] = useState("");
    const [visible, setVisible] = useState(false);
    const [arrayImg, setArrayImg] = useState("");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        let unmounted = false;

        getNews(currentPage, 4)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!unmounted) {
                    setItems(res);
                    setPageCount(Math.round(res.count / 4))
                }
            })
            .catch((err) => {
                console.error(err.status);
            });

        getOtherNews()
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!unmounted) {
                    setOtherNews(res);
                }
            })
            .catch((err) => {
                console.error(err.status);
            });

        return () => {
            unmounted = true;
        };
    }, [currentPage]);

    useEffect(() => {
        let unmounted = false;

        mostviewedTags()
            .then(res => res.json())
            .then((res) => {
                if (!unmounted) {
                    setTags(res);
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

        getPostMultimediaMain("Multimedia", 1)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!unmounted) {
                    setMultimedia(res[0]);
                    res.map((item, index) => {
                        return setMultimediaMain({
                            id: item.postId,
                            title: item.title,
                            url: item.FilesPosts[index].file,
                        });
                    });

                    getPostMultimedia("Multimedia", 5)
                        .then((data) => {
                            return data.json();
                        })
                        .then((data) => {
                            if (!unmounted) {
                                setMultimedia((data?.filter((item) => item.postId !== res[0].postId)));
                            }
                        })
                        .catch((err) => {
                            console.error(err.status);
                        });


                }
            })
            .catch((err) => {
                console.error(err.status);
            });

        return () => {
            unmounted = true;
        };
    }, []);

    const goToPost = (item) => {
        if (item?.tags) {
            var arr
            arr = item?.tags.split(/[{","}]+/);
            arr.map((item) => {
                return (
                    item ?
                        incrementClick(item)
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => {
                                return console.error(err.status);
                            }) : null
                )
            })
        }
        viewUpdate(item.postId)
            .then((res) => {
                navigate(`/publicaciones/noticias/${item.title.toLowerCase()}`, {
                    state: {
                        id: item.postId,
                        title: item.title,
                        img: item.image,
                        description: item.description,
                        date: item.createdAt,
                        author: item.author,
                        createdby: item.createdBy,
                        tags: item.tags
                    },
                });
            })
            .catch((err) => {
                console.error(err.status);
                return;
            });
    };

    const modalToggle = (data) => {
        setModalActive(!modalActive);
        setModalData(data)
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
            />
            <DashboardPopup modalToggle={modalToggle} modalActive={modalActive} modalData={modalData} />
            <NewsForm
                handlePageClick={handlePageClick}
                items={items}
                pageCount={pageCount}
                multimedia={multimedia}
                multimediaMain={multimediaMain}
                goToPost={goToPost}
                modalToggle={modalToggle}
                getImagesHandler={getImagesHandler}
                otherNews={otherNews}
                tags={tags}
            />
        </>

    )
}

export default News