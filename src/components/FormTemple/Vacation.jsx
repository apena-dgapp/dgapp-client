import React, { useEffect, useState, useRef } from 'react'
import * as jsPDF from 'jspdf'
import { getOnePerson } from "../../api/person"
import { optionsDay, optionsMonth, optionsYear } from "../../utils/optionsArrays"
import { getElapsedDate } from "../../utils/ElapsedDate"
import moment from "moment-business-days"
import toast from 'react-hot-toast';
import { createVacation, approveSupervisor, revisionRRHH, apiApproveRRHH } from '../../api/form';
import { sendEmail } from "../../api/email";
import ImageCrop from './ImageCrop';
import { useNavigate } from "react-router-dom";
import { SlPencil } from "react-icons/sl";

const Vacation = ({ img, profile, directorRRHH, request }) => {
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);
    const [totalDays, setTotalDays] = useState("");
    const currentDate = new Date().toISOString().slice(0, 10);
    const pdf = new jsPDF.jsPDF('p', 'pt', 'letter', 'a4', true);
    const [image, setImage] = useState("");
    const [status, setStatus] = useState("");
    const [signature, setSignature] = useState("");
    const [reportTo, setReportTo] = useState({
        name: "",
        email: ""
    });

    const [formData, setFormData] = useState({
        type: "",
        dayStart: "",
        monthStart: "",
        yearStart: "",
        dayEnd: "",
        monthEnd: "",
        yearEnd: "",
        requestStatus: "",
        requiresSubstitute: "",
        motivesSubstitute: "",
        rrhhFirstDaysAvailable: "",
        rrhhSecondDaysAvailable: "",
        rrhhFirstYearAvailable: "",
        rrhhSecondYearAvailable: "",
    });

    const [resultsRRHH, setResultsRRHH] = useState({
        rrhhTotalDaysAvailable: "",
        rrhhTotalDaysPending: ""
    });

    const [elapsedDate, setElapsedDate] = useState({
        day: "",
        month: "",
        year: "",
    });
    const modalToggle = () => {
        setModalActive(!modalActive);
    };

    const handlerInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const refInput = useRef();

    const uploadImg = () => {
        refInput.current.click();
        setModalActive(!modalActive);
    };

    const requestMenu = () => {
        navigate("/servicios/recursoshumanos/solicitudes");
    };

    function calcBusinessDays(startDate, endDate) {
        var day = moment(startDate);
        var businessDays = 0;

        while (day.isSameOrBefore(endDate, 'day')) {
            if (day.day() !== 0 && day.day() !== 6) businessDays++;
            day.add(1, 'd');
        }
        return businessDays;
    }

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {

            setElapsedDate({
                day: getElapsedDate(`${Number(profile.startedOn.split("-")[0])}, ${Number(profile.startedOn.split("-")[1])}, ${Number(profile.startedOn.split("-")[2])}`).day,
                month: getElapsedDate(`${Number(profile.startedOn.split("-")[0])}, ${Number(profile.startedOn.split("-")[1])}, ${Number(profile.startedOn.split("-")[2])}`).month + 1,
                year: getElapsedDate(`${Number(profile.startedOn.split("-")[0])}, ${Number(profile.startedOn.split("-")[1])}, ${Number(profile.startedOn.split("-")[2])}`).year,
            })

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

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {

            if (formData.rrhhFirstDaysAvailable && formData.rrhhSecondDaysAvailable) {
                setResultsRRHH({
                    rrhhTotalDaysAvailable: Number(formData.rrhhFirstDaysAvailable) + Number(formData.rrhhSecondDaysAvailable),
                    rrhhTotalDaysPending: (Number(formData.rrhhFirstDaysAvailable) + Number(formData.rrhhSecondDaysAvailable) - Number(request.totalDaysRequested.split(" ")[0]))
                })
            }
        }

        return () => {
            unmounted = true;
        };
    }, [formData.rrhhFirstDaysAvailable, formData.rrhhSecondDaysAvailable, request.totalDaysRequested]);

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {

            if (request.step === "Pending Supervisor") {
                setStatus("aprobación y firma del Supervisor")
            } else if (request.step === "Pending RRHH") {
                setStatus("a revición y obsercación por el departamento de Recursos Humanos")
            } else if (request.step === "Pending Approval") {
                setStatus("aprobacion y firma de la Directora de Recursos Humanos")
            }
        }

        return () => {
            unmounted = true;
        };
    }, [request.step]);

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

    const sendFormApplicant = () => {

        if (formData.dayStart === "") {
            return toast.error("Por favor seleccionar el dia de la fecha de inicio");
        } else if (formData.monthStart === "") {
            return toast.error("Por favor seleccionar el mes de la fecha de inicio");
        } else if (formData.yearStart === "") {
            return toast.error("Por favor seleccionar el año de la fecha de inicio");
        } else if (formData.dayEnd === "") {
            return toast.error("Por favor seleccionar el dia de la fecha de fin");
        } else if (formData.monthEnd === "") {
            return toast.error("Por favor seleccionar el mes de la fecha de fin");
        } else if (formData.yearEnd === "") {
            return toast.error("Por favor seleccionar el año de la fecha de fin");
        }

        createVacation(profile.personId,
            profile.fullName,
            profile.position,
            profile.documentId,
            profile.email,
            profile.reportsTo,
            reportTo.name,
            reportTo.email,
            profile.departament,
            currentDate,
            "Vacaciones anuales",
            profile.startedOn,
            `${elapsedDate.year} Años, ${elapsedDate.month} Meses, ${elapsedDate.day} Dias `,
            `${formData.yearStart}-${dayNum(formData.monthStart)}-${formData.dayStart}`,
            `${formData.yearEnd}-${dayNum(formData.monthEnd)}-${formData.dayEnd}`,
            totalDays,
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
                sendEmail(reportTo.email.toLowerCase(), `RESTRELLA@DGAPP.GOB.DO, ${profile.email}`, `Solicitud de Vacaciones - ${profile.fullName}-${currentDate}`, `
                Saludos ${reportTo.name},

                Actualmente el empleado ${profile.fullName}, envío una solicitud de vacaciones. 
                Por el momento la solicitud esta pendiente a la aprobación y firma del supervisor de dicho empleado, 
                para luego ser aprobada y firmada por el departamento de recursos humanos.

                Click aquí para aprobar o confirmar solicitud: ${process.env.REACT_APP_RUTE}/servicios/recursoshumanos/solicitudes/vacaciones/${data.id}
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
        } else if (formData.requiresSubstitute === "Si" && formData.motivesSubstitute === "") {
            return toast.error("Por favor escribir el motivo de un sustituto");
        }

        approveSupervisor(
            request.vacationId,
            formData.requestStatus,
            formData.requiresSubstitute,
            formData.motivesSubstitute,
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
                if (formData.requestStatus === "Aprobada") {
                    sendEmail("RESTRELLA@DGAPP.GOB.DO", [request.email, profile.email], `Solicitud de Vacaciones - ${request.name}-${request.requirementDate}`, `
                    Saludos a quien pueda interesar,

                    La solicitud realizada por el empleado ${request.name}, fué ${formData.requestStatus.toLowerCase()} por su supervisor, Ahora esta en espera del departamento de recursos humanos. 
                    
                    Para cualquier duda por favor de contactarme.

                    Click aquí para finalizar el proceso de solicitud: ${process.env.REACT_APP_RUTE}/servicios/recursoshumanos/solicitudes/vacaciones/${request.vacationId}
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
                    sendEmail(request.email, ["RESTRELLA@DGAPP.GOB.DO", profile.email], `Solicitud de Vacaciones - ${request.name}-${request.requirementDate}`, `
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
        if (formData.rrhhFirstDaysAvailable === "") {
            return toast.error("Por favor digitar los días de vacaciones disponibles del primer año");
        } else if (formData.rrhhFirstYearAvailable === "") {
            return toast.error("Por favor digitar el primer año de vacaciones disponibles");
        } else if (formData.rrhhSecondDaysAvailable === "") {
            return toast.error("Por favor digitar los días de vacaciones disponibles del segundo año");
        } else if (formData.rrhhSecondYearAvailable === "") {
            return toast.error("Por favor digitar el segundo año de vacaciones disponibles");
        }

        revisionRRHH(
            request.vacationId,
            formData.rrhhFirstDaysAvailable,
            formData.rrhhSecondDaysAvailable,
            formData.rrhhFirstYearAvailable,
            formData.rrhhSecondYearAvailable,
            resultsRRHH.rrhhTotalDaysAvailable,
            resultsRRHH.rrhhTotalDaysPending,
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
                sendEmail("CALVAREZ@DGAPP.GOB.DO", [request.email, "RESTRELLA@DGAPP.GOB.DO", request.reportToEmail], `Solicitud de Vacaciones - ${request.name}-${request.requirementDate}`, `
                Saludos Wendy Núñez,

                La solicitud realizada por el empleado ${request.name}, el dia ${request.requirementDate}, se han hechos las observaciones y evaluaciones correspondientes.

                Por favor de verificar el documento para su finalización.
                
                Click aquí para finalizar el proceso de solicitud: ${process.env.REACT_APP_RUTE}/servicios/recursoshumanos/solicitudes/vacaciones/${request.vacationId}`)
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

        pdf.text(request.name, 146, 156);
        pdf.text(request.position.substring(0, 30), 146, 185);
        pdf.text(request.position.substring(30, 100), 146, 197);
        pdf.text(request.documentId, 146, 219);

        pdf.text(request.reportToName, 407, 156);
        pdf.text(request.departament.substring(0, 30), 407, 185);
        pdf.text(request.departament.substring(30, 100), 407, 197);
        pdf.text(request.requirementDate.split("-")[2], 434, 219);
        pdf.text(request.requirementDate.split("-")[1], 477, 219);
        pdf.text(request.requirementDate.split("-")[0], 523, 219);

        pdf.text(request.type, 182, 285);

        pdf.text(request.startedOn.split("-")[2], 182, 312);
        pdf.text(request.startedOn.split("-")[1], 222, 312);
        pdf.text(request.startedOn.split("-")[0], 263, 312);

        pdf.text(request.totalTime, 182, 338);

        pdf.text(request.startDate.split("-")[2], 433, 285);
        pdf.text(request.startDate.split("-")[1], 478, 285);
        pdf.text(request.startDate.split("-")[0], 522, 285);

        pdf.text(request.endDate.split("-")[2], 433, 310);
        pdf.text(request.endDate.split("-")[1], 478, 310);
        pdf.text(request.endDate.split("-")[0], 522, 310);

        pdf.text(request.totalDaysRequested, 478, 337);

        request.requestStatus === "Aprobada" ? pdf.circle(57, 399, 3.5, 'F') : pdf.circle(57, 423, 3.5, 'F')

        pdf.text(request.requiresSubstitute, 340, 399);

        pdf.text(request.motivesSubstitute.substring(0, 50), 305, 418);
        pdf.text(request.motivesSubstitute.substring(50, 100), 305, 428);
        pdf.text(request.motivesSubstitute.substring(100, 150), 305, 438);
        pdf.text(request.motivesSubstitute.substring(150, 200), 305, 448);

        pdf.text(request.name, 90, 527);
        pdf.addImage(request.signatureApplicant, 'PNG', 40, 480, 150, 80);
        pdf.text(request.reportToName, 450, 527);
        pdf.addImage(request.signatureSupervisor, 'PNG', 410, 480, 150, 80);
        pdf.text(profile.fullName, 280, 563);
        pdf.addImage(profile.signature, 'PNG', 230, 495, 150, 80);

        pdf.text(request.rrhhFirstYearDaysAvailable.split("-")[0], 235, 629);
        pdf.text(request.rrhhSecondYearDaysAvailable.split("-")[0], 235, 645);

        pdf.text(request.rrhhFirstYearDaysAvailable.split("-")[1], 455, 629);
        pdf.text(request.rrhhSecondYearDaysAvailable.split("-")[1], 455, 645);

        pdf.text(request.rrhhTotalDaysAvailable, 455, 660);
        pdf.text(request.rrhhTotalDaysPending, 455, 680);

        var btoa = require('btoa');
        var out = pdf.output();
        let url = btoa(out);

        apiApproveRRHH(
            request.vacationId,
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
                sendEmail(request.email, ["RESTRELLA@DGAPP.GOB.DO", request.reportToEmail], `Solicitud de Vacaciones - ${request.name}-${request.requirementDate}`, `
                Saludos ${request.name},

                La solicitud realizada el dia ${request.requirementDate}, fue concluida.

                NOTA: Solicitud adjunta.
                `, `Solicitud de Vacaciones - ${request.name}-${request.requirementDate}.pdf`, url, request.step)
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
                    <p>Actualmente, esta solicitud está pendiente {status}</p> : null
                </div>
                <div className="vacation-header">
                    <p>Información del Personal Solicitante</p>
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
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Solicitud de Vacaciones</p>
                </div>
                <div className="vacation-content">
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Tipo de Vacaciones:</p>
                            {

                                <>
                                    <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue="Vacaciones anuales" />
                                </>
                            }

                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Fecha de Ingreso a DGAPP:</p>
                            <div className="vacation-input-date">
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.startedOn ? request.startedOn.split("-")[2] : profile.startedOn.split("-")[2]} />
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.startedOn ? request.startedOn.split("-")[1] : profile.startedOn.split("-")[1]} />
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.startedOn ? request.startedOn.split("-")[0] : profile.startedOn.split("-")[0]} />
                            </div>
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Tiempo Total en DGAPP:</p>
                            <input
                                disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false}
                                readOnly
                                type="text"
                                value={request?.totalTime ? request?.totalTime : `${elapsedDate.year} Años, ${elapsedDate.month} Meses, ${elapsedDate.day} Dias `}
                                style={{ backgroundColor: "#BCD3E6", fontWeight: "bold" }}
                            />
                        </div>
                    </div>
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Fecha de Inicio:</p>
                            <div className="vacation-input-date">
                                {
                                    request.startDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.startDate.split("-")[2]} /> :
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
                                    request.startDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.startDate.split("-")[1]} /> :
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
                                    request.startDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.startDate.split("-")[0]} /> :
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
                                    request.endDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.endDate.split("-")[2]} /> :
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
                                    request.endDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.endDate.split("-")[0]} /> :
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
                {/* SECTION-3 */}
                <div className="m-0 vacation-header">
                    <p>Aprobación/Rechazo de la Solicitud (Supervisor)</p>
                </div>
                <div className="vacation-section3-container">
                    <div className="vacation-section3-content">
                        <div className="vacation-content-subtitle">
                            <p>Estatus de la Solicitud</p>
                        </div>
                        <div className="vacation-section3-radio">
                            <div className='d-flex mb-4'>
                                <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                    ? false : true} id="approve" name='requestStatus' type="radio" defaultValue="Aprobada" checked={request.requestStatus === "Aprobada" ? true : null} onChange={handlerInputChange} />
                                <label style={{
                                    color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                        ? null : "gainsboro"
                                }} htmlFor='approve'>Aprobada</label>
                                <i className="hi hi-outline-pencil-square" />
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
                            <div className='d-flex'>
                                <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                    ? false : true} id='reject' name='requestStatus' type="radio" defaultValue="Rechazada" checked={request.requestStatus === "Rechazada" ? true : null} onChange={handlerInputChange} />
                                <label style={{
                                    color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                        ? null : "gainsboro"
                                }} htmlFor='reject'>Rechazada</label>
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
                    </div>
                    <div className="vacation-section3-content">
                        <div className="vacation-content-subtitle">
                            <p>En caso de aprobar la solicitud de vacación, el/la Supervisor/a deberá llenar los siguiente</p>
                        </div>
                        <div className="vacation-section3-title">
                            <div className='vacation-section3-radio-cont'>
                                <p style={{
                                    color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                        ? null : "gainsboro"
                                }}>Requiere un sustituto momentáneo?</p>
                                <div className=''>
                                    <input onChange={handlerInputChange} disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                        ? false : true} id="yes" name='requiresSubstitute' type="radio" defaultValue="Si" checked={request.requiresSubstitute === "Si" ? true : null} />
                                    <label style={{
                                        color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                            ? null : "gainsboro"
                                    }} htmlFor='yes'>Si</label>
                                </div>
                                <div className=''>
                                    <input onChange={handlerInputChange} disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                        ? false : true} id='no' name='requiresSubstitute' type="radio" defaultValue="No" checked={request.requiresSubstitute === "No" ? true : null} />
                                    <label style={{
                                        color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                            ? null : "gainsboro"
                                    }} htmlFor='no'>No</label>
                                    {
                                        request.step === "Pending Supervisor" && request.reportToName === profile.fullName ? <>
                                            <i className="hi hi-outline-pencil-square" />
                                            <SlPencil
                                                size="1.2rem"
                                                style={{ marginLeft: "-0.3rem", marginTop: "-0.6rem" }}
                                                color="green"
                                            />
                                        </> : null
                                    }
                                </div>
                            </div>
                            <div className="vacation-section3-textarea">
                                <p style={{
                                    color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                        ? null : "gainsboro"
                                }}>En caso afirmativo, justificar
                                    los motivos a continuación:
                                </p>
                                <textarea
                                    onChange={handlerInputChange}
                                    disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName ? false : true}
                                    name="motivesSubstitute"
                                    maxLength={200}
                                    defaultValue={request.motivesSubstitute ? request.motivesSubstitute : null}
                                />
                                {
                                    request.step === "Pending Supervisor" && request.reportToName === profile.fullName ? <>
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
                </div>
                {/* SECTION-4 */}
                <div className="vacation-header">
                    <p>Firmas Correspondientes (Click al icono para cargar firma)</p>
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
                <div className="vacation-header">
                    <p>Observaciones Generales (USO EXCLUSIVO DE RRHH)</p>
                </div>
                <div className="vacation-section5">
                    <div className="vacation-section5-days-avalibable">
                        <div className="vacation-section5-days-avalibable-title">
                            <p style={{ color: profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? null : "gainsboro" }}>Días de Vacaciones Disponibles:</p>
                        </div>
                        <div className="vacation-section5-days-avalibable-inputs">
                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                {
                                    request.rrhhFirstYearDaysAvailable ? <input name="rrhhFirstDaysAvailable" disabled readOnly type="text" defaultValue={request.rrhhFirstYearDaysAvailable.split("-")[0]} /> :
                                        <select
                                            name="rrhhFirstDaysAvailable"
                                            value={formData.rrhhFirstDaysAvailable || ""}
                                            onChange={handlerInputChange}
                                            disabled={profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? false : true}
                                        >
                                            <option disabled={true} value="">Día</option>
                                            {optionsDay?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>
                                }

                                <p style={{ color: profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? null : "gainsboro" }}>Días Laborables</p>
                            </div>

                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                {
                                    request.rrhhSecondYearDaysAvailable ? <input name="rrhhSecondDaysAvailable" disabled readOnly type="text" defaultValue={request.rrhhSecondYearDaysAvailable.split("-")[0]} /> :
                                        <select
                                            name="rrhhSecondDaysAvailable"
                                            value={formData.rrhhSecondDaysAvailable || ""}
                                            onChange={handlerInputChange}
                                            disabled={profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? false : true}
                                        >
                                            <option disabled={true} value="">Día</option>
                                            {optionsDay?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>
                                }
                                <p style={{ color: profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? null : "gainsboro" }}>Días Laborables</p>
                            </div>
                        </div>
                        <div className="vacation-section5-days-avalibable-inputs">
                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p style={{ color: profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? null : "gainsboro" }}>del año</p>
                                {
                                    request.rrhhFirstYearDaysAvailable ? <input name="rrhhFirstYearAvailable" disabled readOnly type="text" defaultValue={request.rrhhFirstYearDaysAvailable.split("-")[1]} /> :
                                        <select
                                            name="rrhhFirstYearAvailable"
                                            value={formData.rrhhFirstYearAvailable || ""}
                                            onChange={handlerInputChange}
                                            disabled={profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? false : true}
                                        >
                                            <option disabled={true} value="">Año</option>
                                            {optionsYear?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>
                                }

                                {
                                    request.step === "Pending RRHH" && profile.departament === "Recursos Humanos" ? <>
                                        <i className="hi hi-outline-pencil-square" />
                                        <SlPencil
                                            size="1.2rem"
                                            style={{ marginLeft: "0.3rem", marginTop: "1.5rem" }}
                                            color="green"
                                        />
                                    </> : null
                                }
                            </div>

                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p style={{ color: profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? null : "gainsboro" }}>del año</p>
                                {
                                    request.rrhhSecondYearDaysAvailable ? <input name="rrhhSecondYearAvailable" disabled readOnly type="text" defaultValue={request.rrhhSecondYearDaysAvailable.split("-")[1]} /> :
                                        <select
                                            name="rrhhSecondYearAvailable"
                                            value={formData.rrhhSecondYearAvailable || ""}
                                            onChange={handlerInputChange}
                                            disabled={profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? false : true}
                                        >
                                            <option disabled={true} value="">Año</option>
                                            {optionsYear?.map(({ value, id }) => {
                                                return <option key={id} value={value}>{value}</option>;
                                            })}
                                        </select>
                                }
                            </div>
                        </div>
                        <div className="vacation-section5-days-avalibable-inputs">
                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p style={{ color: profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? null : "gainsboro" }}>Total de Días Disponibles:</p>
                                <input style={{ backgroundColor: "#BCD3E6", fontWeight: "bold", width: "15rem" }} name='rrhhTotalDaysAvailable' disabled={profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? false : true}
                                    defaultValue={request.rrhhTotalDaysAvailable ? request.rrhhTotalDaysAvailable : resultsRRHH.rrhhTotalDaysAvailable}
                                />
                            </div>

                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p style={{ color: profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? null : "gainsboro" }}>Total de Días Laborables Pendientes a Disfrutar:</p>
                                <input style={{ backgroundColor: "#BCD3E6", fontWeight: "bold", width: "15rem" }} name='rrhhTotalDaysPending' disabled={profile.departament === "Recursos Humanos" && request.step === "Pending RRHH" ? false : true}
                                    defaultValue={request.rrhhTotalDaysPending ? request.rrhhTotalDaysPending : resultsRRHH.rrhhTotalDaysPending}
                                />
                            </div>
                        </div>
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

export default Vacation