import React, { useState, useEffect, useRef } from 'react'
import { getOnePerson } from "../../api/person"
import { SlPencil } from "react-icons/sl";
import { optionsDay, optionsMonth, optionsYear } from "../../utils/optionsArrays"
import moment from 'moment';
import * as jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import { sendEmail } from "../../api/email";
import { apiApproveRRHHLicense, revisionRRHHLicense, approveSupervisorLicense, createLicense } from '../../api/form';
import ImageCrop from './ImageCrop';
import { useNavigate } from "react-router-dom";
import { apiOneFile } from "../../api/files"

const License = ({ request, profile }) => {
    const pdf = new jsPDF.jsPDF('p', 'pt', 'letter', 'a4', true);
    const refInput = useRef();
    const navigate = useNavigate();
    const currentDate = new Date().toISOString().slice(0, 10);
    const [modalActive, setModalActive] = useState(false);
    const [image, setImage] = useState("");
    const [img, setImg] = useState("");
    const [totalHour, setTotalHour] = useState("");
    const [totalDays, setTotalDays] = useState("");
    const [signature, setSignature] = useState("");
    const [reportTo, setReportTo] = useState({
        name: "",
        email: ""
    });

    const [formData, setFormData] = useState({
        type: "",
        startHour: "",
        finalHour: "",
        dayStart: "",
        monthStart: "",
        yearStart: "",
        dayEnd: "",
        monthEnd: "",
        yearEnd: "",
        totalDaysRequested: "",
        justification: "",
        specificJustification: "",
        reason: "",
        requestStatus: "",
        generalRemarks: "",
    });

    const optionsType = [
        {
            id: "1",
            value: "Licencia",
        },
        {
            id: "2",
            value: "Permiso",
        }
    ];

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            apiOneFile("DRH-FO-003-Formulario Solicitud de Lincencias y Permisos. V.0")
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

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            const a = moment.duration(formData.startHour);
            const b = moment.duration(formData.finalHour);

            const c = b.subtract(a);
            setTotalHour(`${c.hours()}:${c.minutes()}`)
        }

        return () => {
            unmounted = true;
        };
    }, [formData.startHour, formData.finalHour]);

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {

            if (formData.dayStart && formData.monthStart && formData.yearStart && formData.dayEnd && formData.monthEnd && formData.yearEnd) {
                var fecha1 = `${formData.yearStart}-${dayNum(formData.monthStart)}-${formData.dayStart}`;
                var fecha2 = `${formData.yearEnd}-${dayNum(formData.monthEnd)}-${formData.dayEnd}`;

                setTotalDays(calcBusinessDays(fecha1, fecha2) + " Días Laborables");
            }
        }

        return () => {
            unmounted = true;
        };
    }, [formData.dayStart, formData.monthStart, formData.yearStart, formData.dayEnd, formData.monthEnd, formData.yearEnd]);

    function dayNum(month) {
        if (month === "enero") {
            return 1
        } else if (month === "febrero") {
            return 2
        } else if (month === "marzo") {
            return 3
        } else if (month === "abril") {
            return 4
        } else if (month === "mayo") {
            return 5
        } else if (month === "junio") {
            return 6
        } else if (month === "julio") {
            return 7
        } else if (month === "agosto") {
            return 8
        } else if (month === "septiembre") {
            return 9
        } else if (month === "octubre") {
            return 10
        } else if (month === "noviembre") {
            return 11
        } else if (month === "diciembre") {
            return 12
        }
    }

    function calcBusinessDays(startDate, endDate) {
        var day = moment(startDate);
        var businessDays = 0;

        while (day.isSameOrBefore(endDate, 'day')) {
            if (day.day() !== 0 && day.day() !== 6) businessDays++;
            day.add(1, 'd');
        }
        return businessDays;
    }

    const requestMenu = () => {
        navigate("/servicios/recursoshumanos/solicitudes");
    };

    const sendFormApplicant = () => {

        if (formData.type === "") {
            return toast.error("Por favor seleccionar el tipo de Solicitud");
        } else if (formData.startHour === "" && formData.type === "Permiso") {
            return toast.error("Por favor seleccionar una hora de inicio");
        } else if (formData.finalHour === "" && formData.type === "Permiso") {
            return toast.error("Por favor seleccionar una hora de final");
        } else if (formData.dayStart === "" && formData.type === "Licencia") {
            return toast.error("Por favor seleccionar el dia de la fecha de inicio");
        } else if (formData.monthStart === "" && formData.type === "Licencia") {
            return toast.error("Por favor seleccionar el mes de la fecha de inicio");
        } else if (formData.yearStart === "" && formData.type === "Licencia") {
            return toast.error("Por favor seleccionar el año de la fecha de inicio");
        } else if (formData.dayEnd === "" && formData.type === "Licencia") {
            return toast.error("Por favor seleccionar el dia de la fecha de fin");
        } else if (formData.monthEnd === "" && formData.type === "Licencia") {
            return toast.error("Por favor seleccionar el mes de la fecha de fin");
        } else if (formData.yearEnd === "" && formData.type === "Licencia") {
            return toast.error("Por favor seleccionar el año de la fecha de fin");
        } else if (formData.justification === "") {
            return toast.error("Por favor seleccionar el motivo que justifique la solicitud");
        } else if (formData.justification === "Otro" && formData.specificJustification === "") {
            return toast.error("Por favor escriba el motivo que justifique la solicitud");
        } else if (formData.reason === "") {
            return toast.error("Por favor Describa la razón la solicitud");
        }

        createLicense(
            profile.personId,
            profile.fullName,
            profile.position,
            profile.documentId,
            profile.email,
            profile.reportsTo,
            reportTo.name,
            reportTo.email,
            profile.departament,
            currentDate,
            formData.type,
            formData.type === "Licencia" ? null : formData.startHour,
            formData.type === "Licencia" ? null : formData.finalHour,
            formData.type === "Licencia" ? null : totalHour ? totalHour : "",
            totalDays ? `${formData.yearStart}-${dayNum(formData.monthStart)}-${formData.dayStart}` : null,
            totalDays ? `${formData.yearEnd}-${dayNum(formData.monthEnd)}-${formData.dayEnd}` : null,
            totalDays ? totalDays : "",
            formData.justification,
            formData.specificJustification,
            formData.reason,
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
                sendEmail(reportTo.email.toLowerCase(), `YDIAZ@DGAPP.GOB.DO, ${profile.email}`, `Solicitud de ${formData.type} - ${profile.fullName}-${currentDate}`, `
                Saludos ${reportTo.name},

                Actualmente el empleado ${profile.fullName}, envío una solicitud de ${formData.type}. 
                Por el momento la solicitud esta pendiente a la aprobación y firma del supervisor de dicho empleado, 
                para luego ser aprobada y firmada por el departamento de recursos humanos.

                Click aquí para aprobar o confirmar solicitud: ${process.env.REACT_APP_RUTE}/servicios/recursoshumanos/solicitudes/licencias/${data.id}
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

    const sendFormSupervisor = () => {

        if (formData.requestStatus === "") {
            return toast.error("Por favor seleccionar si la solicitud de vaciones fue aprobada o rechazada");
        }

        approveSupervisorLicense(
            request.licenseId,
            formData.requestStatus,
            profile.signature,
        )
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Error al intentar enviar la solicitud");
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                if (formData.requestStatus !== "Rechazada") {
                    sendEmail("RESTRELLA@DGAPP.GOB.DO", [request.email, profile.email], `Solicitud de ${request.type} - ${request.name}-${request.requirementDate}`, `
                Saludos a quien pueda interesar,

                La solicitud realizada por el empleado ${request.name}, fué ${formData.requestStatus.toLowerCase()} por su supervisor, Ahora esta en espera del departamento de recursos humanos. 

                Para cualquier duda por favor de contactarme.

                Click aquí para finalizar el proceso de solicitud: ${process.env.REACT_APP_RUTE}/servicios/recursoshumanos/solicitudes/licencias/${request.licenseId}
                `)
                        .then((res) => {
                            if (res.status !== 200) {
                                return toast.error("Error al intentar enviar la solicitud");
                            } else {
                                toast.success("La solicitud se envío exitosamente!");
                                requestMenu();
                            }
                        })
                } else if (formData.requestStatus === "Rechazada") {
                    sendEmail(request.email, ["RESTRELLA@DGAPP.GOB.DO", profile.email], `Solicitud de ${request.type} - ${request.name}-${request.requirementDate}`, `
                Saludos ${request.name},

                La solicitud realizada por el empleado ${request.name}, fué ${formData.requestStatus.toLowerCase()} por su supervisor. 

                Para cualquier duda por favor de contactarme.

                `)
                        .then((res) => {
                            if (res.status !== 200) {
                                return toast.error("Error al intentar enviar la solicitud");
                            } else {
                                toast.success("La solicitud se envío exitosamente!");
                                requestMenu();
                            }
                        })
                }

            })
            .catch((err) => {
                console.error(err.status);
                toast.error("Error al intentar enviar el formulario");
            });
    }

    const sendFormRRHH = () => {
        // if (formData.generalRemarks === "") {
        //     return toast.error("Por favor llenar el campo de observaciones generales");
        // }

        revisionRRHHLicense(
            request.licenseId,
            formData.generalRemarks,
            profile.fullName,
        )
            .then((res) => {
                if (res.status !== 200) {
                    return toast.error("Error al intentar enviar la solicitud");
                } else {
                    return res.json();
                }
            })
            .then((data) => {
                sendEmail("YDIAZ@DGAPP.GOB.DO", [request.email, "RESTRELLA@DGAPP.GOB.DO", request.reportToEmail], `Solicitud de ${request.type} - ${request.name}-${request.requirementDate}`, `
            Saludos Wendy Núñez,

            La solicitud realizada por el empleado ${request.name}, el dia ${request.requirementDate}, se han hechos las observaciones y evaluaciones correspondientes.

            Por favor de verificar el documento para su finalización.

            Click aquí para finalizar el proceso de solicitud: ${process.env.REACT_APP_RUTE}/servicios/recursoshumanos/solicitudes/licencias/${request.vacationId}`)
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

        pdf.text(request.name, 133, 160);
        pdf.text(request.position.substring(0, 30), 133, 190);
        pdf.text(request.position.substring(30, 100), 133, 202);
        pdf.text(request.documentId, 133, 223);

        pdf.text(request.reportToName, 403, 158);
        pdf.text(request.departament.substring(0, 30), 403, 190);
        pdf.text(request.departament.substring(30, 100), 403, 203);
        pdf.text(request.requirementDate.split("-")[2], 403, 229);
        pdf.text(request.requirementDate.split("-")[1], 440, 229);
        pdf.text(request.requirementDate.split("-")[0], 480, 229);

        pdf.text(request.type, 175, 308);

        if (request.startHour) {
            pdf.text(request.startHour, 132, 348);
        }
        if (request.finalHour) {
            pdf.text(request.finalHour, 132, 370);
        }
        if (request.totalHour) {
            pdf.text(request.totalHour, 132, 390);
        }

        if (request.startDate) {
            pdf.text(request.startDate.split("-")[2], 478, 308);
            pdf.text(request.startDate.split("-")[1], 520, 308);
            pdf.text(request.startDate.split("-")[0], 560, 308);
        }

        if (request.endDate) {
            pdf.text(request.endDate.split("-")[2], 478, 350);
            pdf.text(request.endDate.split("-")[1], 520, 350);
            pdf.text(request.endDate.split("-")[0], 560, 350);
        }

        if (request.totalDaysRequested) {
            pdf.text(request.totalDaysRequested, 478, 390);
        }

        if (request.justification === "Matrimonio") {
            pdf.rect(23, 438, 8, 10, 'F')
        } else if (request.justification === "Licencia por Paternidad") {
            pdf.rect(110, 438, 8, 10, 'F')
        } else if (request.justification === "Licencia por Maternidad") {
            pdf.rect(243, 438, 8, 10, 'F')
        } else if (request.justification === "Enfermedad") {
            pdf.rect(403, 438, 8, 10, 'F')
        } else if (request.justification === "Comisión de Servicios") {
            pdf.rect(110, 462, 8, 10, 'F')
        } else if (request.justification === "Cargo a Vacaciones") {
            pdf.rect(243, 462, 8, 10, 'F')
        } else if (request.justification === "Otro") {
            pdf.rect(52, 492, 8, 10, 'F')
        }

        if (request.specificJustification) {
            pdf.text(request.specificJustification.substring(0, 100), 133, 488);
            pdf.text(request.specificJustification.substring(100, 200), 133, 500);
            pdf.text(request.specificJustification.substring(200, 300), 133, 512);
        }

        if (request.reason) {
            pdf.text(request.reason.substring(0, 120), 23, 548);
            pdf.text(request.reason.substring(120, 240), 23, 560);
            pdf.text(request.reason.substring(240, 360), 23, 572);
        }

        if (request.requestStatus === "Aprobada") {
            pdf.rect(45, 610, 8, 10, 'F')
        } else if (request.requestStatus === "Rechazada") {
            pdf.rect(156, 609, 8, 10, 'F')
        } else if (request.requestStatus === "Remunerada") {
            pdf.rect(267, 609, 8, 10, 'F')
        } else if (request.requestStatus === "No Remunerada") {
            pdf.rect(382, 609, 8, 10, 'F')
        }

        pdf.text(request.name, 65, 683);
        // if (request.signatureApplicant) {
        //     pdf.addImage(request.signatureApplicant, 'PNG', 40, 480, 150, 80);
        // }

        pdf.text(request.reportToName, 485, 683);
        // if (request.signatureSupervisor) {
        //     pdf.addImage(request.signatureSupervisor, 'PNG', 410, 480, 150, 80);
        // }

        pdf.text(profile.fullName, 250, 683);
        // if (profile.signature) {
        //     pdf.addImage(profile.signature, 'PNG', 230, 495, 150, 80);
        // }

        if (request.generalRemarks) {
            pdf.text(request.generalRemarks.substring(0, 120), 23, 760);
            pdf.text(request.generalRemarks.substring(120, 240), 23, 772);
            pdf.text(request.generalRemarks.substring(240, 360), 23, 785);
        }

        var btoa = require('btoa');
        var out = pdf.output();
        let url = btoa(out);

        apiApproveRRHHLicense(
            request.licenseId,
            profile.signature,
            "data:application/pdf;base64," + url
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
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Puesto:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.position ? request.position : profile.position} />
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Cédula:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.documentId ? request.documentId : profile.documentId} />
                        </div>
                    </div>
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Supervisor/a:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.reportToName ? request.reportToName : reportTo.name} />
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Departamento:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.departament ? request.departament : profile.departament} />
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Fecha de la Solicitud:</p>
                            <div className="vacation-input-date">
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.requirementDate ? request.requirementDate.split("-")[2] : currentDate.split("-")[2]} />
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.requirementDate ? request.requirementDate.split("-")[1] : currentDate.split("-")[1]} />
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.requirementDate ? request.requirementDate.split("-")[0] : currentDate.split("-")[0]} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION-2 */}
                <div className="vacation-header">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>2. Descripción de la Solicitud de Licencia/Permiso</p>
                </div>
                <div className="vacation-content">
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Tipo de Solicitud:</p>
                            {/* {

                                <>
                                    <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue="Vacaciones anuales" />
                                </>
                            } */}

                            {
                                request.type ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.type} /> :
                                    <>
                                        <select
                                            name="type"
                                            value={formData.type || ""}
                                            onChange={handlerInputChange}
                                        // onBlur={onBlurTotalDays}
                                        >
                                            <option disabled={true} value="">Seleccione el tipo de solicitud</option>
                                            {optionsType?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>
                                        <i className="hi hi-outline-pencil-square" />
                                        <SlPencil
                                            size="1.2rem"
                                            style={{ marginLeft: "0.3rem", marginTop: "0.3rem" }}
                                            color="green"
                                        />
                                    </>
                            }
                        </div>
                        <div className="license-input">
                            {/* <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Fecha de Ingreso a DGAPP:</p> */}
                            <div className="license-input-time-container">
                                <div className="license-input-time">
                                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" || formData.type === "Licencia" ? "gainsboro" : null }}>Hora de Inicio:</p>
                                    <input name='startHour' disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" || formData.type === "Licencia" ? true : false} type="time" defaultValue={request.startHour ? request.startHour : null} onChange={handlerInputChange} />
                                    {
                                        request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" || formData.type === "Licencia" ? null : <>
                                            <i className="hi hi-outline-pencil-square" />
                                            <SlPencil
                                                size="1.2rem"
                                                style={{ marginLeft: "0.8rem", marginTop: "-0.3rem" }}
                                                color="green"
                                            />
                                        </>
                                    }
                                </div>
                                <div className="license-input-time">
                                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" || formData.type === "Licencia" ? "gainsboro" : null }}>Hora de Fin:</p>
                                    <input name='finalHour' disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" || formData.type === "Licencia" ? true : false} type="time" defaultValue={request.startHour ? request.startHour : null} onChange={handlerInputChange} />
                                </div>
                                <div className="license-input-time">
                                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" || formData.type === "Licencia" ? "gainsboro" : null }}>Total de Horas:</p>
                                    <input name='totalHour' style={{ backgroundColor: "#BCD3E6", fontWeight: "bold" }} disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" || formData.type === "Licencia" ? true : false} type="text" defaultValue={request.totalHour ? request.totalHour : totalHour} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Fecha de Inicio:</p>
                            <div className="vacation-input-date">
                                {
                                    request.startDate ? <input name="dayStart" disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.startDate.split("-")[2]} /> :
                                        <select
                                            name="dayStart"
                                            value={formData.dayStart || ""}
                                            onChange={handlerInputChange}
                                        // onBlur={onBlurTotalDays}

                                        >
                                            <option disabled={true} value="">Día</option>
                                            {optionsDay?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>
                                }

                                {
                                    request.startDate ? <input name="monthStart" disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.startDate.split("-")[1]} /> :
                                        <select
                                            name="monthStart"
                                            value={formData.monthStart || ""}
                                            onChange={handlerInputChange}
                                        // onBlur={onBlurTotalDays}
                                        >
                                            <option disabled={true} value="">Mes</option>
                                            {optionsMonth?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>
                                }

                                {
                                    request.startDate ? <input name="yearStart" disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.startDate.split("-")[0]} /> :
                                        <>
                                            <select
                                                name="yearStart"
                                                value={formData.yearStart || ""}
                                                onChange={handlerInputChange}
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
                                        </>
                                }

                            </div>
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Fecha de Fin:</p>
                            <div className="vacation-input-date">
                                {
                                    request.endDate ? <input name="dayEnd" disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.endDate.split("-")[2]} /> :
                                        <select
                                            name="dayEnd"
                                            value={formData.dayEnd || ""}
                                            onChange={handlerInputChange}
                                        // onBlur={onBlurTotalDays}
                                        >
                                            <option disabled={true} value="">Día</option>
                                            {optionsDay?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>
                                }

                                {
                                    request.endDate ?
                                        <input
                                            name="monthEnd"
                                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                                            readOnly type="text"
                                            defaultValue={request.endDate.split("-")[1]}
                                        /> :
                                        <select
                                            name="monthEnd"
                                            value={formData.monthEnd || ""}
                                            onChange={handlerInputChange}
                                        // onBlur={onBlurTotalDays}
                                        >
                                            <option disabled={true} value="">Mes</option>
                                            {optionsMonth?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>
                                }

                                {
                                    request.endDate ? <input name="yearEnd" disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.endDate.split("-")[0]} /> :
                                        <>
                                            <select
                                                name="yearEnd"
                                                value={formData.yearEnd || ""}
                                                onChange={handlerInputChange}
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
                                        </>
                                }

                            </div>
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Total de Días Solicitados:</p>
                            <input style={{ backgroundColor: "#BCD3E6", fontWeight: "bold" }} disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.totalDaysRequested ? request.totalDaysRequested : totalDays} />
                        </div>
                    </div>
                </div>
                <div className="vacation-sub-header">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>2.1 Seleccione de las siguientes opciones el motivo que justifique la solicitud de Licencia/Permiso.</p>
                </div>
                <div className="license-section2-radio-container">
                    <div className='license-section2-radio'>
                        <input name='justification' disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} id='Matrimonio' type="radio" defaultValue="Matrimonio" checked={request.justification === "Matrimonio" ? true : null} onChange={handlerInputChange} />
                        <label style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }} htmlFor='Matrimonio'>Matrimonio</label>
                    </div>
                    <div className='license-section2-radio'>
                        <input name='justification' disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} id='Licencia por Paternidad' type="radio" defaultValue="Licencia por Paternidad" checked={request.justification === "Licencia por Paternidad" ? true : null} onChange={handlerInputChange} />
                        <label style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }} htmlFor='Licencia por Paternidad'>Licencia por Paternidad</label>
                    </div>
                    <div className='license-section2-radio'>
                        <input name='justification' disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} id='Licencia por Maternidad' type="radio" defaultValue="Licencia por Maternidad" checked={request.justification === "Licencia por Maternidad" ? true : null} onChange={handlerInputChange} />
                        <label style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }} htmlFor='Licencia por Maternidad'>Licencia por Maternidad</label>
                    </div>
                    <div className='license-section2-radio'>
                        <input
                            name='justification'
                            id='Enfermedad'
                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                            type="radio"
                            defaultValue="Enfermedad"
                            checked={request.justification === "Enfermedad" ? true : null}
                            onChange={handlerInputChange} />
                        <label style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }} htmlFor='Enfermedad'>Enfermedad</label>
                    </div>
                    <div className='license-section2-radio'>
                        <input name='justification' disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} id='Comisión de Servicios' type="radio" defaultValue="Comisión de Servicios" checked={request.justification === "Comisión de Servicios" ? true : null} onChange={handlerInputChange} />
                        <label style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }} htmlFor='Comisión de Servicios'>Comisión de Servicios</label>
                    </div>
                    <div className='license-section2-radio'>
                        <input name='justification' disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} id='Cargo a Vacaciones' type="radio" defaultValue="Cargo a Vacaciones" checked={request.justification === "Cargo a Vacaciones" ? true : null} onChange={handlerInputChange} />
                        <label style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }} htmlFor='Cargo a Vacaciones'>Cargo a Vacaciones</label>
                        {
                            request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? null : <>
                                <i className="hi hi-outline-pencil-square" />
                                <SlPencil
                                    size="1.2rem"
                                    style={{ marginLeft: "0.8rem", marginTop: "-0.3rem" }}
                                    color="green"
                                />
                            </>
                        }
                    </div>
                </div>
                <div className="license-section2-radio-container">
                    <div className='license-section2-textarea-radio'>
                        <input name='justification' disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} id='Otro' type="radio" defaultValue="Otro" checked={request.justification === "Otro" ? true : null} onChange={handlerInputChange} />
                        <label style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }} htmlFor='Otro'>Otro; Especifique:</label>
                    </div>
                    <div className='license-section2-textarea'>
                        <textarea
                            name="specificJustification"
                            onChange={handlerInputChange}
                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                            maxLength={200}
                            defaultValue={request.specificJustification ? request.specificJustification : null}
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
                <div className="vacation-sub-header">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>2.2  Describa brevemente las razones de la solicitud de Licencia/Permiso:</p>
                </div>
                <div className="license-section2-radio-container">
                    <div className='license-section2-2-textarea'>
                        <textarea
                            name="reason"
                            onChange={handlerInputChange}
                            disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                            maxLength={200}
                            defaultValue={request.reason ? request.reason : null}
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
                <div className="vacation-header">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>3. Aprobación/Rechazo de la Solicitud:</p>
                </div>
                <div className="license-section2-radio-container">
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id="approve" name='requestStatus' type="radio" defaultValue="Aprobada" checked={request.requestStatus === "Aprobada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='approve'>Aprobada</label>
                        <i className="hi hi-outline-pencil-square" />
                    </div>
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id='reject' name='requestStatus' type="radio" defaultValue="Rechazada" checked={request.requestStatus === "Rechazada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='reject'>Rechazada</label>
                    </div>
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id='Remunerada' name='requestStatus' type="radio" defaultValue="Remunerada" checked={request.requestStatus === "Remunerada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='Remunerada'>Remunerada</label>
                    </div>
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id='No Remunerada' name='requestStatus' type="radio" defaultValue="No Remunerada" checked={request.requestStatus === "No Remunerada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='No Remunerada'>No Remunerada</label>
                        {
                            request.step === "Pending Supervisor" && request.reportToName === profile.fullName ? <>
                                <i className="hi hi-outline-pencil-square" />
                                <SlPencil
                                    size="1.2rem"
                                    style={{ marginLeft: "0.3rem", marginTop: "-0.3rem" }}
                                    color="green"
                                />
                            </> : null
                        }
                    </div>
                </div>
                {/* SECTION-4 */}
                <div className="vacation-header">
                    <p>4. Firmas Correspondientes</p>
                    {/* <p>4. Firmas Correspondientes (Click al icono para cargar firma)</p> */}
                </div>
                <div className="vacation-section4">
                    <div className="vacation-section4-line">

                        {
                            request.signatureApplicant ? <img className='vacation-signature-applicant' src={request.signatureApplicant} alt='signature' /> : <img className='vacation-signature-applicant' src={profile.signature} alt='signature' />
                        }

                        <span style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>{request.name ? request.name : profile.fullName} </span>
                        <div className="vacacion-section4-canvas"></div>
                        <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null, backgroundColor: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Firma de la Persona Solicitante</p>
                    </div>
                    <div className="vacation-section4-line vacacion-section4-mt mb-5">

                        {
                            request.signatureRRHH ? <img className='vacation-signature-rrhh' src={request.signatureRRHH} alt='signature' /> : (request.step === "Pending Approval" && profile.position === "Directora de Recursos Humanos" ?
                                <img className='vacation-signature-rrhh' src={profile.position === "Directora de Recursos Humanos" && request.step === "Pending Approval" ? profile.signature : null} alt='signature' /> : null)
                        }
                        <span style={{ color: profile.position !== "Directora de Recursos Humanos" || request.step !== "Pending Approval" ? "gainsboro" : null }}>{request.step === "Pending Approval" && profile.position === "Directora de Recursos Humanos" ? profile.fullName : null}</span>
                        <div className="vacacion-section4-canvas"></div>
                        <p style={{ color: profile.position !== "Directora de Recursos Humanos" || request.step !== "Pending Approval" ? "gainsboro" : null, backgroundColor: profile.position !== "Directora de Recursos Humanos" || request.step !== "Pending Approval" ? "gainsboro" : null }}>Departamento de Recursos Humanos</p>
                    </div>

                    <div className="vacation-section4-line">
                        {
                            request.signatureSupervisor ? <img className='vacation-signature-supervisor' src={request.signatureSupervisor} alt='signature' /> : (request.step === "Pending Supervisor" && request.reportToName === profile.fullName ?
                                <img className='vacation-signature-supervisor' src={profile.signature} alt='signature' /> : null)
                        }

                        <span style={{ color: request.reportToName !== profile.fullName || request.step !== "Pending Supervisor" ? "gainsboro" : null }}>{request.reportToName ? request.reportToName : reportTo.name} </span>
                        <div className="vacacion-section4-canvas"></div>
                        <p style={{
                            color: request.reportToName !== profile.fullName || request.step !== "Pending Supervisor" ? "gainsboro" : null, background: request.reportToName !== profile.fullName || request.step !== "Pending Supervisor" ? "gainsboro" : null
                        }}>Supervisor/a del Área</p>
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
                            disabled={profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? false : true}
                            name="generalRemarks"
                            maxLength={200}
                            defaultValue={request.generalRemarks ? request.generalRemarks : null}
                        />
                        {
                            profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? <>
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
                        onClick={request.step === "Pending Supervisor" ? sendFormSupervisor : (request.step === "Pending RRHH" ? sendFormRRHH : sendFormApplicant)}
                        className={request.step === "Pending Supervisor" && request.reportToName !== profile.fullName ? "btn-disabled" : (request.step === "Pending RRHH" && profile.departament !== "Recursos Humanos" ? "btn-disabled" : "btn-active")}
                        disabled={request.step === "Pending Supervisor" && request.reportToName !== profile.fullName ? true : (request.step === "Pending RRHH" && profile.departament !== "Recursos Humanos" ? true : false)}
                    >
                        ENVIAR
                    </button> : <button
                        onClick={approveRRHH}
                        className={profile.position !== "Directora de Recursos Humanos" ? "btn-disabled" : "btn-active"}
                        disabled={profile.position !== "Directora de Recursos Humanos" ? true : false}
                    >APROBAR</button>
                }

            </div>
        </>
    )
}

export default License