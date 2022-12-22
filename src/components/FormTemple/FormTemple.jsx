import React, { useEffect, useState, useContext } from 'react'
import Vacation from './Vacation'
import Attendance from './Attendance';
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

    const [header, setHeader] = useState({
        code: "",
        date: "",
        version: "",
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

        if (location.pathname?.split("/")[4] === "vacaciones") {
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
                                setGetModule(<Vacation img={img} profile={person} request={data} />);
                            }
                        }
                    })
                    .catch((err) => {
                        console.error(err.status);
                    });
            } else {
                setGetModule(<Vacation img={img} profile={person} request="" />);
            }

        } else if (location.pathname?.split("/")[4].replace("%20", " ") === "asistencia") {
            setGetModule(<Attendance profile={person} setHeader={setHeader} />);
        } else if (location.pathname?.split("/")[4] === "MARCO INSTITUCIONAL") {
            // setGetModule(<InstitutionalFramework />);
        } else if (location.pathname?.split("/")[4] === "DIRECTOR GENERAL") {
            // setGetModule(<Director />);
        } else if (location.pathname?.split("/")[4] === "ORGANIGRAMA") {
            // setGetModule(<OrganizationChart />);
        }

        return () => {
            unmounted = true;
        };
    }, [img, person, navigate, location]);

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            if (location.pathname?.split("/")[4] === "vacaciones") {
                setHeader({
                    code: "DRH-FO-002",
                    date: "9/8/2022",
                    version: "0"
                })
            } else if (location.pathname?.split("/")[4].replace("%20", " ") === "asistencia") {
                setHeader({
                    code: "No definido",
                    date: "No definido",
                    version: "No definido"
                })
            }
        }

        return () => {
            unmounted = true;
        };
    }, [location.pathname]);

    return (
        <>
            <div className='form-container'>
                <div className="form-header">
                    <div className="form-header-title">
                        <p>{`SOLICITUD DE ${location.pathname.split("/")[4].toUpperCase().replace("%20", " ")} `}</p>
                    </div>
                    <div className="form-header-menu">
                        <div className="form-header-menu-text">
                            <p style={{ fontWeight: "bold" }}>Codigo:</p>
                            <p>{header.code}</p>
                        </div>
                        <div className="form-header-menu-text">
                            <p style={{ fontWeight: "bold" }}>Fecha de Emisión:</p>
                            <p>{header.date}</p>
                        </div>
                        <div className="form-header-menu-text">
                            <p style={{ fontWeight: "bold" }}>Versión:</p>
                            <p>{header.version}</p>
                        </div>
                    </div>
                </div>
                <div className="form-component">{getModule}</div>
            </div>
        </>
    )
}

export default FormTemple