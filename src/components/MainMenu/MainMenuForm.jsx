import React from 'react';
import { Link } from 'react-router-dom';
import Images from '../../common/images';

const MainMenuForm = () => {
    return (
        <>
            <div className='main-container-login d-flex justify-content-center'>
                <div className="row col-10 mainmenu-container">
                    <div className="col-3 mainmenu-btn">
                        <Link to="" style={{ textDecoration: 'none' }} >
                            <figure className="row d-flex flex-column justify-content-center align-items-center mt-2 pt-3">
                                <img className="mainmenu-btn-img" src={Images.iconPay} />
                                <p className="mainmenu-btn-txt">Pay Security</p>
                            </figure>
                        </Link>
                    </div>
                    <div className="col-3 mainmenu-btn">
                        <Link to="" style={{ textDecoration: 'none' }} >
                            <figure className="row d-flex flex-column justify-content-center align-items-center mt-2 pt-3">
                                <img className="mainmenu-btn-img" src={Images.iconPayCar} />
                                <p className="mainmenu-btn-txt">Pay RFID</p>
                            </figure>
                        </Link>
                    </div>
                    <div className="col-3 mainmenu-btn">
                        <Link to="" style={{ textDecoration: 'none' }} >
                            <figure className="row d-flex flex-column justify-content-center align-items-center mt-2 pt-3">
                                <img className="mainmenu-btn-img" src={Images.report} />
                                <p className="mainmenu-btn-txt">Reports</p>
                            </figure>
                        </Link>
                    </div>
                </div>
            </div >
        </>
    )
}

export default MainMenuForm
