import React, { useEffect, useState } from 'react'
import Vacation from './Vacation'
import { useLocation } from "react-router-dom";
import { apiOneFile } from "../../../api/files.js"

const FormTemple = () => {
    const [img, setImg] = useState("");
    const location = useLocation();
    const [getModule, setGetModule] = useState("");

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            apiOneFile("DRH-FO-002 -Formulario Solicitud de Vacaciones. V.0")
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setImg(res.file)
                })
                .catch((err) => {
                    console.error(err.status);
                });
        }

        return () => {
            unmounted = true;
        };
    }, []);

    useEffect(() => {
        if (location.state.title) {
            if (location.state.title === "Vacaciones") {
                setGetModule(<Vacation img={img} profile={location.state} />);
            } else if (location.state.title === "FUNCIONES") {
                // setGetModule(<Functions />);
            } else if (location.state.title === "MARCO INSTITUCIONAL") {
                // setGetModule(<InstitutionalFramework />);
            } else if (location.state.title === "DIRECTOR GENERAL") {
                // setGetModule(<Director />);
            } else if (location.state.title === "ORGANIGRAMA") {
                // setGetModule(<OrganizationChart />);
            }
        }
    }, [location.state, img]);

    return (
        <>
            <div className='form-container'>
                <div className="form-header">
                    <div className="form-header-title">
                        <p>{`SOLICITUD DE ${location.state.title.toUpperCase()}`}</p>
                    </div>
                    <div className="form-header-menu">
                        <div className="form-header-menu-text">
                            <p style={{ fontWeight: "bold" }}>Codigo:</p>
                            <p>DRH-FO-002</p>
                        </div>
                        <div className="form-header-menu-text">
                            <p style={{ fontWeight: "bold" }}>Fecha de Emisión:</p>
                            <p>9/8/2022</p>
                        </div>
                        <div className="form-header-menu-text">
                            <p style={{ fontWeight: "bold" }}>Versión:</p>
                            <p>0</p>
                        </div>
                    </div>
                </div>
                <div className="form-component">{getModule}</div>
            </div>
        </>
    )
}

export default FormTemple