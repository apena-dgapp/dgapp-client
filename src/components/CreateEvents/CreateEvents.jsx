import React, { useState, useContext, useEffect } from "react";
import CreateEventsForm from "./CreateEventsForm";
import toast from "react-hot-toast";
import { newEvents, getEvents } from "../../api/events";
import GlobalContext from "../../context/GlobalContext";

const CreateEvents = () => {
  const [contextState] = useContext(GlobalContext);
  const [eventsArray, setEventsArray] = useState([]);
  const [eventsDB, setEventsDB] = useState([]);
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

  useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      getEvents()
        .then((res) => res.json())
        .then((res) => setEventsDB(res));
    }
    return () => {
      unmounted = true;
    };
  }, []);

  const addEvent = () => {
    if (formData.name === "") {
      return toast.error("Por favor de escribir el nombre del evento");
    }
    if (formData.room === "" || formData.room === "Seleccionar un salon") {
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

    if (formData.to) {
      if (formData.from > formData.to) {
        return toast.error("Formato entre fecha incorrecto!");
      }
    }

    if (formData.startTime >= formData.endingTime) {
      return toast.error("Formato entre horas incorrecto!");
    }

    if (eventsArray.length === 6) {
      return toast.error(
        "El maximo de eventos permitidos por seccion son 6, por favor de finalizar esta lista y luego seguir agregando eventos en una nueva."
      );
    }

    // console.log(formData);

    var x;
    var y;
    var eventName;

    const fistDate = new Date(
      formData.from + " " + formData.startTime
    ).getTime();

    const secondDate = new Date(
      formData.to ? formData.to : formData.from + " " + formData.endingTime
    ).getTime();

    eventsArray.map((item) => {
      const arrFirstDate = new Date(item.from + " " + item.startTime).getTime();
      const arrSecondDate = new Date(
        item.to ? item.to : item.from + " " + item.endingTime
      ).getTime();

      if (
        Math.min(fistDate, secondDate) <
          Math.max(arrFirstDate, arrSecondDate) &&
        Math.max(fistDate, secondDate) > Math.min(arrFirstDate, secondDate) &&
        formData.room === item.room
      ) {
        x = true;
      } else {
        x = false;
      }

      return x;
    });

    eventsDB?.map((item) => {
      const arrFirstDate = new Date(item.from + " " + item.startTime).getTime();
      const arrSecondDate = new Date(
        item.to ? item.to : item.from + " " + item.endingTime
      ).getTime();

      // console.log(arrFirstDate);
      // console.log(fistDate);

      if (
        Math.min(fistDate, secondDate) <
          Math.max(arrFirstDate, arrSecondDate) &&
        Math.max(fistDate, secondDate) > Math.min(arrFirstDate, secondDate) &&
        formData.room === item.room
      ) {
        y = true;
        eventName = item.name;
      } else {
        y = false;
        eventName = "";
      }

      return y;
    });

    if (x) {
      return toast.error(
        `Actualmente se encuentra un evento agregado a la lista que conincide con la fecha, hora y salon digitado.`
      );
    }
    if (y) {
      return toast.error(
        `Actualmente se encuentra un evento programdo que coincide con esta fecha, hora y salon. EVENTO: ${eventName}.`
      );
    }

    //   if (Math.min(x, y) <= Math.max(a, b) && Math.max(x, y) >= Math.min(a, b)) {
    //     // between
    // }

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
        contextState.userName
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
  // console.log(eventsArray);

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
