import React from "react";
import { CgFileDocument } from "react-icons/cg";
import Images from "../../common/images";
import { useNavigate } from "react-router-dom";

const RequestMenu = () => {
    const navigate = useNavigate();

    const FormTemple = (module) => {
        navigate(`/servicios/recursoshumanos/solicitudes/${module}`);
    };

    return (
        <>
            <div className="allPostTitle-cont">
                <div className="allPostTitle">
                    <span>
                        <i className="cg cg-file-document" />
                        <CgFileDocument
                            size="3rem"
                            color="#79ADD4"
                            style={{ transform: "rotate(-10deg)", marginBottom: "0.5rem" }}
                        />
                    </span>
                    <p>
                        SOLICITUDES
                    </p>
                </div>
            </div>

            <div className="requestmain-container">
                <div className="requestmain-buttons-container">
                    <div onClick={() => FormTemple("vacaciones")} className="requestmain-button">
                        <div className="requestmain-btn-img">
                            <img src={Images.btnVacation} alt="" />
                        </div>
                        <div className="requestmain-btn-text">
                            <p>Vacaciones</p>
                        </div>
                    </div>
                    <div onClick={() => FormTemple("asistencia")} className="requestmain-button">
                        <div className="requestmain-btn-img">
                            <img src={Images.btnAttendance} alt="" />
                        </div>
                        <div className="requestmain-btn-text">
                            <p>Asistencia</p>
                        </div>
                    </div>
                    <div className="requestmain-button">
                        <div className="requestmain-btn-img">
                            <img src={Images.btnLicense} alt="" />
                        </div>
                        <div className="requestmain-btn-text">
                            <p>Licencias y Permisos</p>
                        </div>
                    </div>
                    <div className="requestmain-button">
                        <div className="requestmain-btn-img">
                            <img src={Images.btnCarnet} alt="" />
                        </div>
                        <div className="requestmain-btn-text">
                            <p>Engrega de carnet</p>
                        </div>
                    </div>
                    <div className="requestmain-button">
                        <div className="requestmain-btn-img">
                            <img src={Images.btnLicense} alt="" />
                        </div>
                        <div className="requestmain-btn-text">
                            <p>Licencias y Permisos</p>
                        </div>
                    </div>
                    <div className="requestmain-button">
                        <div className="requestmain-btn-img">
                            <img src={Images.btnCarnet} alt="" />
                        </div>
                        <div className="requestmain-btn-text">
                            <p>Engrega de carnet</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestMenu;
