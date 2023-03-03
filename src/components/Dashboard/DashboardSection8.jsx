import React, { useContext, useState } from 'react'
import Images from "../../common/images/index";
import DOMPurify from "dompurify";
import useScreenSize from "../../hooks/useScreenSize";
import { FiEdit } from "react-icons/fi";
import { CiSquareRemove } from "react-icons/ci";
import GlobalContext from "../../context/GlobalContext";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { convertToHTML } from "draft-convert";
import Message from "../../common/components/Message/Message";
import { updatePost, disabledPost } from "../../api/post";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import EditCardModal from "../../common/components/Card/EditCardModal";

const DashboardSection8 = ({ notices, quiz, HandlerAnswer, exists, ansowerCount }) => {
    const [contextState] = useContext(GlobalContext);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [editorState, setEditorState] = useState();
    const [editModal, setEditModal] = useState(false);
    const { width } = useScreenSize();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });
    const [message, setMessage] = useState({
        title: "",
        text: "",
        isActive: false
    });

    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        };
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
            action: "Notices"
        });
    };

    const handlerInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const sendHandlerForm = () => {

        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());

        updatePost(data?.postId, formData.title === "" || formData.title === undefined ? data?.title : formData.title
            , currentContentAsHTML === "<p></p>" ? data?.description : currentContentAsHTML
            , data?.author
            , data?.image
            , data?.date
            , data?.tags)
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Error al intentar actualizar");
                } else {
                    setFormData({
                        title: "",
                        description: "",
                    });
                    setEditorState(EditorState.createEmpty());
                    navigate(0);
                    return toast.success("Se realizo la actualizo exitosamente!");
                }
            })
            .catch((err) => {
                console.error(err.status);
            });
    }

    //edit and delete
    const messageToggle = (item) => {
        setData(item)
        setMessage({ title: "ELIMINAR AVISO", text: "Seguro que desea eliminar este aviso?", isActive: !message.isActive })
    };

    const btnConfirmm = () => {
        disabledPost(data.postId)
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Error al intentar eliminar el aviso");
                } else {
                    navigate(0);
                    return toast.success("el aviso se elimino exitosamente!");
                }
            })
            .catch((err) => {
                console.error(err.status);
            });
    }

    const btnCancel = () => {
        setMessage({ title: "", text: "", isActive: !message.isActive })
    };

    return (
        <>
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
                handlerInputChange={handlerInputChange}
                formData={formData}
                sendHandlerForm={sendHandlerForm}
            />
            {
                notices.length > 0 ?
                    <>
                        <div className="dashboard-section-2-line-cont">
                            <div className="dashboard-section-3-line"></div>
                        </div>
                        <div className="dashboard-section-2-notices">
                            <div className="dashboard-section-2-notices-txt-cont">
                                <div className="dashboard-section-2-notices-txt">
                                    {(contextState.userRole === 1 || contextState.userRole === 3) && notices[0]?.description ?
                                        <div className="dashboard-section-2-notices-icons">
                                            <span onClick={() => EditToggle(notices[0])}>
                                                <i className="fi fi-edit" />
                                                <FiEdit
                                                    style={{ cursor: "pointer", marginRight: '0.5rem' }}
                                                    size="1.1rem"
                                                    color="#FBB454"
                                                />
                                            </span>
                                            <span onClick={() => messageToggle(notices[0])}>
                                                <i className="ci ci-square-remove" />
                                                <CiSquareRemove
                                                    style={{ cursor: "pointer" }}
                                                    size="1.2rem"
                                                    color="#FB2576"
                                                />
                                            </span>
                                        </div> : null}
                                    <p style={{ fontSize: width < 5021 ? "1.3rem" : "2.3rem", fontWeight: "bold" }}>{notices[0]?.title}</p>
                                    <p dangerouslySetInnerHTML={createMarkup(notices[0]?.description)}></p>
                                </div>
                                <div className="dashboard-section-2-notices-separte"></div>
                                <div className="dashboard-section-2-notices-txt">
                                    {(contextState.userRole === 1 || contextState.userRole === 3) && notices[1]?.description ?
                                        <div className="dashboard-section-2-notices-icons">
                                            <span onClick={() => EditToggle(notices[1])}>
                                                <i className="fi fi-edit" />
                                                <FiEdit
                                                    style={{ cursor: "pointer", marginRight: '0.5rem' }}
                                                    size="1.1rem"
                                                    color="#FBB454"
                                                />
                                            </span>
                                            <span onClick={() => messageToggle(notices[1])}>
                                                <i className="ci ci-square-remove" />
                                                <CiSquareRemove
                                                    style={{ cursor: "pointer" }}
                                                    size="1.2rem"
                                                    color="#FB2576"
                                                />
                                            </span>
                                        </div> : null}
                                    <p style={{ fontSize: width < 5021 ? "1.3rem" : "2.3rem", fontWeight: "bold" }}>{notices[1]?.title}</p>
                                    <p dangerouslySetInnerHTML={createMarkup(notices[1]?.description)}></p>
                                </div>
                            </div>
                            <div className="dashboard-section-2-notices-img-cont">
                                <div className="dashboard-section-2-notices-img">
                                    <img src={Images.notices} alt="" />
                                </div>
                            </div>
                        </div>
                    </> : (quiz.length > 0 ? <>
                        <div className="dashboard-section-2-quiz">
                            <div className="dashboard-section-2-quiz-title">
                                <p>ENCUESTA</p>
                                <div className="dashboard-section-2-quiz-title-line"></div>
                            </div>
                            <div className="dashboard-section-2-quiz-question-cont">
                                <div className="dashboard-section-2-quiz-question">
                                    <p>{quiz[0]?.question}</p>
                                </div>
                            </div>
                            <div className="dashboard-section-2-quiz-ansowers">
                                {
                                    exists && 1 in ansowerCount ?
                                        <div className="dashboard-section-2-quiz-ansower-cont">
                                            <p className="dashboard-section-2-quiz-ansower-text">{quiz[0]?.answer1}</p>
                                            <div style={{ "width": (ansowerCount[1] / quiz[0]?.Answers.length) * 100 + "%" }} className="dashboard-section-2-quiz-ansower-count">
                                                <p>{((ansowerCount[1] / quiz[0]?.Answers.length) * 100).toFixed() + "%"}</p>
                                            </div>
                                        </div>
                                        : (quiz[0]?.answer1 && !exists ? <div onClick={() => HandlerAnswer(1)} className="dashboard-section-2-quiz-ansower">
                                            <p>{quiz[0]?.answer1}</p>
                                        </div> : null)
                                }

                                {
                                    exists && 2 in ansowerCount ?
                                        <div className="dashboard-section-2-quiz-ansower-cont">
                                            <p className="dashboard-section-2-quiz-ansower-text">{quiz[0]?.answer2}</p>
                                            <div style={{ "width": (ansowerCount[2] / quiz[0]?.Answers.length) * 100 + "%" }} className="dashboard-section-2-quiz-ansower-count">
                                                <p>{((ansowerCount[2] / quiz[0]?.Answers.length) * 100).toFixed() + "%"}</p>
                                            </div>
                                        </div>
                                        : (quiz[0]?.answer2 && !exists ? <div onClick={() => HandlerAnswer(2)} className="dashboard-section-2-quiz-ansower">
                                            <p>{quiz[0]?.answer2}</p>
                                        </div> : null)
                                }

                                {
                                    exists && 3 in ansowerCount ?
                                        <div className="dashboard-section-2-quiz-ansower-cont">
                                            <p className="dashboard-section-2-quiz-ansower-text">{quiz[0]?.answer3}</p>
                                            <div style={{ "width": (ansowerCount[3] / quiz[0]?.Answers.length) * 100 + "%" }} className="dashboard-section-2-quiz-ansower-count">
                                                <p>{((ansowerCount[3] / quiz[0]?.Answers.length) * 100).toFixed() + "%"}</p>
                                            </div>
                                        </div>
                                        : (quiz[0]?.answer3 && !exists ? <div onClick={() => HandlerAnswer(3)} className="dashboard-section-2-quiz-ansower">
                                            <p>{quiz[0]?.answer3}</p>
                                        </div> : null)
                                }

                                {
                                    exists && 4 in ansowerCount ?
                                        <div className="dashboard-section-2-quiz-ansower-cont">
                                            <p className="dashboard-section-2-quiz-ansower-text">{quiz[0]?.answer4}</p>
                                            <div style={{ "width": (ansowerCount[4] / quiz[0]?.Answers.length) * 100 + "%" }} className="dashboard-section-2-quiz-ansower-count">
                                                <p>{((ansowerCount[4] / quiz[0]?.Answers.length) * 100).toFixed() + "%"}</p>
                                            </div>
                                        </div>
                                        : (quiz[0]?.answer4 && !exists ? <div onClick={() => HandlerAnswer(4)} className="dashboard-section-2-quiz-ansower">
                                            <p>{quiz[0]?.answer4}</p>
                                        </div> : null)
                                }

                            </div>
                            <div className="dashboard-section-2-quiz-vote-cont">
                                <div className="dashboard-section-2-quiz-vote">
                                    <p>{`${quiz[0]?.Answers.length} Votos`}</p>
                                </div>
                            </div>
                        </div>
                    </> : null)
            }

        </>
    )
}

export default DashboardSection8