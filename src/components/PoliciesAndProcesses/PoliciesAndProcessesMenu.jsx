import React from "react";
import Images from "../../common/images";
import { useNavigate } from "react-router-dom";

const ResourcesMenu = () => {
    const navigate = useNavigate();

    const policiesProcesses = (form) => {
        navigate(`/nosotros/politicas&procesos/${form}`);
    };

    return (
        <>
            <div className="news-container">
                <div className="news-title">
                    <p>POLÍTICAS Y PROCESOS</p>
                    <span className='news-title-line'></span>
                </div>

                <div className="requestmain-container">
                    <div className="resources-buttons-container">
                        <div onClick={() => policiesProcesses("politicas")} className="requestmain-button">
                            <div className="requestmain-btn-img">
                                <img src={Images.policies} alt="" />
                            </div>
                            <div className="requestmain-btn-text">
                                <p>Políticas</p>
                            </div>
                        </div>
                        <div onClick={() => policiesProcesses("procesos")} className="requestmain-button">
                            <div className="requestmain-btn-img">
                                <img src={Images.process} alt="" />
                            </div>
                            <div className="requestmain-btn-text">
                                <p>Procesos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResourcesMenu;
