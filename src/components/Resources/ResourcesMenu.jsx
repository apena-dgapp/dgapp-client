import React, { useState, useEffect } from "react";
import Images from "../../common/images";
import { useNavigate } from "react-router-dom";
import { getResources } from "../../api/files"
import ResourcesCoversForm from "./ResourcesCoversForm";

const ResourcesMenu = () => {
    const [files, setFiles] = useState([]);
    const [fileName, setFileName] = useState("");
    const [form, setForm] = useState("");
    const navigate = useNavigate();

    const FormTemple = (formName) => {
        setForm(formName)
        // navigate(`/recursos/recursoshumanos/solicitudes/${module}`);
    };

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            getResources("recursos", form)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setFiles(res)
                })
                .catch((err) => {
                    console.error(err.status);
                });
        }
        return () => {
            unmounted = true;
        };
    }, [form]);

    return (
        <>
            {
                form === "papeleria institucional" ? <ResourcesCoversForm formTitle={form} files={files} /> : null
            }

            {
                form === "menu" || form === "" ? <div className="news-container">
                    <div className="news-title">
                        <p>RECURSOS</p>
                        <span className='news-title-line'></span>
                    </div>

                    <div className="requestmain-container">
                        <div className="resources-buttons-container">
                            <div onClick={() => FormTemple("papeleria institucional")} className="requestmain-button">
                                <div className="requestmain-btn-img">
                                    <img src={Images.papeleria} alt="" />
                                </div>
                                <div className="requestmain-btn-text">
                                    <p>Papelería institucional</p>
                                </div>
                            </div>
                            <div onClick={() => FormTemple("plantillas")} className="requestmain-button">
                                <div className="requestmain-btn-img">
                                    <img src={Images.plantillas} alt="" />
                                </div>
                                <div className="requestmain-btn-text">
                                    <p>Plantillas</p>
                                </div>
                            </div>
                            <div onClick={() => FormTemple("identidad grafica")} className="requestmain-button">
                                <div className="requestmain-btn-img">
                                    <img src={Images.isotipo} alt="" />
                                </div>
                                <div className="requestmain-btn-text">
                                    <p>Identidad gráfica</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null}
        </>
    );
};

export default ResourcesMenu;
