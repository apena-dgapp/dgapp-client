import React from 'react'
import Images from "../../common/images/index";
import DOMPurify from "dompurify";
import useScreenSize from "../../hooks/useScreenSize";

const DashboardSection8 = ({ notices, quiz, HandlerAnswer, exists, ansowerCount }) => {
    const { width } = useScreenSize();
    const createMarkup = (html) => {
        return {
            __html: DOMPurify.sanitize(html),
        };
    };

    return (
        <>
            {
                notices.length > 0 ?
                    <>
                        <div className="dashboard-section-2-line-cont">
                            <div className="dashboard-section-3-line"></div>
                        </div>
                        <div className="dashboard-section-2-notices">
                            <div className="dashboard-section-2-notices-txt-cont">
                                <div className="dashboard-section-2-notices-txt">
                                    <p style={{ fontSize: width < 5021 ? "1.3rem" : "2.3rem", fontWeight: "bold" }}>{notices[0]?.title}</p>
                                    <p dangerouslySetInnerHTML={createMarkup(notices[0]?.description)}></p>
                                </div>
                                <div className="dashboard-section-2-notices-separte"></div>
                                <div className="dashboard-section-2-notices-txt">
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