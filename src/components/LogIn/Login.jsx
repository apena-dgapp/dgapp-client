import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../../context/GlobalContext';
import { apiAuth } from '../../api/auth';
import LoginForm from './LoginForm';
import toast from 'react-hot-toast';
import { injectIntl } from 'react-intl';

const Login = ({ intl }) => {

    const usernameError = intl.formatMessage({ id: 'login.api.username', defaultMessage: 'Please enter your username' });
    const passwordError = intl.formatMessage({ id: 'login.api.password', defaultMessage: 'Please enter your password' });
    const userPassError = intl.formatMessage({ id: 'login.api.userpass', defaultMessage: 'Wrong username or password' });
    const serverError = intl.formatMessage({ id: 'login.api.server', defaultMessage: 'Internal server error' });

    const history = useHistory();
    const [modalActive, setModalActive] = useState(false);

    //InitialState - ContexState
    const [, , contextMiddleware] = useContext(GlobalContext)

    //Estado de tipo objeto profile  que tendra como propiedades el nombre de usuario y contrasena
    const [profile, setProfile] = useState({
        username: '',
        password: '',
        isAuth: false
    });

    //function que sera el controlador de los valores del estado profile, donde por medio del nombre de el input capturara el valor correspondiente. 
    const handleInputChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        })
    }

    //componente para registrar usuario
    const userRegister = () => {
        history.push('./userregister')
    }

    //funcion para llamar un boton con el evento key
    // const clickLogin = event => {
    //     if (event.key === 'Enter') {
    //         loginBtn.current.click()
    //     }
    // }

    //funcion crear nuevo usuario
    const modalToggle = () => {
        setModalActive(!modalActive);
    };

    //funcion encargada de logearse
    const handeleSignIn = (e) => {
        e.preventDefault();

        if (profile.username === "") {
            return toast.error(usernameError);
        } else if (profile.password === "") {
            return toast.error(passwordError);
        };

        //api para autorizar y obtener el token
        apiAuth(profile.username, profile.password)
            .then(res => {
                if (res.status >= 400) throw new toast.error(userPassError);
                return res.json();

            })

            .then(res => {
                contextMiddleware.newToken(res.token);
                contextMiddleware.newUserName(profile.username, res.user.UserRoles[0].roleId === 1 ? true : false, profile.isAuth = true);
                history.push('./dashboard');

            })
            .catch(err => {
                console.log(err.status);
                throw new toast.error(serverError);
            })
    }

    return (
        <>
            <LoginForm
                profileInputs={handleInputChange}
                handeleSignIn={handeleSignIn}
                profile={profile}
                modalActive={modalActive}
                modalToggle={modalToggle}
                userRegister={userRegister}
            />
        </>
    )
}

export default injectIntl(Login);
