import React, { useState, useContext } from "react";
import CreateEventsForm from "./CreateEventsForm";
import toast from "react-hot-toast";
import { newEvents } from "../../api/events";
import GlobalContext from "../../context/GlobalContext";

const CreateEvents = () => {
  const [contextState] = useContext(GlobalContext);
  const [eventsArray, setEventsArray] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    room: "",
    from: "",
    to: "",
    startTime: "",
    endingTime: "",
    color: "",
  });

  const handlerInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addEvent = () => {
    if (formData.name === "") {
      return toast.error("Por favor de escribir el nombre del evento");
    }
    if (formData.room === "") {
      return toast.error("Por favor elegir el nombre del salon");
    }
    if (formData.from === "") {
      return toast.error("Por favor elegir la fecha inicial");
    }
    if (formData.startTime === "") {
      return toast.error("Por favor elegir la hora inicial");
    }
    if (formData.endingTime === "") {
      return toast.error("Por favor elegir la hora final");
    }

    if (eventsArray.length === 6) {
      return toast.error(
        "El maximo de eventos permitidos por seccion son 6, por favor de finalizar esta lista y luego seguir agregando eventos en una nueva."
      );
    }

    setEventsArray((eventsArray) => [...eventsArray, formData]);

    setFormData({
      name: "",
      description: "",
      room: "",
      from: "",
      to: "",
      startTime: "",
      endingTime: "",
      color: "",
    });
  };

  const sendEvent = () => {
    if (!eventsArray.length) {
      return toast.error(
        "Debes agregar por lo menos un evento antes de finalizar"
      );
    }

    eventsArray?.map((e) =>
      newEvents(
        e.name,
        e.description,
        e.room,
        e.color,
        e.from,
        e.to,
        e.startTime,
        e.endingTime,
        contextState.fullName
      )
    );
    setEventsArray([]);
    toast.success("Eventos enviados exitosamente!");
  };
  // const eventRemove = (e) => {
  //   var arr = eventsArray;
  //   if (e > -1) {
  //     arr.splice(e, 1);
  //     setEventsArray(arr);
  //   }
  // };

  const eventRemove = (indexItem) => {
    setEventsArray((prevState) =>
      prevState.filter((events, index) => index !== indexItem)
    );
  };
  console.log(eventsArray);

  return (
    <>
      <CreateEventsForm
        handlerInputChange={handlerInputChange}
        addEvent={addEvent}
        eventsArray={eventsArray}
        sendEvent={sendEvent}
        formData={formData}
        eventRemove={eventRemove}
      />
    </>
  );
};

export default CreateEvents;
