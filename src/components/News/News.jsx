import React, { useState, useEffect, useRef } from 'react'
import NewsForm from './NewsForm'
import { getNews, getOtherNews } from "../../api/news";
import { getPostMultimedia, getPostMultimediaMain, updatePost, disabledPost } from "../../api/post";
import { incrementClick, mostviewedTags } from '../../api/tags';
import { getFiles } from "../../api/post";
import { viewUpdate } from "../../api/post";
import { useNavigate } from "react-router-dom";
import DashboardPopup from "../Dashboard/DashboardPopup";
// import Viewer from "react-viewer";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import EditCardModal from "../../common/components/Card/EditCardModal";
import { getBase64 } from "../../utils/blobManager";
import { convertToHTML } from "draft-convert";
import toast from "react-hot-toast";
import Message from "../../common/components/Message/Message";
import useScreenSize from "../../hooks/useScreenSize";
import ClipLoader from "react-spinners/ClipLoader";
import ImageViewer from "../../common/components/ImageViewer/ImageViewer";

const News = () => {
    const navigate = useNavigate();
    const { width } = useScreenSize();
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [otherNews, setOtherNews] = useState([]);
    const [multimedia, setMultimedia] = useState([]);
    const [multimediaMain, setMultimediaMain] = useState();
    const [modalActive, setModalActive] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [modalData, setModalData] = useState("");
    const [visible, setVisible] = useState(false);
    const [arrayImg, setArrayImg] = useState("");
    const [tags, setTags] = useState([]);
    const [data, setData] = useState([]);
    const [related, setRelated] = useState("");
    const [instagram, setInstagram] = useState([]);
    const [editorState, setEditorState] = useState();
    const [loading, setLoading] = useState(false);
    const [galleryName, setGalleryName] = useState("");
    const [message, setMessage] = useState({
        title: "",
        text: "",
        isActive: false
    });
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: "",
        author: "",
        date: "",
        tags: "",
        action: ""
    });

    useEffect(() => {
        let unmounted = false;

        if (!unmounted) {
            fetch(
                `https://graph.instagram.com/me/media?fields=id,media_type,media_url,permalink,timestamp,caption&limit=3&access_token=${process.env.REACT_APP_INSTAGRAM_TOKEN}`
            )
                .then((res) => res.json())
                .then((data) => {
                    // console.log(data);
                    setInstagram(data.data);
                });
        }

        return () => {
            unmounted = true;
        };
    }, []);

    useEffect(() => {
        let unmounted = false;

        setLoading(true);

        getNews(currentPage, 4, related)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!unmounted) {
                    setItems(res);
                    setPageCount(res.count / 4);
                    setTimeout(() => {
                        if (res) {
                            setLoading(false);
                        }
                    }, 2500);
                    // setPageCount(Math.round(res.count / 4));
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
    }, [currentPage, related]);

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
                            .then(res => res)
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

    const modalToggle = (data) => {
        setModalActive(!modalActive);
        setModalData(data)
    };

    const getImagesHandler = (item) => {
        setLoading(true);
        getFiles(item.postId)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setArrayImg(res);
                setVisible(true);
                setGalleryName(item.title)
                setTimeout(() => {
                    if (res) {
                        setLoading(false);
                    }
                }, 2500);
            })
            .catch((err) => {
                console.error(err.status);
            });
    }

    const handlePageClick = (data) => {
        setCurrentPage(data.selected)
    }

    //edit and delete
    const messageToggle = (item) => {
        setData(item)
        setMessage({ title: "ELIMINAR PUBLICACIÓN", text: "Seguro que desea eliminar esta publicación?", isActive: !message.isActive })
    };
    const btnConfirmm = () => {
        disabledPost(data.postId)
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Error al intentar eliminar la publicación");
                } else {
                    navigate(0);
                    return toast.success("La publicación se elimino exitosamente!");
                }
            })
            .catch((err) => {
                console.error(err.status);
            });
    }

    const btnCancel = () => {
        setMessage({ title: "", text: "", isActive: !message.isActive })
    };

    const handlerInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const seletedHandler = async (e) => {
        // setFormData({ image: (await getBase64(e.target.files[0])) });
        setFormData({
            title: formData.title,
            description: formData.description,
            image: (await getBase64(e.target.files[0])),
            author: formData.author,
            date: formData.date,
            tags: formData.tags,
            action: formData.action
        })
    };

    const refInput = useRef();

    const refBtnImg = useRef();

    const inputDate = () => {
        refInput.current.type = "date";
    };

    const inputText = () => {
        refInput.current.type = "text";
    };

    const changeImg = () => {
        refBtnImg.current.click();
    }

    const removeImg = () => {
        refBtnImg.current.value = "";
        setFormData({
            title: formData.title,
            description: formData.description,
            image: "",
            author: formData.author,
            date: formData.date,
            tags: formData.tags,
            action: formData.action
        })
        // setFormData({ image: "" })
    };

    const EditToggle = (item) => {
        // const state = Object.assign({ item }, { img });
        setData(item);
        setEditorState(EditorState.createWithContent(
            ContentState.createFromBlockArray(
                convertFromHTML(item?.description)
            ),
        ),)
        setEditModal(!editModal);
        setFormData({
            title: item?.title,
            description: item?.description,
            image: item?.image,
            author: item?.author,
            date: item?.createdAt,
            tags: item?.tags,
            action: "News"
        });
    };

    const sendHandlerForm = () => {

        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());

        updatePost(data?.postId, formData.title === "" || formData.title === undefined ? data?.title : formData.title
            , currentContentAsHTML === "<p></p>" ? data?.description : currentContentAsHTML
            , formData.author === "" || formData.author === undefined ? data?.author : formData.author
            , formData.image === "" || formData.image === undefined ? data?.image : formData.image
            , formData.date === "" || formData.date === undefined ? data?.date : formData.date
            , formData.tags === "" || formData.tags === undefined ? data?.tags : formData.tags)
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Error al intentar actualizar");
                } else {
                    setFormData({
                        title: "",
                        description: "",
                        image: "",
                        author: "",
                        date: "",
                        tags: "",
                        action: ""
                    });
                    setEditorState(EditorState.createEmpty());
                    setModalActive(false);
                    navigate(0);
                    return toast.success("Se realizo la actualizo exitosamente!");
                }
            })
            .catch((err) => {
                console.error(err.status);
            });
    }
    return (
        <>
            {loading ? (
                <div className="spinner-container">
                    <ClipLoader color="#113250" loading={loading} size={150} />
                </div>
            ) : (
                <ImageViewer
                    visible={visible}
                    setVisible={setVisible}
                    arrayImg={arrayImg}
                    galleryName={galleryName}
                    length={arrayImg.length - 1}
                />
            )}

            <DashboardPopup
                modalToggle={modalToggle}
                modalActive={modalActive} modalData={modalData}
            />
            <Message
                message={message}
                btnConfirmm={btnConfirmm}
                btnCancel={btnCancel}
            />
            <EditCardModal
                modalToggle={EditToggle}
                modalActive={editModal}
                setModalActive={setEditModal}
                setEditorState={setEditorState}
                editorState={editorState}
                refInput={refInput}
                inputDate={inputDate}
                inputText={inputText}
                handlerInputChange={handlerInputChange}
                formData={formData}
                sendHandlerForm={sendHandlerForm}
                refBtnImg={refBtnImg}
                changeImg={changeImg}
                removeImg={removeImg}
                seletedHandler={seletedHandler}
            />
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
                setRelated={setRelated}
                instagram={instagram}
                EditToggle={EditToggle}
                messageToggle={messageToggle}
                width={width}
                related={related}
            />
        </>

    )
}

export default News