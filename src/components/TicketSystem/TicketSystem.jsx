import React, { useState, useEffect } from "react";
import TicketCreateForm from "./TicketCreateForm";
import TicketMenuForm from "./TicketMenuForm";
import TicketModal from "./TicketModal";
import { newTicket, getTickes, toAssign, remove } from "../../api/ticket";
import { sendEmail } from "../../api/email";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const TicketSystem = () => {
  const location = useLocation();
  const [priority, setPriority] = useState("");
  const [action, setAction] = useState("Abierto");
  const [opened, setOpened] = useState([]);
  const [closed, setClosed] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [ticket, setTicket] = useState("");
  const [color, setColor] = useState("");
  const [startDate, setStartDate] = useState(null);
 const [modalActive, setModalActive] = useState(false);
 const [formData, setFormData] = useState({
  issueName: "",
  departament: "",
  detail: "",
});

  const state = location.state;

  const options = [
    {
      id: "1",
      value: "Departamento Tecnología",
    },
    // {
    //   id: "2",
    //   value: "Servicios Generales",
    // },
  ];

  const handlerInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      if (priority === "") {
        setColor("#000000");
      } else if (priority === "Normal") {
        setColor("lightblue")
      } else if (priority === "Urgente") {
        setColor("yellow");
      } else if (priority === "Inmediata") {
        setColor("red");
      }
    }

    return () => {
      unmounted = true;
    };
  }, [priority]);

  useEffect(() => {
    let unmounted = false;

    getTickes("Abierto","Departamento Tecnología")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setOpened(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [modalActive]);

  useEffect(() => {
    let unmounted = false;

    getTickes("Cerrado","Departamento Tecnología")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setClosed(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [modalActive]);

  useEffect(() => {
    let unmounted = false;

    getTickes("Eliminado","Departamento Tecnología")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setRemoved(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [modalActive]);

  const undoPriority = () => {
    setColor("");
    setPriority("");
  }

  const changeAction = (e) => {
    setAction(e);
  }

  const addTicket = () =>{

    if (formData.issueName === "") {
      return toast.error("Por favor de escribir el asunto");
    }
    if (formData.departament === "") {
      return toast.error("Por favor elegir el nombre del departamento");
    }
    if (startDate === "") {
      return toast.error("Por favor elegir la fecha inicial del asunto o problema");
    }
    if (formData.detail === "") {
      return toast.error("Por favor Escribir un breve detalle del asunto o problema");
    }
    if (priority === "") {
      return toast.error("Por favor elegir la prioridad");
    }

    newTicket(state?.email, formData.issueName, formData.departament, startDate, formData.detail, priority, state?.fullName)
    .then((res) => {
      if(res.status !== 200 ){
        return toast.error("Error al intentar crear el ticket!");
      }else{
        return res.json();
      }
    })
    .then((data)=>{  
      sendEmail("cespinosa@dgapp.gob.do", state?.email.toLowerCase(),`Nuevo ticket - ticket-${data.ticketId}:`, formData.issueName)
        .then((res) => {
          if(res.status !== 200 ){
            return toast.error("Error al intentar crear el ticket!");
          }else{
            toast.success("Ticket creado exitosamente!");
            setFormData({
            issueName: "",
            departament: "",
            detail: ""
          });
            setPriority("");
            setColor("");
            setStartDate(null);
          }    
      })   
    })
    .catch((err) => {
      console.error(err.status);
      toast.error("Error al intentar crear el ticket!");
    });
  }

  const modalToggle = () => {
    setModalActive(!modalActive);
  };

  const viewTicket = (item) =>{
    setTicket(item)
    setModalActive(true);
  }

  const assignTicket = (id)=>{
    toAssign(state?.fullName,id)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if(res !== 200 ){
        return toast.error("Error al intentar asignar el ticket!");
      }else{
        setModalActive(!modalActive);
        return toast.success("El ticket se asigno exitosamente!");
      }
    })
    .catch((err) => {
      console.error(err.status);
    });
  }

  const removeTicket = (id)=>{
    remove("Eliminado",id)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if(res !== 200 ){
        return toast.error("Error al intentar eliminar el ticket!");
      }else{
        setModalActive(!modalActive);
        return toast.success("El ticket se eliminar exitosamente!");
      }
    })
    .catch((err) => {
      console.error(err.status);
    });
  }

  return (
   
    state?.action ==="crear" ? <TicketCreateForm 
      priority={priority} 
      setPriority={setPriority} 
      color={color}
      setColor={setColor}
      undoPriority={undoPriority}
      handlerInputChange={handlerInputChange}
      formData={formData}
      addTicket={addTicket}
      options={options}
      startDate={startDate}
      setStartDate={setStartDate}
    />:
    <>
      <TicketModal
        modalToggle={modalToggle}
        modalActive={modalActive}
        ticket={ticket}
        assignTicket={assignTicket}
        removeTicket={removeTicket}
      />
      <TicketMenuForm 
        priority={priority} 
        setPriority={setPriority} 
        color={color}
        setColor={setColor}
        undoPriority={undoPriority}
        handlerInputChange={handlerInputChange}
        formData={formData}
        addTicket={addTicket}
        options={options}
        startDate={startDate}
        setStartDate={setStartDate}
        opened={opened}
        closed={closed}
        removed={removed}
        viewTicket={viewTicket}
        action={action}
        changeAction={changeAction}
      />
    </>)
  
};

export default TicketSystem;
