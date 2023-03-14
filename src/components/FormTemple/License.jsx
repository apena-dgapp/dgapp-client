import React, { useState, useEffect } from 'react'
import { getElapsedDate } from "../../utils/ElapsedDate"
import { getOnePerson } from "../../api/person"
import { SlPencil } from "react-icons/sl";
import { optionsDay, optionsMonth, optionsYear } from "../../utils/optionsArrays"

const License = ({ request, profile }) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const [totalDays, setTotalDays] = useState("");
    const [reportTo, setReportTo] = useState({
        name: "",
        email: ""
    });

    const [elapsedDate, setElapsedDate] = useState({
        day: "",
        month: "",
        year: "",
    });

    const [formData, setFormData] = useState({
        type: "",
        dayStart: "",
        startHour: "",
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

    const optionsType = [
        {
            id: "1",
            value: "Licencia",
        },
        {
            id: "2",
            value: "Permiso",
        },
        {
            id: "3",
            value: "Otro",
        }
    ];

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

    const handlerInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
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
                                request.startDate ? <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} readOnly type="text" defaultValue={request.startDate.split("-")[1]} /> :
                                    <select
                                        name="type"
                                        value={formData.monthStart || ""}
                                        onChange={handlerInputChange}
                                    // onBlur={onBlurTotalDays}
                                    >
                                        <option disabled={true} value="">Seleccione el tipo de solicitud</option>
                                        {optionsType?.map(({ value, id }) => {
                                            return <option key={id} value={value}>{value}</option>;
                                        })}
                                    </select>
                            }

                        </div>
                        <div className="license-input">
                            {/* <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Fecha de Ingreso a DGAPP:</p> */}
                            <div className="license-input-time-container">
                                <div className="license-input-time">
                                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Hora de Inicio:</p>
                                    <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} type="text" />
                                </div>
                                <div className="license-input-time">
                                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Hora de Fin:</p>
                                    <input disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} type="text" />
                                </div>
                                <div className="license-input-time">
                                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>Total de Horas:</p>
                                    <input style={{ backgroundColor: "#BCD3E6", fontWeight: "bold" }} disabled={request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? true : false} type="text" />
                                </div>
                            </div>
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
                <div className="vacation-sub-header">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>2.1 Seleccione de las siguientes opciones el motivo que justifique la solicitud de Licencia/Permiso.</p>
                </div>
                <div className="license-section2-radio-container">
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id="approve" name='requestStatus' type="radio" defaultValue="Aprobada" checked={request.requestStatus === "Aprobada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='approve'>Matrimonio</label>
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
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id='reject' name='requestStatus' type="radio" defaultValue="Rechazada" checked={request.requestStatus === "Rechazada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='reject'>Licencia por Paternidad</label>
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
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id='reject' name='requestStatus' type="radio" defaultValue="Rechazada" checked={request.requestStatus === "Rechazada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='reject'>Licencia por Maternidad</label>
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
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id='reject' name='requestStatus' type="radio" defaultValue="Rechazada" checked={request.requestStatus === "Rechazada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='reject'>Enfermedad</label>
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
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id='reject' name='requestStatus' type="radio" defaultValue="Rechazada" checked={request.requestStatus === "Rechazada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='reject'>Comisión de Servicios</label>
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
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id='reject' name='requestStatus' type="radio" defaultValue="Rechazada" checked={request.requestStatus === "Rechazada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='reject'>Cargo a Vacaciones</label>
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
                <div className="license-section2-radio-container">
                    <div className='license-section2-textarea-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id="approve" name='requestStatus' type="radio" defaultValue="Aprobada" checked={request.requestStatus === "Aprobada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='approve'>Otro; Especifique:</label>
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
                    <div className='license-section2-textarea'>
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
                <div className="vacation-sub-header">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>2.2  Describa brevemente las razones de la solicitud de Licencia/Permiso:</p>
                </div>
                <div className="license-section2-radio-container">
                    <div className='license-section2-2-textarea'>
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

                {/* SECTION-3 */}
                <div className="vacation-header">
                    <p style={{ color: request.step === "Pending Supervisor" || request.step === "Pending RRHH" || request.step === "Pending Approval" ? "gainsboro" : null }}>3.  Aprobación/Rechazo de la Solicitud:</p>
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
                    <div className='license-section2-radio'>
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
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id='reject' name='requestStatus' type="radio" defaultValue="Rechazada" checked={request.requestStatus === "Rechazada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='reject'>Remunerada</label>
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
                    <div className='license-section2-radio'>
                        <input disabled={request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                            ? false : true} id='reject' name='requestStatus' type="radio" defaultValue="Rechazada" checked={request.requestStatus === "Rechazada" ? true : null} onChange={handlerInputChange} />
                        <label style={{
                            color: request.step === "Pending Supervisor" && request.reportToName === profile.fullName
                                ? null : "gainsboro"
                        }} htmlFor='reject'>No Remunerada</label>
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
                    <p>4. Firmas Correspondientes (Click al icono para cargar firma)</p>
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
            <div>
                {
                    request.step !== "Pending Approval" ? <button
                        // onClick={request.step === "Pending Supervisor" ? sendFormSupervisor : (request.step === "Pending RRHH" ? sendFormRRHH : sendFormApplicant)}
                        className={request.step === "Pending Supervisor" && request.reportToName !== profile.fullName ? "btn-disabled" : (request.step === "Pending RRHH" && profile.departament !== "Recursos Humanos" ? "btn-disabled" : "btn-active")}
                        disabled={request.step === "Pending Supervisor" && request.reportToName !== profile.fullName ? true : (request.step === "Pending RRHH" && profile.departament !== "Recursos Humanos" ? true : false)}
                    >
                        ENVIAR
                    </button> : <button
                        // onClick={approveRRHH}
                        className={profile.position !== "Directora de Recursos Humanos" ? "btn-disabled" : "btn-active"}
                        disabled={profile.position !== "Directora de Recursos Humanos" ? true : false}
                    >APROBAR</button>
                }

            </div>
        </>
    )
}

export default License