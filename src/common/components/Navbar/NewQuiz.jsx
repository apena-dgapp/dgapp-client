import React from "react";
import Portal from "../.././../utils/Portal";
import { VscDiffAdded } from "react-icons/vsc";
import { MdDeleteForever, MdOutlineClose } from "react-icons/md";

const NewQuiz = ({
    children,
    modalActive,
    formData,
    modalToggle,
    modalInputChange,
    answer,
    addAnswer,
    RemoveAnswer,
    sendQuiz,
    refExpiration,
    expirationDate,
    expirationText
}) => {

    return (
        <Portal>
            {modalActive && (
                <div className="welcome-wrapper">
                    <div className="newquiz-window">
                        <div className="newquiz-close-container">
                            <i className="md md-outline-close" />
                            <MdOutlineClose
                                onClick={modalToggle}
                                className="newquiz-close"
                            />
                        </div>
                        <p className="newquiz-modal-title">CREAR NUEVA ENCUESTA</p>
                        <div className="newquiz-textarea">
                            <textarea
                                name="question"
                                onChange={modalInputChange}
                                maxLength={200}
                                placeholder="Crear una pregunta"
                                value={formData.question}
                            />
                        </div>
                        <div className="newquiz-buttons-cont">
                            <div className="newquiz-buttons">
                                <div>
                                    <i className="cg cg-addr" />
                                    <VscDiffAdded
                                        onClick={addAnswer}
                                        className="newquiz-icons"
                                        cursor={answer.length < 4 ? "pointer" : "default"}
                                        style={{
                                            color: answer.length < 4 ?
                                                "#75AAD3" : "red"
                                        }}
                                    />
                                </div>
                                <div>
                                    {
                                        formData.question.length !== 0 ?
                                            < p style={{
                                                color: formData.question.length < 200 ?
                                                    "#75AAD3" : "red"
                                            }}>{formData.question.length}</p> : null
                                    }
                                </div>
                            </div>
                        </div>

                        {
                            answer.length > 0 ?
                                answer.map((item, key) => {
                                    return (
                                        <div key={key} className="newquiz-inputcont">
                                            <span>
                                                <input
                                                    name={`answers`}
                                                    type="text"
                                                    placeholder={`Respuesta ${key + 1}`}
                                                    required
                                                    onChange={(val) => modalInputChange(val, key)}
                                                    // value={`${formData.answers}${key + 1}`}
                                                    maxLength={50}
                                                />
                                                <i className="md md-delete-forever" />
                                                <MdDeleteForever
                                                    key={item}
                                                    onClick={() => item < 3 ? null : RemoveAnswer(item)}
                                                    className="newquiz-icon-delete"
                                                    style={{ color: item < 3 ? "gainsboro" : null, cursor: item < 3 ? "default" : null }}
                                                />
                                            </span>
                                        </div>
                                    )
                                }) : null
                        }
                        <div className="newquiz-input-expiration">
                            <span>
                                <input
                                    id="expiration"
                                    name="expiration"
                                    type="text"
                                    onBlur={expirationText}
                                    onFocus={expirationDate}
                                    className="inputTitle"
                                    placeholder="Agregar una fecha de caducidad"
                                    onChange={modalInputChange}
                                    value={formData.expiration || ""}
                                    ref={refExpiration}
                                />
                            </span>
                        </div>
                        <div className="d-flex justify-content-center mt-4 mb-4">
                            <button
                                className="quiz-create-btn"
                                name="btn-Apply"
                                type="button"
                                onClick={sendQuiz}
                            >
                                Crear
                            </button>
                        </div>

                        <div>{children}</div>
                    </div>
                    <div onClick={modalToggle} className="welcome-background"></div>
                </div>
            )}
        </Portal>
    );
};

export default NewQuiz;