import React, { useRef, useState, useEffect } from 'react';
import { apiOneFile } from "../../api/files";
import * as jsPDF from 'jspdf';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Attendance = ({ setHeader }) => {
    const pdf = new jsPDF.jsPDF('p', 'pt', 'letter', 'a4', true);
    const [img, setImg] = useState("");
    const [formData, setFormData] = useState({
        date: "",
        subject: "",
        type: ""
    });

    const optionsType = [
        {
            id: "1",
            value: "Interna",
        },
        {
            id: "2",
            value: "Externa",
        }
    ]

    const navigate = useNavigate();

    const handlerInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const refInput = useRef();

    const inputDate = () => {
        refInput.current.type = "date";
    };

    const inputText = () => {
        refInput.current.type = "text";
    };
    const requestMenu = () => {
        navigate("/servicios/recursoshumanos/solicitudes");
    };

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            apiOneFile(formData.type === "Interna" ? "CAL-FO-003 -Formulario Lista de Asistencia Interna. V.0." : "CAL-FO-004 -Formulario Lista de Asistencia Externa. V.0.")
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
    }, [formData.type]);

    useEffect(() => {

        let unmounted = false;

        if (!unmounted) {
            if (formData.type === "Interna") {
                setHeader({
                    code: "CAL-FO-003",
                    date: "3/8/2022",
                    version: "0"
                })
            } else if (formData.type === "Externa") {
                setHeader({
                    code: "CAL-FO-004",
                    date: "3/8/2022",
                    version: "0"
                })
            }
        }

        return () => {
            unmounted = true;
        };
    }, [formData, setHeader]);

    const sendForm = () => {

        if (formData.date === "") {
            return toast.error("Por favor digitar la fecha");
        } else if (formData.subject === "") {
            return toast.error("Por favor digitar el asunto");
        } else if (formData.type === "") {
            return toast.error("Por favor seleccionar el tipo");
        }

        pdf.addImage(img, 'PNG', 15, 10, 585, 760, 'undefined', 'FAST');
        pdf.setFontSize(10);

        pdf.text(formData.date, 146, 133);
        pdf.text(formData.subject, 146, 156);

        pdf.save(`solicitud-asistencia-${formData.type}-${formData.subject.toLowerCase()}-${formData.date}.pdf`);

        requestMenu();
    }
    return (
        <>

            <div className='vacation-container'>
                {/* SECTION-1 */}
                <div className="vacation-header">
                    <p>Favor de llenar los siguientes campos</p>
                </div>
                <div className="vacation-content">
                    <div className="vacation-inputs">
                        <div className="vacation-input">
                            <p>Tipo:</p>
                            <select
                                name="type"
                                value={formData.type || ""}
                                onChange={handlerInputChange}
                            >
                                <option disabled={true} value="">Agregar si es interna o externa</option>
                                {optionsType?.map(({ value, id }) => {
                                    return <option key={id} value={value}>{value}</option>;
                                })}
                            </select>
                        </div>
                        <div className="vacation-input">
                            <p>Fecha:</p>
                            <input
                                id="date"
                                name="date"
                                type="text"
                                onBlur={inputText}
                                onFocus={inputDate}
                                placeholder="Agregar una fecha"
                                onChange={handlerInputChange}
                                value={formData.date || ""}
                                ref={refInput}
                            />
                        </div>
                        <div className="vacation-input">
                            <p>Asunto:</p>
                            <input
                                name='subject'
                                type="text"
                                placeholder="Agregar un asunto"
                                onChange={handlerInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <button
                    onClick={sendForm}
                    className={formData.date !== "" && formData.subject !== "" && formData.type !== "" ? "btn-active" : "btn-disabled"}
                    disabled={formData.date !== "" && formData.subject !== "" && formData.type !== "" ? false : true}
                >
                    DESCARGAR
                </button>
            </div>
        </>
    )
}

export default Attendance