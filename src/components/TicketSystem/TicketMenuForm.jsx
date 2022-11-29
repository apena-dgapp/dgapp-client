import React from 'react'
import { FaListAlt } from "react-icons/fa";
import { TbTicket, TbTicketOff, TbTrash } from "react-icons/tb";
import { BiCheck } from "react-icons/bi";
import { SlRefresh } from "react-icons/sl";
import { IoMdRefreshCircle } from "react-icons/io";
import { shortDate } from '../../utils/shortDate';

const TicketMenuForm = ({ opened, closed, removed, inProcess, viewTicket, action, changeAction }) => {

    const data = () => {
        if (action === "Abierto") {
            return opened
        } else if (action === "En Proceso") {
            return inProcess
        } else if (action === "Cerrado") {
            return closed
        } else if (action === "Eliminado") {
            return removed
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <>
            <div className='ticketmenu-container'>
                <div className="ticketmenu-title">
                    <span>
                        <i className="fa fa-listalt" />
                        <FaListAlt
                            size="2.2rem"
                            color="#79ADD4"
                            style={{ marginBottom: "0.5rem" }}
                        />
                    </span>
                    <p>
                        LISTA DE TICKETS
                    </p>
                </div>
                <div className="ticketmenu-subtitle">
                    {
                        action === "En Proceso" ? <p style={{ color: "#F9D923" }}>
                            {action?.toUpperCase()}
                        </p> : <p style={{ color: action === "Abierto" ? "#59CE8F" : (action === "Cerrado" ? "#47B5FF" : "#FF74B1") }}>
                            {action?.toUpperCase()}
                        </p>
                    }

                </div>

                <div className="ticketmenu-list-cont">
                    <div className="ticketmenu-list">
                        <span>
                            <i className="sl sl-refresh" />
                            <SlRefresh
                                size="1rem"
                                color="#F9D923"
                                style={{ marginBottom: "1rem", marginRight: "0.5rem" }}
                            />
                        </span>
                        <p onClick={() => changeAction("En Proceso")}>
                            <strong>Tickets en proceso =</strong> {inProcess?.length}
                            {action === "En Proceso" ? <> <i className="tb tb-ticket-off" />
                                <BiCheck
                                    size="1rem"
                                    color="#5FD068"
                                    style={{ marginBottom: "0.4rem", marginRight: "0.5rem" }}
                                /></> : null
                            }
                        </p>
                    </div>
                    <div className="ticketmenu-list">
                        <span>
                            <i className="tb tb-ticket" />
                            <TbTicket
                                size="1rem"
                                color="#59CE8F"
                                style={{ marginBottom: "1rem", marginRight: "0.5rem" }}
                            />
                        </span>
                        <p onClick={() => changeAction("Abierto")}>
                            <strong>Tickets abiertos =</strong> {opened?.length}
                            {action === "Abierto" ? <> <i className="tb tb-ticket-off" />
                                <BiCheck
                                    size="1rem"
                                    color="#5FD068"
                                    style={{ marginBottom: "0.4rem", marginRight: "0.5rem" }}
                                /></> : null
                            }
                        </p>
                    </div>
                    <div className="ticketmenu-list">
                        <span>
                            <i className="tb tb-ticket-off" />
                            <TbTicketOff
                                size="1rem"
                                color="#47B5FF"
                                style={{ marginBottom: "1rem", marginRight: "0.5rem" }}
                            />
                        </span>
                        <p onClick={() => changeAction("Cerrado")}>
                            <strong>Tickets cerrados =</strong> {closed?.length}
                            {action === "Cerrado" ? <> <i className="tb tb-ticket-off" />
                                <BiCheck
                                    size="1rem"
                                    color="#5FD068"
                                    style={{ marginBottom: "0.4rem", marginRight: "0.5rem" }}
                                /></> : null
                            }
                        </p>
                    </div>
                    <div className="ticketmenu-list">
                        <span>
                            <i className="tb tb-trash" />
                            <TbTrash
                                size="1rem"
                                color="#FF74B1"
                                style={{ marginBottom: "1rem", marginRight: "0.5rem" }}
                            />
                        </span>
                        <p onClick={() => changeAction("Eliminado")}>
                            <strong>Basura =</strong> {removed?.length}
                            {action === "Eliminado" ? <> <i className="tb tb-ticket-off" />
                                <BiCheck
                                    size="1rem"
                                    color="#5FD068"
                                    style={{ marginBottom: "0.4rem", marginRight: "0.5rem" }}
                                /></> : null
                            }
                        </p>
                    </div>
                    <div className='ticket-btn-refresh'>
                        <p onClick={refreshPage}>
                            ACTUALIZAR
                            <i className="tb tb-trash" />
                            <IoMdRefreshCircle
                                size="1.5rem"
                                color="#019267"
                                style={{ marginBottom: "0.4rem", marginLeft: "0.3rem" }}
                            />
                        </p>
                    </div >
                    <div className="ticket-datagrid-cont">
                        <div className="ticket-datagrid-grid">
                            {/* ID */}
                            <div className="ticket-datagrid-grid-section-header">
                                <div className="ticket-datagrid-grid-header">
                                    ID
                                </div>
                            </div>
                            {/* TEMA */}
                            <div className="ticket-datagrid-grid-section-header">
                                <div className="ticket-datagrid-grid-header">
                                    TEMA
                                </div>
                            </div>
                            {/* ESTADO */}
                            <div className="ticket-datagrid-grid-section-header">
                                <div className="ticket-datagrid-grid-header">
                                    ESTADO
                                </div>
                            </div>
                            {/* PRIORIDAD */}
                            <div className="ticket-datagrid-grid-section-header">
                                <div className="ticket-datagrid-grid-header">
                                    PRIORIDAD
                                </div>
                            </div>
                            {/* CATEGORIA */}
                            <div className="ticket-datagrid-grid-section-header">
                                <div className="ticket-datagrid-grid-header">
                                    CATEGORIA
                                </div>
                            </div>
                            {/* ASIGNADO */}
                            <div className="ticket-datagrid-grid-section-header">
                                <div className="ticket-datagrid-grid-header">
                                    ASIGNADO
                                </div>
                            </div>
                            {/* CREADO EN */}
                            <div className="ticket-datagrid-grid-section-header">
                                <div className="ticket-datagrid-grid-header">
                                    CREADO EN
                                </div>
                            </div>
                            {/* CREADO POR */}
                            <div className="ticket-datagrid-grid-section-header">
                                <div className="ticket-datagrid-grid-header">
                                    CREADO POR
                                </div>
                            </div>
                        </div>
                        {
                            data()?.map((item, key) => {
                                return (
                                    <>
                                        <div onClick={() => viewTicket(item)} className="ticket-datagrid-grid">
                                            {/* ID */}
                                            <div className="ticket-datagrid-grid-section-data">
                                                <div key={key} className="ticket-datagrid-grid-data">
                                                    {item.ticketId}
                                                </div>
                                            </div>
                                            {/* TEMA */}
                                            <div className="ticket-datagrid-grid-section-data">
                                                <div key={key} className="ticket-datagrid-grid-data">
                                                    {item.issueName}
                                                </div>
                                            </div>
                                            {/* ESTADO */}
                                            <div className="ticket-datagrid-grid-section-data">
                                                <div key={key} className="ticket-datagrid-grid-data">
                                                    {item.status}
                                                </div>
                                            </div>
                                            {/* PRIORIDAD */}
                                            <div className="ticket-datagrid-grid-section-data">
                                                <div key={key} style={{ color: item.priority === "Normal" ? "#34B3F1" : (item.priority === "Urgente" ? "#FBB454" : "red") }} className="ticket-datagrid-grid-data">
                                                    {item.priority}
                                                </div>
                                            </div>
                                            {/* CATEGORIA */}
                                            <div className="ticket-datagrid-grid-section-data">
                                                <div key={key} className="ticket-datagrid-grid-data">
                                                    {item.category}
                                                </div>
                                            </div>
                                            {/* ASIGNADO */}
                                            <div className="ticket-datagrid-grid-section-data">
                                                <div key={key} className="ticket-datagrid-grid-data">
                                                    {item.assigned}
                                                </div>
                                            </div>
                                            {/* CREADO */}
                                            <div className="ticket-datagrid-grid-section-data">
                                                <div key={key} className="ticket-datagrid-grid-data">
                                                    {shortDate(item.createdAt)}
                                                </div>
                                            </div>
                                            {/* CREADO POR */}
                                            <div className="ticket-datagrid-grid-section-data">
                                                <div key={key} className="ticket-datagrid-grid-data">
                                                    {item.createdBy}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>

            </div>
        </>
    )
}

export default TicketMenuForm