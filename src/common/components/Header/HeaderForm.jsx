import React, { useContext } from 'react';
import Images from '../../../common/images';
import GlobalContext from '../../../context/GlobalContext';

const HeaderForm = ({ handeleLang, logOut }) => {
    const [contextState] = useContext(GlobalContext)
    return (
        <>
            <header className="row header-container d-flex">
                <figure className="col">
                    <img className="img-dgapp" src={Images.dgappLogo} alt="" />
                </figure>

                <figure className="col d-flex justify-content-end">
                    <img className="flag-us" src={Images.flagUs} type="button" onClick={() => handeleLang('en-US')} alt="" />
                    <img className="flag-spain" src={Images.flagSpain} type="button" onClick={() => handeleLang('es-DR')} alt="" />
                    <img className="user-icon" style={{ display: contextState.token ? 'block' : 'none' }} src={Images.iconUser} onClick={() => logOut()} type="button" alt="" />
                    <div className="user-text" onClick={() => logOut()}>{contextState.userName}</div>
                </figure>
            </header>
        </>
    )
}

export default HeaderForm
