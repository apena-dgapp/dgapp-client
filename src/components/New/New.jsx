import React, { useState, useEffect, useContext } from 'react'
import NewForm from './NewForm'
import { useLocation, useNavigate } from "react-router-dom";
import GlobalContext from "../../context/GlobalContext";
import { getNews, getRelated } from "../../api/news";
import { incrementClick } from '../../api/tags';
import { viewUpdate } from "../../api/post";
import { addCommentPost, getComments, giveLike, countLike, getPostMultimedia, deleteComment } from "../../api/post";
import { getFiles } from "../../api/post";
import toast from "react-hot-toast";
import Viewer from "react-viewer";
import DashboardPopup from "../Dashboard/DashboardPopup";

const New = () => {
    const [contextState] = useContext(GlobalContext);
    const location = useLocation();
    const navigate = useNavigate();
    const dataPost = location.state;
    const [recentNews, setRecentNews] = useState([]);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [selectedLike, SetselectedLike] = useState(false);
    const [selectedDislike, SetselectedDislike] = useState(false);
    const [like, setLike] = useState([]);
    const [dislike, setDislike] = useState([]);
    const [multimedia, setMultimedia] = useState([]);
    const [modalActive, setModalActive] = useState(false);
    const [modalData, setModalData] = useState("");
    const [visible, setVisible] = useState(false);
    const [arrayImg, setArrayImg] = useState("");
    const [related, setRelated] = useState([]);

    useEffect(() => {
        let unmounted = false;

        countLike(dataPost.id, "like")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!unmounted) {
                    setLike(res.count);
                    let ownLike = res?.rows.find(o => o.personId === contextState.personId);
                    if (ownLike) {
                        SetselectedLike(true);
                        SetselectedDislike(false);
                    }
                }
            })
            .catch((err) => {
                console.error(err.status);
            });

        countLike(dataPost.id, "dislike")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!unmounted) {
                    setDislike(res.count)
                    let ownLike = res?.rows.find(o => o.personId === contextState.personId);
                    if (ownLike) {
                        SetselectedDislike(true);
                        SetselectedLike(false);
                    }
                }
            })
            .catch((err) => {
                console.error(err.status);
            });

        return () => {
            unmounted = true;
        };
    }, [dataPost.id, contextState.personId]);

    useEffect(() => {
        let unmounted = false;
        dataPost?.tagsArray.map((item, index) => {

            return (
                index <= 2 ?
                    getRelated(dataPost.id, item)
                        .then((res) => {
                            return res.json();
                        })
                        .then((res) => {
                            if (!unmounted) {
                                setRelated((related) => [...related, ...res]);
                            }
                        })
                        .catch((err) => {
                            console.error(err.status);
                        }) : null
            )
        })

        getNews(0, 3, "")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!unmounted) {
                    setRecentNews(res);
                }
            })
            .catch((err) => {
                console.error(err.status);
            });

        return () => {
            unmounted = true;
        };
    }, [dataPost]);

    useEffect(() => {
        let unmounted = false;

        getComments(dataPost.id)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!unmounted) {
                    setComments(res);
                }
            })
            .catch((err) => {
                console.error(err.status);
            });

        return () => {
            unmounted = true;
        };
    }, [dataPost]);

    useEffect(() => {
        let unmounted = false;

        getPostMultimedia("Multimedia", 3)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                if (!unmounted) {
                    setMultimedia(data);
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
                        tags: item.tags,
                        tagsArray: arr
                    },
                });
            })
            .catch((err) => {
                console.error(err.status);
                return;
            });
    };

    const handlerTextareaChange = (e) => {
        setComment(e.target.value || "");
    };

    const sendComment = () => {
        if (!comment) {
            return toast.error("Antes de enviar debes agregar un comentario");
        }
        addCommentPost(dataPost.id, contextState.personId, comment)
            .then((res) => {
                if (res.status !== 500) {
                    setComment("");
                    getComments(dataPost.id)
                        .then((res) => {
                            return res.json();
                        })
                        .then((res) => {
                            setComments(res);
                        })
                        .catch((err) => {
                            console.error(err.status);
                        });
                    return toast.success("Su mensaje fue enviado exitosamente!");
                } else {
                    return toast.error("Error del servidor");
                }
            })
            .catch((err) => {
                console.error(err.status);
                return toast.error("Error del servidor");
            });
    };

    const handlerLike = (action) => {

        giveLike(dataPost.id, contextState.personId, action)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                // console.log(res);
                if (res === 200) {
                    countLike(dataPost.id, "like")
                        .then((res) => {
                            return res.json();
                        })
                        .then((res) => {
                            setLike(res.count);
                            let ownLike = res?.rows.find(o => o.personId === contextState.personId);
                            if (ownLike) {
                                SetselectedLike(true);
                                SetselectedDislike(false);
                            }
                        })
                        .catch((err) => {
                            console.error(err.status);
                        });

                    countLike(dataPost.id, "dislike")
                        .then((res) => {
                            return res.json();
                        })
                        .then((res) => {
                            setDislike(res.count)
                            let ownLike = res?.rows.find(o => o.personId === contextState.personId);
                            if (ownLike) {
                                SetselectedDislike(true);
                                SetselectedLike(false);
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
    }

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

    // console.log(`LIKE: ${selectedLike} ---- DISLIKE: ${selectedDislike}`);

    const removeComment = (id) => {
        deleteComment(id)
            .then((res) => {
                if (res.status !== 500) {
                    setComment("");
                    getComments(dataPost.id)
                        .then((res) => {
                            return res.json();
                        })
                        .then((res) => {
                            setComments(res);
                        })
                        .catch((err) => {
                            console.error(err.status);
                        });
                }
            })
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
            <NewForm
                dataPost={dataPost}
                recentNews={recentNews}
                goToPost={goToPost}
                comments={comments}
                comment={comment}
                handlerTextareaChange={handlerTextareaChange}
                sendComment={sendComment}
                selectedLike={selectedLike}
                SetselectedLike={SetselectedLike}
                selectedDislike={selectedDislike}
                SetselectedDislike={SetselectedDislike}
                handlerLike={handlerLike}
                like={like}
                dislike={dislike}
                multimedia={multimedia}
                modalToggle={modalToggle}
                getImagesHandler={getImagesHandler}
                related={related}
                removeComment={removeComment}
                personId={contextState.personId}
            />
        </>

    )
}

export default New