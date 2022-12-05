import React, { useEffect, useState } from 'react'
import jsPDF from "jspdf";
import { getOnePerson } from "../../../api/person"
import { optionsType, optionsDay, optionsMonth, optionsYear } from "../../../utils/optionsArrays"
import { getElapsedDate } from "../../../utils/ElapsedDate"
import moment from "moment-business-days"
import toast from 'react-hot-toast';

const Vacation = ({ img, profile }) => {
    const [reportTo, setReportTo] = useState("");
    const [totalDays, setTotalDays] = useState("");
    const currentDate = new Date().toISOString().slice(0, 10);
    const pdf = new jsPDF('p', 'pt', 'letter');

    const [formData, setFormData] = useState({
        type: "",
        dayStart: "",
        monthStart: "",
        yearStart: "",
        dayEnd: "",
        monthEnd: "",
        yearEnd: "",
    });
    const [elapsedDate, setElapsedDate] = useState({
        day: "",
        month: "",
        year: "",
    });

    const handlerInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
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
                    setReportTo(res.firstName.split(" ", 1) + " " + res.lastName.split(" ", 1))
                })
                .catch((err) => {
                    console.error(err.status);
                });
        }

        return () => {
            unmounted = true;
        };
    }, [profile]);

    const sendForm = () => {

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
        var workDays = fecha2.businessDiff(fecha1, 'days') + 1;

        if (fecha1 >= fecha2) {
            setTotalDays("");
            return toast.error("Formato entre fecha incorrector por faovor verificar!");
        }

        pdf.addImage(img, 'PNG', 10, -30, 585, 830);
        pdf.setFontSize(10);

        pdf.text(profile.fullName, 146, 156);
        pdf.text(profile.position.substring(0, 30), 146, 185);
        pdf.text(profile.position.substring(31, 100), 146, 197);
        pdf.text(profile.documentId, 146, 219);

        pdf.text(reportTo, 407, 156);
        pdf.text(profile.departament.substring(0, 30), 407, 185);
        pdf.text(profile.departament.substring(31, 100), 407, 197);
        pdf.text(currentDate.split("-")[2], 434, 219);
        pdf.text(currentDate.split("-")[1], 477, 219);
        pdf.text(currentDate.split("-")[0], 523, 219);

        pdf.text(formData.type, 182, 285);

        pdf.text(profile.startedOn.split("-")[2], 182, 312);
        pdf.text(profile.startedOn.split("-")[1], 222, 312);
        pdf.text(profile.startedOn.split("-")[0], 263, 312);

        pdf.text(`${elapsedDate.year} Años, ${elapsedDate.month} Meses, ${elapsedDate.day} Días`, 182, 338);

        pdf.text(formData.dayStart, 433, 285);
        pdf.text(formData.monthStart, 478, 285);
        pdf.text(formData.yearStart, 522, 285);

        pdf.text(formData.dayEnd, 433, 312);
        pdf.text(formData.monthEnd, 478, 312);
        pdf.text(formData.yearEnd, 522, 312);

        pdf.text(workDays.toString() + " Días Laborables", 478, 337);

        pdf.text(profile.fullName, 90, 527);
        pdf.text(reportTo, 450, 527);

        pdf.save(`solicitud-vacaciones-${profile.fullName.toLowerCase()}-${currentDate}.pdf`);
    }

    // console.log(totalDays)

    return (
        <div className='vacation-container'>
            {/* SECTION-1 */}
            <div className="vacation-header">
                <p>Información del Personal Solicitante</p>
            </div>
            <div className="vacation-content">
                <div className="vacation-inputs">
                    <div className="vacation-input">
                        <p>Nombre y Apellido:</p>
                        <input name='name' type="text" value={profile.fullName || ""} />
                    </div>
                    <div className="vacation-input">
                        <p>Puesto:</p>
                        <input type="text" value={profile.position} />
                    </div>
                    <div className="vacation-input">
                        <p>Cédula:</p>
                        <input type="text" value={profile.documentId} />
                    </div>
                </div>
                <div className="vacation-inputs">
                    <div className="vacation-input">
                        <p>Supervisor/a:</p>
                        <input type="text" value={reportTo} />
                    </div>
                    <div className="vacation-input">
                        <p>Departamento:</p>
                        <input type="text" value={profile.departament} />
                    </div>
                    <div className="vacation-input">
                        <p>Fecha de la Solicitud:</p>
                        <div className="vacation-input-date">
                            <input type="text" value={currentDate.split("-")[2]} />
                            <input type="text" value={currentDate.split("-")[1]} />
                            <input type="text" value={currentDate.split("-")[0]} />
                        </div>
                    </div>
                </div>
            </div>
            {/* SECTION-2 */}
            <div className="vacation-header">
                <p>Solicitud de Vacaciones</p>
            </div>
            <div className="vacation-content">
                <div className="vacation-inputs">
                    <div className="vacation-input">
                        <p>Tipo de Vacaciones:</p>
                        <select
                            name="type"
                            value={formData.type || ""}
                            onChange={handlerInputChange}
                        >
                            <option disabled={true} value="">Seleccione el tipo de Vacaciones</option>
                            {optionsType?.map(({ value, id }) => {
                                return <option key={id} value={value}>{value}</option>;
                            })}
                        </select>
                    </div>
                    <div className="vacation-input">
                        <p>Fecha de Ingreso a DGAPP:</p>
                        <div className="vacation-input-date">
                            <input type="text" value={profile.startedOn.split("-")[2]} />
                            <input type="text" value={profile.startedOn.split("-")[1]} />
                            <input type="text" value={profile.startedOn.split("-")[0]} />
                        </div>
                    </div>
                    <div className="vacation-input">
                        <p>Tiempo Total en DGAPP:</p>
                        <input type="text" value={`${elapsedDate.year} Años, ${elapsedDate.month} Meses, ${elapsedDate.day} Dias `} />
                    </div>
                </div>
                <div className="vacation-inputs">
                    <div className="vacation-input">
                        <p>Fecha de Inicio:</p>
                        <div className="vacation-input-date">
                            <select
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

                            <select
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

                            <select
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
                        </div>
                    </div>
                    <div className="vacation-input">
                        <p>Fecha de Fin:</p>
                        <div className="vacation-input-date">
                            <select
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

                            <select
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

                            <select
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
                        </div>
                    </div>
                    <div className="vacation-input">
                        <p>Total de Días Solicitados:</p>
                        <input type="text" placeholder='Click aquí calcular dias' defaultValue={totalDays} />
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
                            <input id="approve" name='status' type="radio" defaultValue="Aprobada" />
                            <label htmlFor='approve'>Aprobada</label>
                        </div>
                        <div className='d-flex'>
                            <input id='reject' name='status' type="radio" defaultValue="Rechazada" />
                            <label htmlFor='reject'>Rechazada</label>
                        </div>
                    </div>
                </div>
                <div className="vacation-section3-content">
                    <div className="vacation-content-subtitle">
                        <p>En caso de aprobar la solicitud de vacación, el/la Supervisor/a deberá llenar los siguiente</p>
                    </div>
                    <div className="vacation-section3-title">
                        <div className='vacation-section3-radio-cont'>
                            <p>Requiere un sustituto momentáneo?</p>
                            <div className=''>
                                <input id="yes" name='substitute' type="radio" defaultValue="Si" />
                                <label htmlFor='yes'>Si</label>
                            </div>
                            <div className=''>
                                <input id='no' name='substitute' type="radio" defaultValue="No" />
                                <label htmlFor='no'>No</label>
                            </div>
                        </div>
                        <div className="vacation-section3-textarea">
                            <p>En caso afirmativo, justificar
                                los motivos a continuación:
                            </p>
                            <textarea name="" id="" cols="30" rows="10" />
                        </div>
                    </div>
                </div>
            </div>
            {/* SECTION-4 */}
            <div className="vacation-header">
                <p>Firmas Correspondientes</p>
            </div>
            <div className="vacation-section4">
                <div className="vacation-section4-line">
                    <span>{profile.fullName}</span>
                    <div className="vacacion-section4-canvas"></div>
                    <p>Firma de la Persona Solicitante</p>
                </div>
                <div className="vacacion-section4-mt mb-5 vacation-section4-line">
                    {/* <span>{profile.fullName}</span> */}
                    <div className="vacacion-section4-canvas"></div>
                    <p>Departamento de Recursos Humanos</p>
                </div>
                <div className="vacation-section4-line">
                    <span>{reportTo}</span>
                    <div className="vacacion-section4-canvas"></div>
                    <p>Supervisor/a del Área</p>
                </div>
            </div>
            {/* SECTION-5 */}
            <div className="vacation-header">
                <p>Observaciones Generales (USO EXCLUSIVO DE RRHH)</p>
            </div>
            <div className="vacation-section5">
                <button onClick={sendForm}>ENVIAR</button>
            </div>
        </div>
    )
}

export default Vacation