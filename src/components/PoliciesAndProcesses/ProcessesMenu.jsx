import React from "react";
import Images from "../../common/images";
import { useNavigate } from "react-router-dom";

const ProcessesMenu = () => {
    const navigate = useNavigate();

    const policiesProcesses = (form) => {
        navigate(`/nosotros/politicas&procesos/${form}`);
    };

    return (
        <>

            <div className="news-container">
                <div className="news-title">
                    <p>PROCESOS</p>
                    <span className='news-title-line'></span>
                </div>

                <div className="requestmain-container">
                    <div className="resources-buttons-container">
                        <div onClick={() => policiesProcesses("recursos humanos")} className="requestmain-button">
                            <div className="requestmain-btn-img">
                                <img src={Images.recursosHumanos} alt="" />
                            </div>
                            <div className="requestmain-btn-text">
                                <p>Recursos humanos</p>
                            </div>
                        </div>
                        <div onClick={() => policiesProcesses("planificacion y desarrollo")} className="requestmain-button">
                            <div className="requestmain-btn-img">
                                <img src={Images.planificacion} alt="" />
                            </div>
                            <div className="requestmain-btn-text">
                                <p>Planificación y desarrollo</p>
                            </div>
                        </div>
                        <div onClick={() => policiesProcesses("administracion financiera")} className="requestmain-button">
                            <div className="requestmain-btn-img">
                                <img src={Images.finanza} alt="" />
                            </div>
                            <div className="requestmain-btn-text">
                                <p>Administración financiera</p>
                            </div>
                        </div>
                        <div onClick={() => policiesProcesses("subdireccion de supervision y gestion")} className="requestmain-button">
                            <div className="requestmain-btn-img">
                                <img src={Images.gestion} alt="" />
                            </div>
                            <div className="requestmain-btn-text">
                                <p>Supervisión y gestión</p>
                            </div>
                        </div>
                        <div onClick={() => policiesProcesses("subdireccion de promocion")} className="requestmain-button">
                            <div className="requestmain-btn-img">
                                <img src={Images.promosion} alt="" />
                            </div>
                            <div className="requestmain-btn-text">
                                <p>Promoción</p>
                            </div>
                        </div>
                        <div onClick={() => policiesProcesses("subdireccion tecnica")} className="requestmain-button">
                            <div className="requestmain-btn-img">
                                <img src={Images.subdireccion} alt="" />
                            </div>
                            <div className="requestmain-btn-text">
                                <p>Subdirección técnica</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProcessesMenu;
