import React from 'react'
import { FaListAlt } from "react-icons/fa";
import { TbTicket, TbTicketOff, TbClock, TbTrash } from "react-icons/tb";
import { BiCheck } from "react-icons/bi";
import { shortDate } from '../../utils/shortDate';

const TicketMenuForm = ({opened, closed, removed, viewTicket, action, changeAction}) => {

    const data =()=>{
        if(action==="Abierto"){
            return opened
        } else if(action==="Cerrado"){
            return closed
        } else if(action==="Eliminado"){
            return removed
        }
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
                    style={{ marginBottom:"0.5rem"}}
                    />
                </span>
                <p>
                    LISTA DE TICKETS
                </p>     
            </div>
            <div className="ticketmenu-subtitle">
                <p style={{color:action ==="Abierto" ?"#59CE8F":(action ==="Cerrado" ? "#47B5FF":"#FF74B1")}}>
                    {action?.toUpperCase()}
                </p>     
            </div>

          <div className="ticketmenu-list-cont">
            <div className="ticketmenu-list">
                <span>
                <i className="tb tb-ticket" />
                <TbTicket
                size="1rem"
                color="#59CE8F"
                style={{ marginBottom:"1rem", marginRight:"0.5rem"}}
                />
                </span>
                <p onClick={()=>changeAction("Abierto")}>
                    <strong>Tickets pendientes =</strong> {opened?.length}
                    { action === "Abierto" ? <> <i className="tb tb-ticket-off" />
                    <BiCheck
                    size="1rem"
                    color="#5FD068"
                    style={{ marginBottom:"0.4rem", marginRight:"0.5rem"}}
                    /></>:null  
                    }
                </p>     
            </div>
            <div className="ticketmenu-list">
                <span>
                <i className="tb tb-ticket-off" />
                <TbTicketOff
                size="1rem"
                color="#47B5FF"
                style={{ marginBottom:"1rem", marginRight:"0.5rem"}}
                />
                </span>
                <p onClick={()=>changeAction("Cerrado")}>
                    <strong>Tickets resueltos =</strong> {closed?.length}
                    { action === "Cerrado" ? <> <i className="tb tb-ticket-off" />
                    <BiCheck
                    size="1rem"
                    color="#5FD068"
                    style={{ marginBottom:"0.4rem", marginRight:"0.5rem"}}
                    /></>:null  
                    }
                </p>     
            </div>
            <div className="ticketmenu-list">
                <span>
                <i className="tb tb-trash"/>
                <TbTrash
                size="1rem"
                color="#FF74B1"
                style={{ marginBottom:"1rem", marginRight:"0.5rem"}}
                />
                </span>
                <p onClick={()=>changeAction("Eliminado")}>
                    <strong>Basura =</strong> {removed?.length}
                    { action === "Eliminado" ? <> <i className="tb tb-ticket-off" />
                    <BiCheck
                    size="1rem"
                    color="#5FD068"
                    style={{ marginBottom:"0.4rem", marginRight:"0.5rem"}}
                    /></>:null  
                    }
                </p>     
            </div>
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
                    data()?.map((item, key)=>{
                        return(
                            <>
                                <div onClick={()=>viewTicket(item)} className="ticket-datagrid-grid">
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
                                        <div key={key} style={{color: item.priority === "Normal" ? "#34B3F1":(item.priority === "Urgente" ?"#FBB454":"red")}} className="ticket-datagrid-grid-data">
                                            {item.priority}
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