import React from 'react'
import { FaListAlt } from "react-icons/fa";
import { TbTicket, TbTicketOff, TbClock, TbTrash } from "react-icons/tb";

const TicketMenuForm = ({opened, closed, removed, modalToggle, viewTicket}) => {
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
                <p>
                    <strong>Tickets pendientes =</strong> {opened?.length}
                </p>     
            </div>
            {/* <div className="ticketmenu-list">
                <span>
                <i className="tb tb-clock" />
                <TbClock
                size="1rem"
                color="#FF884B"
                style={{ marginBottom:"1rem", marginRight:"0.5rem"}}
                />
                </span>
                <p>
                    <strong>Tickets pendientes antiguos =</strong> 5
                </p>     
            </div> */}
            <div className="ticketmenu-list">
                <span>
                <i className="tb tb-ticket-off" />
                <TbTicketOff
                size="1rem"
                color="#47B5FF"
                style={{ marginBottom:"1rem", marginRight:"0.5rem"}}
                />
                </span>
                <p>
                    <strong>Tickets resueltos =</strong> {closed?.length}
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
                <p>
                    <strong>Basura =</strong> {removed?.length}
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
                    opened?.map((item, key)=>{
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
                                            {item.createdAt}
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