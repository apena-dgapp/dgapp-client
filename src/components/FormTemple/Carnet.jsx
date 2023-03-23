import React, { useState, useEffect, useRef } from 'react'
import { getOnePerson } from "../../api/person"
import { SlPencil } from "react-icons/sl";
import * as jsPDF from 'jspdf';
import { optionsDay, optionsMonth, optionsYear } from "../../utils/optionsArrays"
import toast from 'react-hot-toast';
import { sendEmail } from "../../api/email";
import { revisionRRHHCarnet, ApproveRRHHCarnet, createCarnet } from '../../api/form';
import ImageCrop from './ImageCrop';
import { useNavigate } from "react-router-dom";
import { apiOneFile } from "../../api/files"

const Carnet = ({ request, profile }) => {
    const pdf = new jsPDF.jsPDF('p', 'pt', 'letter', 'a4', true);
    const refInput = useRef();
    const navigate = useNavigate();
    const currentDate = new Date().toISOString().slice(0, 10);
    const [modalActive, setModalActive] = useState(false);
    const [image, setImage] = useState("");
    const [img, setImg] = useState("");
    const [signature, setSignature] = useState("");
    const [reportTo, setReportTo] = useState({
        name: "",
        email: ""
    });

    const [formData, setFormData] = useState({
        code: "",
        accessCard: "",
        pinID: "",
        type: "",
        specify: "",
        dayStart: "",
        monthStart: "",
        yearStart: "",
        generalRemarks: "",
    });

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            apiOneFile("DRH-FO-001-Formulario Solicitud de Entrega de Carnet. V.0")
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

        if (!unmounted) {
            getOnePerson(profile.reportsTo)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setReportTo({ name: res.firstName.split(" ", 1) + " " + res.lastName.split(" ", 1), email: res.email })
                })
                .catch((err) => {
                    console.error(err.status);
                });
        }

        return () => {
            unmounted = true;
        };
    }, [profile]);

    const handlerInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    const requestMenu = () => {
        navigate("/servicios/recursoshumanos/solicitudes");
    };

    const sendFormApplicant = () => {

        if (formData.type === "") {
            return toast.error("Por favor seleccionar el tipo de emisión de carnet");
        } else if (formData.type === "Otro" && formData.specify === "") {
            return toast.error("Por favor especifique el motivo");
        }

        createCarnet(
            profile.personId,
            profile.fullName,
            profile.position,
            profile.documentId,
            formData.code,
            formData.accessCard,
            formData.pinID,
            profile.email,
            profile.reportsTo,
            reportTo.name,
            reportTo.email,
            profile.departament,
            currentDate,
            formData.type,
            formData.specify,
            signature ? signature : profile.signature
        )
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Error al intentar enviar la solicitud");
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                sendEmail(`YDIAZ@DGAPP.GOB.DO, ${profile.email}`, `Solicitud de entrega de carnet - ${profile.fullName}-${currentDate}`, `
                Saludos Raiza,

                Actualmente el empleado ${profile.fullName}, envío una solicitud de entrega de carnet. 
                Por el momento la solicitud esta pendiente a revisión y aprobación por el departamento 
                de recursos humanos. 

                Click aquí para revisión y aprobación de la solicitud: ${process.env.REACT_APP_RUTE}/servicios/recursoshumanos/solicitudes/carnet/${data.id}
                `)
                    .then((res) => {
                        if (res.status !== 200) {
                            return toast.error("Error al intentar enviar la solicitud");
                        } else {
                            toast.success("La solicitud se envío exitosamente!");
                            requestMenu();
                        }
                    })
            })
            .catch((err) => {
                console.error(err.status);
                toast.error("Error al intentar enviar el formulario");
            });
    }

    const sendFormRRHH = () => {
        if (formData.deliveryDate === "") {
            return toast.error("Por favor seleccionar la fecha de entrega del carnet");
        } else if (formData.generalRemarks === "") {
            return toast.error("Por favor de escribir las observaciones generales");
        }

        revisionRRHHCarnet(
            request.carnetId,
            formData.generalRemarks,
            profile.fullName,
            `${formData.dayStart}-${formData.monthStart}-${formData.yearStart}`
        )
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Error al intentar enviar la solicitud");
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                sendEmail([request.email, "RESTRELLA@DGAPP.GOB.DO"], `Solicitud de entrega de carnet - ${request.name}-${request.requirementDate}`, `
            Saludos ${request.name},

            La solicitud realizada por el empleado ${request.name}, el dia ${request.requirementDate}, se han hechos las observaciones y evaluaciones correspondientes.

            Por favor de verificar el documento para su finalización.

            Click aquí para finalizar el proceso de solicitud: ${process.env.REACT_APP_RUTE}/servicios/recursoshumanos/solicitudes/licencias/${request.licenseId}`)
                    .then((res) => {
                        if (res.status !== 200) {
                            return toast.error("Error al intentar enviar la solicitud");
                        } else {
                            toast.success("La solicitud se envío exitosamente!");
                            requestMenu();
                        }
                    })
            })
            .catch((err) => {
                console.error(err.status);
                toast.error("Error al intentar enviar el formulario");
            });

    }

    const approveRRHH = () => {

        pdf.addImage(img, 'PNG', 10, -30, 585, 830, 'undefined', 'FAST');
        pdf.setFontSize(10);

        pdf.text(request.name, 180, 170);
        // pdf.text(request.code, 133, 190);
        pdf.text(request.documentId, 180, 200);
        // pdf.text(request.accessCard, 403, 158);
        // pdf.text(request.pinID, 403, 158);
        if (request.deliveryDate) {
            pdf.text(request.deliveryDate.split("-")[0], 428, 233);
            pdf.text(request.deliveryDate.split("-")[1], 470, 233);
            pdf.text(request.deliveryDate.split("-")[2], 510, 233);
        }

        if (request.type === "Personal Nuevo Ingreso") {
            pdf.circle(66, 333, 4.8, 'F')
        } else if (request.type === "Perdida Involuntaria de Carnet") {
            pdf.circle(230, 333, 4.8, 'F')
        } else if (request.type === "Deterioro de Carnet") {
            pdf.circle(433, 331, 4.8, 'F')
        } else if (request.type === "Datos Incorrectos") {
            pdf.circle(66, 362, 4.8, 'F')
        } else if (request.type === "Cambio de Cargo") {
            pdf.circle(230, 360, 4.8, 'F')
        } else if (request.type === "Otro") {
            pdf.circle(433, 360, 4.8, 'F')
        }

        if (request.specify) {
            pdf.text(request.specify.substring(0, 90), 143, 393);
            pdf.text(request.specify.substring(90, 180), 143, 405);
            pdf.text(request.specify.substring(180, 270), 143, 416);
            pdf.text(request.specify.substring(270, 360), 143, 428);
        }

        pdf.text(request.name, 230, 520);

        pdf.text(currentDate, 355, 535);

        if (request.generalRemarks) {
            pdf.text(request.generalRemarks.substring(0, 120), 23, 710);
            pdf.text(request.generalRemarks.substring(120, 240), 23, 720);
            pdf.text(request.generalRemarks.substring(240, 360), 23, 730);
            pdf.text(request.generalRemarks.substring(360, 480), 23, 740);
        }

        var btoa = require('btoa');
        var out = pdf.output();
        let url = btoa(out);

        ApproveRRHHCarnet(
            request.carnetId,
            profile.signature,
            "data:application/pdf;base64," + url,
            currentDate,
        )
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Error al intentar enviar la solicitud");
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                sendEmail(request.email, ["RESTRELLA@DGAPP.GOB.DO", request.reportToEmail], `Solicitud de ${request.type} - ${request.name}-${request.requirementDate}`, `
                Saludos ${request.name},

                La solicitud realizada el dia ${request.requirementDate}, fue concluida.

                NOTA: Solicitud adjunta.
                `, `Solicitud de ${request.type} - ${request.name}-${request.requirementDate}.pdf`, url, request.step)
                    .then((res) => {
                        if (res.status !== 200) {
                            return toast.error("Error al intentar enviar la solicitud");
                        } else {
                            toast.success("La solicitud se envío exitosamente!");
                            requestMenu();
                        }
                    })
            })
            .catch((err) => {
                console.error(err.status);
                toast.error("Error al intentar enviar el formulario");
            });

        // pdf.save(`solicitud-vacaciones-${profile.fullName.toLowerCase()}-${currentDate}.pdf`);
    }

    const modalToggle = () => {
        setModalActive(!modalActive);
    };

    const uploadImg = () => {
        refInput.current.click();
        setModalActive(!modalActive);
    };

    // console.log(request);

    return (
        <>
            <ImageCrop
                modalToggle={modalToggle}
                modalActive={modalActive}
                setImage={setImage}
                image={image}
                uploadImg={uploadImg}
                setSignature={setSignature}
                id={request.vacationId}
                table="Vacation"
                column={request.step === "Pending Supervisor" ? "signatureSupervisor" : (request.step === "Pending RRHH" ? "signatureRRHH" : "signatureApplicant")}
            />
            <div className='vacation-container'>
                {/* SECTION-1 */}
                <div className="vacation-status">
                    {/* <p>Actualmente, esta solicitud está pendiente {status}</p> : null */}
                </div>
                <div className="vacation-header">
                    <p>1. Información del Personal Solicitante</p>
                </div>
                <div className="vacation-content">
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Nombre y Apellido:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly name='name' type="text" defaultValue={request.name ? request.name : profile.fullName} />
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Cédula:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.documentId ? request.documentId : profile.documentId} />
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Codigo:</p>
                            {/* <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.position ? request.position : profile.position} /> */}
                            <input disabled={true} readOnly type="text" defaultValue={""} />
                        </div>
                    </div>
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Tarjeta de Acceso:</p>
                            {/* <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.reportToName ? request.reportToName : reportTo.name} /> */}
                            <input disabled={true} readOnly type="text" defaultValue={""} />
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Pin ID:</p>
                            {/* <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.departament ? request.departament : profile.departament} /> */}
                            <input disabled={true} readOnly type="text" defaultValue={""} />
                        </div>

                        {
                            request.deliveryDate ?
                                <div className="vacation-input">
                                    <p style={{ color: request.step === "" || request.step === "Pending Approval" ? "gainsboro" : null }}>Fecha de Entrega:</p>
                                    <input name="deliveryDate" disabled={true} readOnly type="text" defaultValue={request.deliveryDate} />
                                </div> :
                                <div className="vacation-input">
                                    <div className="vacation-input-date">
                                        <p style={{ color: request.step === "" || request.step === "Pending Approval" ? "gainsboro" : null }}>Fecha de Entrega:</p>
                                        <select
                                            name="dayStart"
                                            value={formData.dayStart || ""}
                                            onChange={handlerInputChange}
                                            disabled={request.step === "Pending RRHH" && profile.fullName === "Yelissa Diaz" ? false : true}
                                        // onBlur={onBlurTotalDays}

                                        >
                                            <option disabled={true} value="">Día</option>
                                            {optionsDay?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>

                                        <select
                                            name="monthStart"
                                            value={formData.monthStart || ""}
                                            onChange={handlerInputChange}
                                            disabled={request.step === "Pending RRHH" && profile.fullName === "Yelissa Diaz" ? false : true}
                                        // onBlur={onBlurTotalDays}
                                        >
                                            <option disabled={true} value="">Mes</option>
                                            {optionsMonth?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>

                                        <select
                                            name="yearStart"
                                            value={formData.yearStart || ""}
                                            onChange={handlerInputChange}
                                            disabled={request.step === "Pending RRHH" && profile.fullName === "Yelissa Diaz" ? false : true}
                                            // onBlur={onBlurTotalDays}
                                            style={{ marginRight: 0 }}
                                        >
                                            <option disabled={true} value="">Año</option>
                                            {optionsYear?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>
                                        <i className="hi hi-outline-pencil-square" />
                                        <SlPencil
                                            size="1.2rem"
                                            style={{ marginLeft: "0.3rem", marginTop: "0.3rem" }}
                                            color="green"
                                        />
                                    </div>
                                </div>

                        }

                    </div>
                </div>

                {/* SECTION-2 */}
                <div className="vacation-header m-0">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>2. Tipo de Emisión de Carnet</p>
                </div>
                <div className="vacation-content">
                </div>
                <div className="vacation-sub-header">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>2.1 Seleccione el motivo de expedición de Carnet:</p>
                </div>
                <div className="license-section2-radio-container">
                    <div className='carnet-section2-radio'>
                        <input
                            name='type'
                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                            type="radio"
                            defaultValue="Personal Nuevo Ingreso"
                            checked={request.type === "Personal Nuevo Ingreso" ? true : null}
                            onChange={handlerInputChange}
                        />
                        <label
                            style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}
                            htmlFor='Personal Nuevo Ingreso'
                        >
                            Personal Nuevo Ingreso
                        </label>
                    </div>
                    <div className='carnet-section2-radio'>
                        <input
                            name='type'
                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                            type="radio" defaultValue="Perdida Involuntaria de Carnet"
                            checked={request.type === "Perdida Involuntaria de Carnet" ? true : null}
                            onChange={handlerInputChange}
                        />
                        <label
                            style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}
                            htmlFor='Perdida Involuntaria de Carnet'
                        >
                            Perdida Involuntaria de Carnet
                        </label>
                    </div>
                    <div className='carnet-section2-radio'>
                        <input
                            name='type'
                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                            type="radio"
                            defaultValue="Deterioro de Carnet"
                            checked={request.type === "Deterioro de Carnet" ? true : null}
                            onChange={handlerInputChange}
                        />
                        <label
                            style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}
                            htmlFor='Deterioro de Carnet'
                        >
                            Deterioro de Carnet
                        </label>
                    </div>
                    <div className='carnet-section2-radio'>
                        <input
                            name='type'
                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                            type="radio"
                            defaultValue="Datos Incorrectos"
                            checked={request.type === "Datos Incorrectos" ? true : null}
                            onChange={handlerInputChange} />
                        <label
                            style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}
                            htmlFor='Datos Incorrectos'
                        >
                            Datos Incorrectos
                        </label>
                    </div>
                    <div className='carnet-section2-radio'>
                        <input
                            name='type'
                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                            type="radio"
                            defaultValue="Cambio de Cargo"
                            checked={request.type === "Cambio de Cargo" ? true : null}
                            onChange={handlerInputChange} />
                        <label
                            style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}
                            htmlFor='Cambio de Cargo'
                        >
                            Cambio de Cargo
                        </label>
                        {
                            request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? null : <>
                                <i className="hi hi-outline-pencil-square" />
                                <SlPencil
                                    size="1.2rem"
                                    style={{ marginLeft: "0.5rem", marginTop: "-0.3rem" }}
                                    color="green"
                                />
                            </>
                        }
                    </div>
                </div>
                <div className="license-section2-radio-container">
                    <div className='license-section2-textarea-radio'>
                        <input
                            name='type'
                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                            id='Otro'
                            type="radio"
                            defaultValue="Otro"
                            checked={request.type === "Otro" ? true : null}
                            onChange={handlerInputChange} />
                        <label
                            style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}
                            htmlFor='Otro'
                        >
                            Otro; Especifique:
                        </label>
                    </div>
                    <div className='license-section2-textarea'>
                        <textarea
                            name="specify"
                            onChange={handlerInputChange}
                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                            maxLength={200}
                            defaultValue={request.specify ? request.specify : null}
                        />
                        {
                            request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? null : <>
                                <i className="hi hi-outline-pencil-square" />
                                <SlPencil
                                    size="1.2rem"
                                    style={{ marginLeft: "0.3rem", marginTop: "0.6rem" }}
                                    color="green"
                                />
                            </>
                        }
                    </div>
                </div>

                {/* SECTION-3 */}
                <div className="vacation-header m-0">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>3. Acuerdo, Deberes Y Responsabilidades</p>
                </div>
                <div className="vacation-sub-header">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>3.1 Favor leer y firmar el siguiente acuerdo de expedición y entrega de carnet:</p>
                </div>
                <div className="carnet-section3-container">
                    <div className='carnet-section3'>
                        <p>
                            Por medio del presente documento, Yo
                            {
                                request.step === "Pending Approval" && profile.fullName === request.name ? <span style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
                                    {` ${request.name ? request.name : profile.fullName} `}
                                </span> : <span style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
                                    _________________________
                                </span>
                            }

                            <span>
                                Certifico haber recibido de parte del Departamento de Recursos Humanos de la  DGAPP el Carnet de identificacion en fecha:
                            </span>
                            {
                                request.step === "Pending Approval" && profile.fullName === request.name ? <span style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
                                    {` ${request.requirementDate ? request.requirementDate : currentDate} `}
                                </span> : <span style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
                                    ________________
                                </span>
                            }

                            <span>
                                confirmando que acepto los lineamientos establecidos en el referido Documento.
                            </span>
                        </p>
                    </div>
                </div>
                {/* SECTION-4 */}
                <div className="vacation-header">
                    <p>4. Firmas Correspondientes</p>
                    {/* <p>4. Firmas Correspondientes (Click al icono para cargar firma)</p> */}
                </div>
                <div className="carnet-section4">
                    <div className="carnet-section4-line">

                        {
                            // request.signatureApplicant ? <img className='vacation-signature-applicant' src={request.signatureApplicant} alt='signature' /> : <img className='vacation-signature-applicant' src={profile.signature} alt='signature' />
                        }

                        <span style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : "#0D2F4C" }}>{request.name ? request.name : profile.fullName} </span>
                        <div className="vacacion-section4-canvas"></div>
                        <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : "#0D2F4C", backgroundColor: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Firma de la Persona Solicitante</p>
                    </div>

                    <div className="carnet-section4-line">
                        {
                            // request.signatureRRHH ? <img className='vacation-signature-supervisor' src={request.signatureRRHH} alt='signature' /> : (request.step === "Pending RRHH" && profile.position === "Directora de Recursos Humanos" ?
                            //     <img className='vacation-signature-supervisor' src={profile.position === "Directora de Recursos Humanos" && request.step === "Pending RRHH" ? profile.signature : null} alt='signature' /> : null)
                        }
                        {
                            request.rrhhName ? <span>{request.rrhhName}</span> :
                                <span style={{ color: request.step !== "Pending RRHH" && profile.fullName === "Yelissa Diaz" ? "gainsboro" : "#0D2F4C" }}>{request.step === "Pending RRHH" && profile.fullName === "Yelissa Diaz" ? profile.fullName : null} </span>
                        }
                        <div className="vacacion-section4-canvas"></div>
                        <p style={{ color: request.step !== "Pending RRHH" && profile.fullName === "Yelissa Diaz" ? "gainsboro" : "#0D2F4C", background: request.step !== "Pending RRHH" && profile.fullName === "Yelissa Diaz" ? "gainsboro" : null }}>Departamento RRHH</p>
                    </div>
                </div>
                {/* SECTION-5 */}
                <div className="vacation-header justify-content-center">
                    <p>5. Observaciones Generales (USO EXCLUSIVO DE RRHH)</p>
                </div>
                <div className="license-section2-radio-container justify-content-center">
                    <div className='license-section2-2-textarea'>
                        <textarea
                            onChange={handlerInputChange}
                            disabled={request.step === "Pending RRHH" && profile.fullName === "Yelissa Diaz" ? false : true}
                            name="generalRemarks"
                            maxLength={200}
                            defaultValue={request.generalRemarks ? request.generalRemarks : null}
                        />
                        {
                            request.step === "Pending RRHH" && profile.fullName === "Yelissa Diaz" ? <>
                                <i className="hi hi-outline-pencil-square" />
                                <SlPencil
                                    size="1.2rem"
                                    style={{ marginLeft: "0.3rem", marginTop: "0.6rem" }}
                                    color="green"
                                />
                            </> : null
                        }
                    </div>
                </div>
            </div>
            <div>
                {
                    request.step !== "Pending Approval" ? <button
                        onClick={request.step === "Pending RRHH" ? sendFormRRHH : sendFormApplicant}
                        className={request.step === "Pending RRHH" && profile.fullName !== "Yelissa Diaz" ? "btn-disabled" : "btn-active"}
                        disabled={request.step === "Pending RRHH" && profile.fullName !== "Yelissa Diaz" ? true : false}
                    >
                        ENVIAR
                    </button> : <button
                        onClick={approveRRHH}
                        className={request.step === "Pending Approval" && profile.fullName === request.name ? "btn-active" : "btn-disabled"}
                        disabled={request.step === "Pending Approval" && profile.fullName === request.name ? false : true}
                    >ENTREGADO</button>
                }

            </div>
        </>
    )
}

export default Carnet