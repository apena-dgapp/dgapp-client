import React, { useState, useEffect, useContext } from "react";
import TicketSystemForm from "./TicketSystemForm";
import { newTicket } from "../../api/ticket";
import toast from "react-hot-toast";
import GlobalContext from "../../context/GlobalContext";

const TicketSystem = () => {
  const [contextState] = useContext(GlobalContext);
  const [priority, setPriority] = useState("");
  const [color, setColor] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [formData, setFormData] = useState({
    issueName: "",
    departament: "",
    detail: "",
  });

  const options = [
    {
      id: "1",
      value: "Departamento Tecnología",
    },
    {
      id: "2",
      value: "Servicios Generales",
    },
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

  const undoPriority = () => {
    setColor("");
    setPriority("");
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

    newTicket(contextState.personId, formData.issueName, formData.departament, startDate, formData.detail, priority, contextState.userName)
    .then((res) => {
      if(res.status !== 200 ){
        toast.error("Error al intentar crear el ticket!");
      }else{
        toast.success("Ticket creado exitosamente!");
        setFormData("");
        setPriority("");
        setColor("");
        setStartDate(null)
      }    
    })
    .catch((err) => {
      console.error(err.status);
      toast.error("Error al intentar crear el ticket!");
    });
  }

  console.log(startDate)

  return (
    <TicketSystemForm 
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
    />)
  
};

export default TicketSystem;
