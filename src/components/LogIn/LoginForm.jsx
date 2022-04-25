import React, { useState, useContext } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl';
import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';
import Modal from '../../common/components/Modal/Modal';
import GlobalContext from '../../context/GlobalContext';
import Images from '../../common/images';

const LoginForm = ({ profileInputs, handeleSignIn, intl, profile, modalActive, modalToggle, userRegister, handeleLang }) => {

    // //ContexState
    const [contextState] = useContext(GlobalContext)

    // const [modalValidaton, setModalValidation] = useState(false);

    const placeholderUser = intl.formatMessage({ id: 'login.username', defaultMessage: 'Username' });
    const placeholderPass = intl.formatMessage({ id: 'login.password', defaultMessage: 'Password' });
    const placeholderEmail = intl.formatMessage({ id: 'modal.input.email', defaultMessage: 'Enter your Email' });
    const placeholderId = intl.formatMessage({ id: 'modal.input.id', defaultMessage: 'Enter your Document ID' });
    // const modalTitle = intl.formatMessage({ id: 'modal.title.forgot', defaultMessage: 'ACCOUNT RECOVERY' });
    // const modalTitleAuth = intl.formatMessage({ id: 'modal.title.authenticate', defaultMessage: 'AUTHENTICATE' });

    const [inputFields, setInputField] = useState([
        { id: 1, name: 'email', type: 'email', placeholder: placeholderEmail },
        { id: 2, name: 'id', type: 'text', placeholder: placeholderId }
    ]);

    return (

        <>
            <Modal
                // modalTitle={modalValidaton ? modalTitleAuth : modalTitle}
                modalActive={modalActive}
                modalToggle={modalToggle}
                inputState={inputFields}
                setInputState={setInputField}
            />

                <figure className="flag-menu">
                    <img className="flag-us-login" src={Images.flagUs} type="button" onClick={() => handeleLang('en-US')} alt="" />
                    <img className="flag-spain-login" src={Images.flagSpain} type="button" onClick={() => handeleLang('es-DR')} alt="" />
                </figure>
            <div className="container-login">
                
                <div className="d-flex justify-content-center">
                    <p className="txt-title">
                        <FormattedMessage id="login.title" defaultMessage="WELCOME" />
                    </p>
                </div>

                <div className="row container-input">

                <div className="d-flex justify-content-center mb-3">
                    <p className="txt-subtitle">
                        <FormattedMessage id="login.subtitle" defaultMessage="Sing in to your account" />
                    </p>
                </div>

                    <form className="" name="loginForm" action="" method="post" /*onSubmit={handeleSignIn}*/>
                        <div className="d-flex justify-content-center container-input-user">
                            <Input
                                name="username"
                                type="text"
                                classInput="login-input"
                                maxLength="16"
                                minLength="4"
                                placeholder={placeholderUser}
                                required
                                onChange={profileInputs}
                                value={profile.username}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <Input
                                name="password"
                                type="password"
                                classInput="login-input"
                                placeholder={placeholderPass}
                                // minLength="8"
                                required
                                onChange={profileInputs}
                                value={profile.password}
                            />
                        </div>
                        <div className="d-flex justify-content-center mt-1">
                            <p className="txt-forgot" onClick={modalToggle}>{<FormattedMessage id="login.forgot" defaultMessage="Forgot Password?" />}</p>
                        </div>
                        <div className="d-flex justify-content-center container-btn-login">
                            <Button
                                className="btn-login"
                                name="btn-submit"
                                type="submit"
                                formatMsgId="login.login"
                                formatMsgDefault="Login"
                                onClick={handeleSignIn}>
                            </Button>
                        </div>
                        <div className="d-flex justify-content-center container-btn-login">
                            <Button
                                className="btn-create"
                                name="btn-create"
                                type="button"
                                formatMsgId="login.create"
                                formatMsgDefault="Create an account"
                                onClick={contextState.token ? userRegister : modalToggle}
                            >
                            </Button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}


export default injectIntl(LoginForm);
