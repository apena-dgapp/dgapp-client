import React from 'react'
import { FormattedMessage, injectIntl } from 'react-intl';
import Input from '../../common/components/Input/Input';
import Button from '../../common/components/Button/Button';

const RegisterForm = ({ intl, btnCancel, registerForm, handleRegisterForm, handeleCreateUser }) => {

    const userName = intl.formatMessage({ id: 'register.username', defaultMessage: 'Enter a Username' });
    const email = intl.formatMessage({ id: 'register.email', defaultMessage: 'Enter an email address' });
    const password = intl.formatMessage({ id: 'register.password', defaultMessage: 'Enter a Password' });
    const confirmPass = intl.formatMessage({ id: 'register.confirmpass', defaultMessage: 'Please confirm the password' });

    return (
        <>
            <div className="">

                <div className="d-flex justify-content-center">
                    <p className="txt-title">
                        <FormattedMessage id="register.title" defaultMessage="REGISTER" />
                    </p>
                </div>

                <div className="d-flex justify-content-center">
                    <p className="txt-subtitle">
                        <FormattedMessage id="register.subtitle" defaultMessage="Please complete all the fields to create a new user" />
                    </p>
                </div>

                <form className="registerform" name="registerform" action="" method="post" /*onSubmit={handeleSignIn}*/>
                    <div className='register-container-input'>
                        <div className='inputs'>

                            <div className="mb-4">
                                <Input
                                    name="username"
                                    type="text"
                                    placeholder={userName}
                                    minLength="4"
                                    maxLength="10"
                                    required
                                    onChange={handleRegisterForm}
                                    value={registerForm.username}
                                />

                            </div>
                            <div className="mb-4">
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder={email}
                                    // minLength="4"
                                    // maxLength="8"
                                    required
                                    onChange={handleRegisterForm}
                                    value={registerForm.email}
                                />
                            </div>
                            <div className="">
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder={password}
                                    minLength="4"
                                    maxLength="8"
                                    required
                                    onChange={handleRegisterForm}
                                    value={registerForm.password}
                                />
                            </div>
                            <div className="">
                                <Input
                                    name="confirmpassword"
                                    type="password"
                                    placeholder={confirmPass}
                                    minLength="4"
                                    maxLength="8"
                                    required
                                // onChange={profileInputs}
                                // value={profile.password}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="d-flex justify-content-evenly mt-4">
                        <Button
                            className="btn-apply"
                            name="btn-Apply"
                            type="button"
                            formatMsgId="modal.btn.apply"
                            formatMsgDefault="Apply"
                            onClick={handeleCreateUser}
                        >
                        </Button>

                        <Button
                            className="btn-cancel"
                            name="btn-cancel"
                            type="button"
                            formatMsgId="modal.btn.cancel"
                            formatMsgDefault="Cancel"
                            onClick={btnCancel}
                        >
                        </Button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default injectIntl(RegisterForm);