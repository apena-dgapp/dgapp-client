import React, { useEffect, useState, useRef } from 'react'
import jsPDF from "jspdf";
import { getOnePerson } from "../../api/person"
import { optionsType, optionsDay, optionsMonth, optionsYear } from "../../utils/optionsArrays"
import { getElapsedDate } from "../../utils/ElapsedDate"
import moment from "moment-business-days"
import toast from 'react-hot-toast';
import { createVacation, approveSupervisor } from '../../api/form';
import { sendEmail } from "../../api/email";
import ImageCrop from './ImageCrop';
// import { TbUpload } from "react-icons/tb";
import { getBase64 } from "../../utils/blobManager";
import { signatureRRHH } from "../../utils/signatureRRHH"

const Vacation = ({ img, profile, request }) => {
    const [modalActive, setModalActive] = useState(false);
    const [totalDays, setTotalDays] = useState("");
    const currentDate = new Date().toISOString().slice(0, 10);
    const pdf = new jsPDF('p', 'pt', 'letter');
    const [image, setImage] = useState("");
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

    const seletedHandler = async (e) => {
        setImage(await getBase64(e.target.files[0]));
    };

    const onBlurTotalDays = () => {
        if (formData.dayStart && formData.monthStart && formData.yearStart && formData.dayEnd && formData.monthEnd && formData.yearEnd) {
            var fecha1 = moment(`${formData.dayStart}-${formData.monthStart}-${formData.yearStart}`);
            var fecha2 = moment(`${formData.dayEnd}-${formData.monthEnd}-${formData.yearEnd}`);
            var workDays = fecha2.businessDiff(fecha1, 'days') + 1;

            if (fecha1 >= fecha2) {
                setTotalDays("");
                return toast.error("Formato entre fecha incorrector por faovor verificar!");
            }
            setTotalDays(workDays.toString() + " Días Laborables");
        }
    }

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {

            setElapsedDate({
                day: getElapsedDate(`${Number(profile.startedOn.split("-")[0])}, ${Number(profile.startedOn.split("-")[1])}, ${Number(profile.startedOn.split("-")[2])}`).day,
                month: getElapsedDate(`${Number(profile.startedOn.split("-")[0])}, ${Number(profile.startedOn.split("-")[1])}, ${Number(profile.startedOn.split("-")[2])}`).month,
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

        if (formData.type === "") {
            return toast.error("Por favor seleccionar el tipo de vaciones");
        } else if (formData.dayStart === "") {
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

        var fecha1 = moment(`${formData.dayStart}-${formData.monthStart}-${formData.yearStart}`);
        var fecha2 = moment(`${formData.dayEnd}-${formData.monthEnd}-${formData.yearEnd}`);
        // var workDays = fecha2.businessDiff(fecha1, 'days') + 1;

        if (fecha1 >= fecha2) {
            setTotalDays("");
            return toast.error("Formato entre fecha incorrector por faovor verificar!");
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
            formData.type,
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

                Actualmente el empleado ${profile.fullName} envío una solicitud de vacaciones. 
                Por el momento la solicitud esta pendiente a la aprobación y firma del supervisor de dicho empleado, 
                para luego ser aprobada y firmada por el departamento de recursos humanos.

                Click aquí para aprobar o confirmar solicitud: http://localhost:3000/servicios/recursoshumanos/solicitudes/vacaciones/${data.id}
                `)
                    .then((res) => {
                        if (res.status !== 200) {
                            return toast.error("Error al intentar enviar la solicitud");
                        } else {
                            toast.success("La solicitud se envío exitosamente!");
                            setFormData({
                                // issueName: "",
                                // category: "",
                                // detail: "",
                                // assigned: "",
                                // priority: ""
                            });
                        }
                    })
            })
            .catch((err) => {
                console.error(err.status);
                toast.error("Error al intentar enviar el formulario");
            });

        // pdf.save(`solicitud-vacaciones-${profile.fullName.toLowerCase()}-${currentDate}.pdf`);
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
                sendEmail("RESTRELLA@DGAPP.GOB.DO", [request.email, profile.email], `Solicitud de Vacaciones - ${request.name}-${request.requirementDate}`, `
                Saludos Ruth Estrella,

                La solicitud realizada por el empleado ${request.name} fué ${formData.requestStatus}. ${formData.requestStatus = "si" ? "Por favor continuar con el siguente paso" : "Para cualquier duda por favor de contactarme."}.

                Click aquí para finalizar el proceso de solicitud: http://localhost:3000/servicios/recursoshumanos/solicitudes/vacaciones/${request.vacationId}
                `)
                    .then((res) => {
                        if (res.status !== 200) {
                            return toast.error("Error al intentar enviar la solicitud");
                        } else {
                            toast.success("La solicitud se envío exitosamente!");
                            setFormData({
                                //     requestStatus: "",
                                //     requiresSubstitute: "",
                                //     motivesSubstitute: ""
                            });
                        }
                    })
            })
            .catch((err) => {
                console.error(err.status);
                toast.error("Error al intentar enviar el formulario");
            });
    }

    const sendFormRRHH = () => {

        if (formData.type === "") {
            return toast.error("Por favor seleccionar el tipo de vaciones");
        } else if (formData.dayStart === "") {
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

        var fecha1 = moment(`${formData.dayStart}-${formData.monthStart}-${formData.yearStart}`);
        var fecha2 = moment(`${formData.dayEnd}-${formData.monthEnd}-${formData.yearEnd}`);
        // var workDays = fecha2.businessDiff(fecha1, 'days') + 1;

        if (fecha1 >= fecha2) {
            setTotalDays("");
            return toast.error("Formato entre fecha incorrector por faovor verificar!");
        }

        // pdf.addImage(img, 'PNG', 10, -30, 585, 830);
        // pdf.setFontSize(10);

        // pdf.text(profile.fullName, 146, 156);
        // pdf.text(profile.position.substring(0, 30), 146, 185);
        // pdf.text(profile.position.substring(31, 100), 146, 197);
        // pdf.text(profile.documentId, 146, 219);

        // pdf.text(reportTo.name, 407, 156);
        // pdf.text(profile.departament.substring(0, 30), 407, 185);
        // pdf.text(profile.departament.substring(31, 100), 407, 197);
        // pdf.text(currentDate.split("-")[2], 434, 219);
        // pdf.text(currentDate.split("-")[1], 477, 219);
        // pdf.text(currentDate.split("-")[0], 523, 219);

        // pdf.text(formData.type, 182, 285);

        // pdf.text(profile.startedOn.split("-")[2], 182, 312);
        // pdf.text(profile.startedOn.split("-")[1], 222, 312);
        // pdf.text(profile.startedOn.split("-")[0], 263, 312);

        // pdf.text(`${elapsedDate.year} Años, ${elapsedDate.month} Meses, ${elapsedDate.day} Días`, 182, 338);

        // pdf.text(formData.dayStart, 433, 285);
        // pdf.text(formData.monthStart, 478, 285);
        // pdf.text(formData.yearStart, 522, 285);

        // pdf.text(formData.dayEnd, 433, 312);
        // pdf.text(formData.monthEnd, 478, 312);
        // pdf.text(formData.yearEnd, 522, 312);

        // pdf.text(workDays.toString() + "Días Laborables", 478, 337);

        // pdf.text(profile.fullName, 90, 527);
        // pdf.addImage(signature ? signature : profile.signature, 'PNG', 40, 460, 150, 80);
        // pdf.text(reportTo.name, 450, 527);
        // pdf.text("Ruth Estrella", 280, 563);

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
            formData.type,
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

                Actualmente el empleado ${profile.fullName} envío una solicitud de vacaciones. 
                Por el momento la solicitud esta pendiente a la aprobación y firma del supervisor de dicho empleado, 
                para luego ser aprobada y firmada por el departamento de recursos humanos.

                Click aquí para aprobar o confirmar solicitud: http://localhost:3000/servicios/recursoshumanos/solicitudes/vacaciones/${data.id}
                `)
                    .then((res) => {
                        if (res.status !== 200) {
                            return toast.error("Error al intentar enviar la solicitud");
                        } else {
                            toast.success("La solicitud se envío exitosamente!");
                            setFormData({
                                // issueName: "",
                                // category: "",
                                // detail: "",
                                // assigned: "",
                                // priority: ""
                            });
                        }
                    })
            })
            .catch((err) => {
                console.error(err.status);
                toast.error("Error al intentar enviar el formulario");
            });

        // pdf.save(`solicitud-vacaciones-${profile.fullName.toLowerCase()}-${currentDate}.pdf`);
    }

    // console.log(request);
    console.log(formData);

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
                    {
                        request.step === "Pending Supervisor" ? <p>Actualmente, esta solicitud está pendiente aprobación y firma del supervisor</p> : null
                    }

                    {
                        request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? <button>Eliminar Solicitud</button> : null
                    }

                </div>
                <div className="vacation-header">
                    <p>Información del Personal Solicitante</p>
                </div>
                <div className="vacation-content">
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Nombre y Apellido:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly name='name' type="text" defaultValue={request.name ? request.name : profile.fullName} />
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Puesto:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.position ? request.position : profile.position} />
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Cédula:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.documentId ? request.documentId : profile.documentId} />
                        </div>
                    </div>
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Supervisor/a:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.reportToName ? request.reportToName : reportTo.name} />
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Departamento:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.departament ? request.departament : profile.departament} />
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Fecha de la Solicitud:</p>
                            <div className="vacation-input-date">
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.requirementDate ? request.requirementDate.split("-")[2] : currentDate.split("-")[2]} />
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.requirementDate ? request.requirementDate.split("-")[1] : currentDate.split("-")[1]} />
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.requirementDate ? request.requirementDate.split("-")[0] : currentDate.split("-")[0]} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* SECTION-2 */}
                <div className="vacation-header">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Solicitud de Vacaciones</p>
                </div>
                <div className="vacation-content">
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Tipo de Vacaciones:</p>
                            {
                                request.type ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.type} /> : <select
                                    name="type"
                                    value={formData.type || ""}
                                    onChange={handlerInputChange}
                                >
                                    <option disabled={true} value="">Seleccione el tipo de Vacaciones</option>
                                    {optionsType?.map(({ value, id }) => {
                                        return <option key={id} value={value}>{value}</option>;
                                    })}
                                </select>
                            }

                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Fecha de Ingreso a DGAPP:</p>
                            <div className="vacation-input-date">
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.startedOn ? request.startedOn.split("-")[2] : profile.startedOn.split("-")[2]} />
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.startedOn ? request.startedOn.split("-")[1] : profile.startedOn.split("-")[1]} />
                                <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.startedOn ? request.startedOn.split("-")[0] : profile.startedOn.split("-")[0]} />
                            </div>
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Tiempo Total en DGAPP:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOn type="text" value={request?.totalTime ? request?.totalTime : `${elapsedDate.year} Años, ${elapsedDate.month} Meses, ${elapsedDate.day} Dias `} />
                        </div>
                    </div>
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Fecha de Inicio:</p>
                            <div className="vacation-input-date">
                                {
                                    request.startDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.startDate.split("-")[2]} /> : <select
                                        name="dayStart"
                                        value={formData.dayStart || ""}
                                        onChange={handlerInputChange}
                                        onBlur={onBlurTotalDays}

                                    >
                                        <option disabled={true} value="">Día</option>
                                        {optionsDay?.map(({ value, id }) => {
                                            return <option key={id} value={value}>{value}</option>;
                                        })}
                                    </select>
                                }

                                {
                                    request.startDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.startDate.split("-")[1]} /> : <select
                                        name="monthStart"
                                        value={formData.monthStart || ""}
                                        onChange={handlerInputChange}
                                        onBlur={onBlurTotalDays}
                                    >
                                        <option disabled={true} value="">Mes</option>
                                        {optionsMonth?.map(({ value, id }) => {
                                            return <option key={id} value={value}>{value}</option>;
                                        })}
                                    </select>
                                }

                                {
                                    request.startDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.startDate.split("-")[0]} /> : <select
                                        name="yearStart"
                                        value={formData.yearStart || ""}
                                        onChange={handlerInputChange}
                                        onBlur={onBlurTotalDays}
                                    >
                                        <option disabled={true} value="">Año</option>
                                        {optionsYear?.map(({ value, id }) => {
                                            return <option key={id} value={value}>{value}</option>;
                                        })}
                                    </select>
                                }

                            </div>
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Fecha de Fin:</p>
                            <div className="vacation-input-date">
                                {
                                    request.endDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.endDate.split("-")[2]} /> : <select
                                        name="dayEnd"
                                        value={formData.dayEnd || ""}
                                        onChange={handlerInputChange}
                                        onBlur={onBlurTotalDays}
                                    >
                                        <option disabled={true} value="">Día</option>
                                        {optionsDay?.map(({ value, id }) => {
                                            return <option key={id} value={value}>{value}</option>;
                                        })}
                                    </select>
                                }

                                {
                                    request.endDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.endDate.split("-")[1]} /> : <select
                                        name="monthEnd"
                                        value={formData.monthEnd || ""}
                                        onChange={handlerInputChange}
                                        onBlur={onBlurTotalDays}
                                    >
                                        <option disabled={true} value="">Mes</option>
                                        {optionsMonth?.map(({ value, id }) => {
                                            return <option key={id} value={value}>{value}</option>;
                                        })}
                                    </select>
                                }

                                {
                                    request.endDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" defaultValue={request.endDate.split("-")[0]} /> : <select
                                        name="yearEnd"
                                        value={formData.yearEnd || ""}
                                        onChange={handlerInputChange}
                                        onBlur={onBlurTotalDays}
                                    >
                                        <option disabled={true} value="">Año</option>
                                        {optionsYear?.map(({ value, id }) => {
                                            return <option key={id} value={value}>{value}</option>;
                                        })}
                                    </select>
                                }

                            </div>
                        </div>
                        <div className="vacation-input">
                            <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? "gainsboro" : null }}>Total de Días Solicitados:</p>
                            <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" ? true : false} readOnly type="text" placeholder='Click aquí calcular dias' defaultValue={request.totalDaysRequested ? request.totalDaysRequested : totalDays} />
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
                                    ? false : true} id="approve" name='requestStatus' type="radio" defaultValue="Aprobada" checked={request.requestStatus === "Aprobada" ? true : false} onChange={handlerInputChange} />
                                <label style={{
                                    color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                        ? null : "gainsboro"
                                }} htmlFor='approve'>Aprobada</label>
                            </div>
                            <div className='d-flex'>
                                <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                    ? false : true} id='reject' name='requestStatus' type="radio" defaultValue="Rechazada" checked={request.requestStatus === "Rechazada" ? true : false} onChange={handlerInputChange} />
                                <label style={{
                                    color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                        ? null : "gainsboro"
                                }} htmlFor='reject'>Rechazada</label>
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
                                        ? false : true} id="yes" name='requiresSubstitute' type="radio" defaultValue="Si" checked={request.requiresSubstitute === "Si" ? true : false} />
                                    <label style={{
                                        color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                            ? null : "gainsboro"
                                    }} htmlFor='yes'>Si</label>
                                </div>
                                <div className=''>
                                    <input onChange={handlerInputChange} disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                        ? false : true} id='no' name='requiresSubstitute' type="radio" defaultValue="No" checked={request.requiresSubstitute === "No" ? true : false} />
                                    <label style={{
                                        color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                            ? null : "gainsboro"
                                    }} htmlFor='no'>No</label>
                                </div>
                            </div>
                            <div className="vacation-section3-textarea">
                                <p style={{
                                    color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                        ? null : "gainsboro"
                                }}>En caso afirmativo, justificar
                                    los motivos a continuación:
                                </p>
                                <textarea onChange={handlerInputChange} disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                    ? false : true} name="motivesSubstitute" id="" cols="30" rows="10" defaultValue={request.motivesSubstitute ? request.motivesSubstitute : null} />
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
                            request.signatureRRHH ? <img className='vacation-signature-rrhh' src={request.signatureRRHH} alt='signature' /> : (request.step === "Pending RRHH" && "Ruth Estrella" === profile.fullName ?
                                <img className='vacation-signature-rrhh' src={signatureRRHH} alt='signature' /> : null)
                        }

                        <span style={{ color: "Ruth Estrella" !== profile.fullName || request.step !== "Pending RRHH" ? "gainsboro" : null }}>Ruth Estrella</span>
                        <div className="vacacion-section4-canvas"></div>
                        <p style={{ color: "Ruth Estrella" !== profile.fullName || request.step !== "Pending RRHH" ? "gainsboro" : null, backgroundColor: "Ruth Estrella" !== profile.fullName || request.step !== "Pending RRHH" ? "gainsboro" : null }}>Departamento de Recursos Humanos</p>
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
                            <p>Días de Vacaciones Disponibles:</p>
                        </div>
                        <div className="vacation-section5-days-avalibable-inputs">
                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <input name='rrhhFirstDaysAvailable' disabled={request.step !== "Pending RRHH" ? true : false}
                                    value={formData.rrhhFirstDaysAvailable || ""} onChange={handlerInputChange}
                                />
                                <p>Días Laborables</p>
                            </div>

                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <input name='rrhhSecondDaysAvailable' disabled={request.step !== "Pending RRHH" ? true : false}
                                    value={formData.rrhhSecondDaysAvailable || ""} onChange={handlerInputChange}
                                />
                                <p>Días Laborables</p>
                            </div>
                        </div>
                        <div className="vacation-section5-days-avalibable-inputs">
                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p>del año</p>
                                <input name='rrhhFirstYearAvailable' disabled={request.step !== "Pending RRHH" ? true : false}
                                    value={formData.rrhhFirstYearAvailable || ""} onChange={handlerInputChange}
                                />
                            </div>

                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p>del año</p>
                                <input name='rrhhSecondYearAvailable' disabled={request.step !== "Pending RRHH" ? true : false}
                                    value={formData.rrhhSecondYearAvailable || ""} onChange={handlerInputChange}
                                />
                            </div>
                        </div>
                        <div className="vacation-section5-days-avalibable-inputs">
                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p>Total de Días Disponibles:</p>
                                <input name='rrhhTotalDaysAvailable' disabled={request.step !== "Pending RRHH" ? true : false}
                                    value={formData.rrhhTotalDaysAvailable || ""} onChange={handlerInputChange}
                                />
                            </div>

                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p>Total de Días Laborables Pendientes a Disfrutar:</p>
                                <input name='rrhhTotalDaysPending' disabled={request.step !== "Pending RRHH" ? true : false}
                                    value={formData.rrhhTotalDaysPending || ""} onChange={handlerInputChange}
                                />
                            </div>
                        </div>
                    </div>
                    {/* <div className="vacation-section5-days-avalibable">
                        <div className="vacation-section5-days-avalibable-inputs">
                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p>del año</p>
                                <input disabled={request.step !== "Pending RRHH" ? true : false} />
                            </div>
                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p>del año</p>
                                <input disabled={request.step !== "Pending RRHH" ? true : false} />
                            </div>
                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p>Total de Días Disponibles:</p>
                                <input disabled={request.step !== "Pending RRHH" ? true : false} />
                            </div>
                            <div className='vacation-section5-days-avalibable-inputs-section'>
                                <p>Total de Días Laborables Pendientes a Disfrutar:</p>
                                <input disabled={request.step !== "Pending RRHH" ? true : false} />
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
            <div className="vacation-section5">
                <button onClick={request.step === "Pending Supervisor" ? sendFormSupervisor : (request.step === "Pending RRHH" ? sendFormRRHH : sendFormApplicant)}>ENVIAR</button>
            </div>
        </>
    )
}

export default Vacation