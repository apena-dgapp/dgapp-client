import React from 'react';
import Portal from '../../../utils/Portal';
import Input from '../Input/Input';
import Button from '../Button/Button';

const Modal = ({ children, modalToggle, modalActive, inputState, modalTitle }) => {

    return (
        <Portal>
            {modalActive && (
                <div className='wrapper'>
                    <div className='window'>
                        <p className='title' >
                            {modalTitle}
                        </p>

                        <div className='container-input'>
                            {inputState.map((inputField, index,) => (
                                <div className='modal-input' key={inputField.id}>
                                    <Input
                                        name={inputField.name}
                                        type={inputField.type}
                                        placeholder={inputField.placeholder}
                                        required
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="d-flex justify-content-evenly mt-4">
                            <Button
                                className="btn-apply"
                                name="btn-Apply"
                                type="button"
                                formatMsgId="modal.btn.apply"
                                formatMsgDefault="Apply"
                            >
                            </Button>

                            <Button
                                className="btn-cancel"
                                name="btn-cancel"
                                type="button"
                                formatMsgId="modal.btn.cancel"
                                formatMsgDefault="Cancel"
                                onClick={modalToggle}
                            >
                            </Button>
                        </div>

                        <div>{children}</div>
                    </div>
                    <div className="background" onClick={modalToggle}></div>
                </div>
            )}
        </Portal>
    )
}

export default Modal;
