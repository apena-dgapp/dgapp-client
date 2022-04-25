import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import GlobalContext from '../../../context/GlobalContext';
import NavbarForm from './NavbarForm';

const Header = () => {

    const history = useHistory();

    //InitialState - ContexState
    const [, , contextMiddleware] = useContext(GlobalContext);

    //funcion para setear lenguaje
    const setLanguage = (lang) => {
        contextMiddleware.implementationLang(lang);
    };

    const logOut = () => {
        contextMiddleware.signOut();
        history.push('/')
    };

    return (
        <>
            <NavbarForm
                handeleLang={setLanguage}
                logOut={logOut}
            />
        </>
    )
}

export default Header
