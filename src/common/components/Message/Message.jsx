import React from "react";
import Portal from "../../../utils/Portal";

const Message = ({
    message,
    btnConfirmm,
    btnCancel
}) => {

    return (
        <Portal>
            {message.isActive && (
                <div className="wrapper-notification">
                    <div className="window-notification">
                        <div className="modal-title-notification">
                            <p>{message.title}</p>
                            <span className='modal-title-notification-line'></span>
                        </div>
                        {/* <p className="modal-title-notification">{message.title}</p> */}

                        <div className="modal-labelcont-notification">
                            <p>{message.text}</p>
                        </div>

                        <div className="d-flex justify-content-evenly mt-4">
                            <button
                                className="btn-apply-notification"
                                name="btn-Apply"
                                type="button"
                                onClick={btnConfirmm}
                            >
                                Confirmar
                            </button>

                            <button
                                className="btn-cancel-notification"
                                name="btn-cancel"
                                type="button"
                                onClick={btnCancel}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                    <div className="background-notification"></div>
                </div>
            )}
        </Portal>
    );
};

export default Message;
