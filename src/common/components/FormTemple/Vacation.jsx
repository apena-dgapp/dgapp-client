import React from 'react'

const Vacation = () => {
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
                        <input type="text" />
                    </div>
                    <div className="vacation-input">
                        <p>Puesto:</p>
                        <input type="text" />
                    </div>
                    <div className="vacation-input">
                        <p>Cédula:</p>
                        <input type="text" />
                    </div>
                </div>
                <div className="vacation-inputs">
                    <div className="vacation-input">
                        <p>Supervisor/a:</p>
                        <input type="text" />
                    </div>
                    <div className="vacation-input">
                        <p>Departamento:</p>
                        <input type="text" />
                    </div>
                    <div className="vacation-input">
                        <p>Fecha de la Solicitud:</p>
                        <div className="vacation-input-date">
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
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
                        <input type="text" />
                    </div>
                    <div className="vacation-input">
                        <p>Fecha de Ingreso a DGAPP:</p>
                        <div className="vacation-input-date">
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                        </div>
                    </div>
                    <div className="vacation-input">
                        <p>Tiempo Total en DGAPP:</p>
                        <input type="text" />
                    </div>
                </div>
                <div className="vacation-inputs">
                    <div className="vacation-input">
                        <p>Fecha de Inicio:</p>
                        <div className="vacation-input-date">
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                        </div>
                    </div>
                    <div className="vacation-input">
                        <p>Fecha de Fin:</p>
                        <div className="vacation-input-date">
                            <input type="text" />
                            <input type="text" />
                            <input type="text" />
                        </div>
                    </div>
                    <div className="vacation-input">
                        <p>Total de Días Solicitados:</p>
                        <input type="text" />
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
                        <div className='d-flex'>
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
                </div>
            </div>
        </div>
    )
}

export default Vacation