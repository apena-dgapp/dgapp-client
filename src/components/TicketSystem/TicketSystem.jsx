import React, { useState, useEffect } from "react";
import TicketCreateForm from "./TicketCreateForm";
import TicketMenuForm from "./TicketMenuForm";
import TicketModal from "./TicketModal";
import { newTicket, getTickes, toAssign, remove, apiTicketUpdate } from "../../api/ticket";
import { getPersonIt } from "../../api/person";
import { sendEmail } from "../../api/email";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";

const TicketSystem = () => {
  const location = useLocation();
  const [priority, setPriority] = useState("");
  const [action, setAction] = useState("Abierto");
  const [personIt, setPersonIt] = useState([]);
  const [opened, setOpened] = useState([]);
  const [closed, setClosed] = useState([]);
  const [inProcess, setInProcess] = useState([]);
  const [removed, setRemoved] = useState([]);
  const [ticket, setTicket] = useState("");
  const [color, setColor] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [formData, setFormData] = useState({
    issueName: "",
    category: "",
    detail: "",
    assigned: "",
    priority: "",
  });

  const state = location.state;

  const options = [
    {
      id: "1",
      value: "Software",
    },
    {
      id: "2",
      value: "Hardware",
    },
    {
      id: "3",
      value: "Impresora",
    },
    {
      id: "4",
      value: "Red",
    },
    {
      id: "5",
      value: "Microfono",
    },
    {
      id: "6",
      value: "Proyector",
    },
    {
      id: "7",
      value: "Actualización e Instalación",
    },

  ];

  const optionsPriority = [
    {
      id: "1",
      value: "Normal",
    },
    {
      id: "2",
      value: "Urgente",
    },
    {
      id: "3",
      value: "Inmediata",
    }
  ];

  // const optionsAssigned = [
  //   {
  //     id: "1",
  //     value: "Angel Peña",
  //   },
  //   {
  //     id: "2",
  //     value: "Cesar Guerrero",
  //   },
  //   {
  //     id: "3",
  //     value: "Claudio Espinosa",
  //   }
  // ];

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

    getTickes("Abierto", "Departamento Tecnología")
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

    getTickes("Cerrado", "Departamento Tecnología")
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

    getTickes("Eliminado", "Departamento Tecnología")
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

  useEffect(() => {
    let unmounted = false;

    getTickes("En Proceso", "Departamento Tecnología")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setInProcess(res);
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

    getPersonIt()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setPersonIt(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  const undoPriority = () => {
    setColor("");
    setPriority("");
  }

  const changeAction = (e) => {
    setAction(e);
  }

  const addTicket = () => {

    if (formData.issueName === "") {
      return toast.error("Por favor de escribir el asunto");
    }
    if (formData.category === "") {
      return toast.error("Por favor elegir una categoria");
    }
    if (formData.detail === "") {
      return toast.error("Por favor Escribir un breve detalle del asunto o problema");
    }
    if (priority === "") {
      return toast.error("Por favor elegir la prioridad");
    }

    newTicket(state?.email, formData.issueName, "Departamento Tecnología", formData.category, formData.detail, priority, state?.fullName)
      .then((res) => {
        if (res.status !== 200) {
          return toast.error("Error al intentar crear el ticket!");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        sendEmail(state?.email.toLowerCase(), "", `Nuevo ticket - Ticket - ${data.ticketId}`, `
        - Ticket Abierto: ${data.ticketId}
        - Tema: ${formData.issueName}`)
          .then((res) => {
            if (res.status !== 200) {
              return toast.error("Error al intentar crear el ticket!");
            } else {
              toast.success("Ticket creado exitosamente!");
              setFormData({
                issueName: "",
                category: "",
                detail: "",
                assigned: "",
                priority: ""
              });
              setPriority("");
              setColor("");
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

  const viewTicket = (item) => {
    setTicket(item)
    setModalActive(true);
  }

  const assignTicket = (id, issueName, email, assigned, reassigned) => {
    toAssign(assigned, id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== 200) {
          return toast.error(`Error al intentar ${reassigned ? "reasignado" : "asignado"} el ticket!`);
        } else {
          sendEmail(email.toLowerCase(), "", `Ticket ${reassigned ? "reasignado" : "asignado"} - Ticket - ${id}`, `
          - Ticket en proceso: ${id}
          - Tema: ${issueName}  
          - ${reassigned ? "Reasignado" : "Asignado"} a: ${assigned}`)

          if (!reassigned) {
            setModalActive(!modalActive);
          }

          return toast.success(`El ticket se ${reassigned ? "reasignado" : "asignado"} exitosamente!`);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  const ticketUpdate = (id, action, value) => {
    apiTicketUpdate(id, action, value)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== 200) {
          return toast.error("Error al intentar actualizar el ticket!");
        } else {
          return toast.success("El ticket se actualizó exitosamente!");
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  const removeTicket = (id, action, issueName, email, assigned) => {
    remove(action, id)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res !== 200) {
          return action === "Cerrado" ? toast.error("Error al intentar cerrar el ticket!") : toast.error("Error al intentar eliminar el ticket!")
        } else {
          if (action === "Cerrado") {
            sendEmail(email.toLowerCase(), "", `Ticket cerrado - Ticket - ${id}`, `
          - Ticket cerrado: ${id}
          - Tema: ${issueName}
          - Asistió: ${assigned}`)
          }

          setModalActive(!modalActive);
          return action === "Cerrado" ? toast.success("El ticket se cerró exitosamente!") : toast.success("El ticket se elimino exitosamente!")
        }
      })
      .catch((err) => {
        console.error(err.status);
      });
  }

  return (
    state?.action === "crear" ? <TicketCreateForm
      priority={priority}
      setPriority={setPriority}
      color={color}
      setColor={setColor}
      undoPriority={undoPriority}
      handlerInputChange={handlerInputChange}
      formData={formData}
      addTicket={addTicket}
      options={options}
    /> :
      <>
        <TicketModal
          modalToggle={modalToggle}
          modalActive={modalActive}
          ticket={ticket}
          assignTicket={assignTicket}
          removeTicket={removeTicket}
          options={options}
          optionsPriority={optionsPriority}
          optionsAssigned={personIt}
          handlerInputChange={handlerInputChange}
          formData={formData}
          ticketUpdate={ticketUpdate}
          state={state}
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
          opened={opened}
          closed={closed}
          removed={removed}
          inProcess={inProcess}
          viewTicket={viewTicket}
          action={action}
          changeAction={changeAction}
        />
      </>)

};

export default TicketSystem;
