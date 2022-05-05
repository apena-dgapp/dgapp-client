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
        history.push('./home')
    };

    const createPost = () => {
        history.push('./newpost')
    };

    const correspo = () => {
        history.push('./correspondence')
    };

    return (
        <>
            <NavbarForm
                handeleLang={setLanguage}
                logOut={logOut}
                createPost={createPost}
                correspo={correspo}
            />
        </>
    )
}

export default Header
