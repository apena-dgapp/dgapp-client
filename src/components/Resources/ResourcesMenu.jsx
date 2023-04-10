import React, { useState, useEffect } from "react";
import Images from "../../common/images";
import { getResources } from "../../api/files"
import ResourcesCoversForm from "./ResourcesCoversForm";
import ResourcesGraphicIdentity from "./ResourcesGraphicIdentity";
import ClipLoader from "react-spinners/ClipLoader";

const ResourcesMenu = () => {
    const [loading, setLoading] = useState(false);
    const [files, setFiles] = useState([]);
    const [form, setForm] = useState("");

    useEffect(() => {

        let unmounted = false;

        setLoading(true);

        if (!unmounted) {
            getResources("recursos", form)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setFiles(res)
                    setTimeout(() => {
                        if (res) {
                            setLoading(false);
                        }
                    }, 2500)
                })
                .catch((err) => {
                    console.error(err.status);
                });
        }
        return () => {
            unmounted = true;
        };
    }, [form]);

    const FormTemple = (formName) => {
        setForm(formName)
    };

    return (
        <>
            {
                form === "papeleria institucional" || form === "plantillas" ?
                    <>
                        {loading ? (
                            <div className="spinner-container">
                                <ClipLoader color="#113250" loading={loading} size={150} />
                            </div>
                        ) : (
                            <ResourcesCoversForm
                                formTitle={form}
                                files={files}
                            />)}
                    </>
                    : null
            }

            {
                form === "identidad grafica" ?
                    <>
                        {loading ? (
                            <div className="spinner-container">
                                <ClipLoader color="#113250" loading={loading} size={150} />
                            </div>
                        ) : (
                            <ResourcesGraphicIdentity
                                // formTitle = { form }
                                files={files}
                            />)}
                    </>
                    : null
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
