import React, { useEffect, useState, useContext } from 'react'
import Vacation from './Vacation'
import { useLocation, useNavigate } from "react-router-dom";
import { apiOneFile } from "../../api/files"
import { getFormVacation } from "../../api/form"
import GlobalContext from "../../context/GlobalContext";
import { getOnePerson } from "../../api/person";
import toast from 'react-hot-toast';

const FormTemple = () => {
    const navigate = useNavigate();
    const [contextState] = useContext(GlobalContext);
    const [img, setImg] = useState("");
    const location = useLocation();
    const [getModule, setGetModule] = useState("");
    const [person, setPerson] = useState({
        personId: "",
        fullName: "",
        position: "",
        birthday: "",
        photo: "",
        email: "",
        departament: "",
        documentId: "",
        reportsTo: "",
        startedOn: "",
        signature: ""
    });

    useEffect(() => {
        let unmounted = false;

        if (contextState.personId) {
            getOnePerson(contextState.personId)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    if (!unmounted) {
                        setPerson({
                            personId: res.personId,
                            fullName: res.firstName.split(" ", 1) + " " + res.lastName.split(" ", 1),
                            position: res.position,
                            birthday: res.birthdayDate,
                            photo: res.photo,
                            email: res.email,
                            departament: res.Departament.name,
                            documentId: res.documentId,
                            reportsTo: res.reportsTo,
                            startedOn: res.startedOn,
                            signature: res.signature
                        });
                    }
                })
                .catch((err) => {
                    console.error(err.status);
                });
        }
        return () => {
            unmounted = true;
        };
    }, [contextState.personId]);

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

        let unmounted = false;

        if (!unmounted && location.pathname?.split("/")[5]) {
            getFormVacation(location.pathname?.split("/")[5])
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    if (!unmounted) {
                        if (location.pathname?.split("/")[5] && !data) {
                            navigate("/404")
                            return toast.error("Esta solicitud ya fue cerrado o no existe!");
                        } else {
                            if (location.pathname?.split("/")[4] === "vacaciones") {
                                // console.log(request)
                                setGetModule(<Vacation img={img} profile={person} request={data} />);
                            } else if (location.pathname?.split("/")[4] === "FUNCIONES") {
                                // setGetModule(<Functions />);
                            } else if (location.pathname?.split("/")[4] === "MARCO INSTITUCIONAL") {
                                // setGetModule(<InstitutionalFramework />);
                            } else if (location.pathname?.split("/")[4] === "DIRECTOR GENERAL") {
                                // setGetModule(<Director />);
                            } else if (location.pathname?.split("/")[4] === "ORGANIGRAMA") {
                                // setGetModule(<OrganizationChart />);
                            }
                        }
                    }
                })
                .catch((err) => {
                    console.error(err.status);
                });
        } else {
            if (location.pathname?.split("/")[4] === "vacaciones") {
                // console.log(request)
                setGetModule(<Vacation img={img} profile={person} request="" />);
            } else if (location.pathname?.split("/")[4] === "FUNCIONES") {
                // setGetModule(<Functions />);
            } else if (location.pathname?.split("/")[4] === "MARCO INSTITUCIONAL") {
                // setGetModule(<InstitutionalFramework />);
            } else if (location.pathname?.split("/")[4] === "DIRECTOR GENERAL") {
                // setGetModule(<Director />);
            } else if (location.pathname?.split("/")[4] === "ORGANIGRAMA") {
                // setGetModule(<OrganizationChart />);
            }
        }

        return () => {
            unmounted = true;
        };
    }, [img, person, navigate, location]);

    return (
        <>
            <div className='form-container'>
                <div className="form-header">
                    <div className="form-header-title">
                        <p>{`SOLICITUD DE ${location.pathname.split("/")[4].toUpperCase()}`}</p>
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