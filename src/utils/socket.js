// import io from "socket.io-client";

// const socket = io.connect(process.env.REACT_APP_RUTE_SOCKET);

// export default socket;

// const sendFormRRHH = () => {
//     if (formData.deliveryDate === "") {
//         return toast.error("Por favor seleccionar la fecha de entrega del carnet");
//     } else if (formData.generalRemarks === "") {
//         return toast.error("Por favor de escribir las observaciones generales");
//     }

//     revisionRRHHCarnet(
//         request.carnetId,
//         formData.generalRemarks,
//         profile.fullName,
//         `${formData.dayStart}-${formData.monthStart}-${formData.yearStart}`
//     )
//         .then((res) => {
//             if (res.status !== 200) {
//                 return toast.error("Error al intentar enviar la solicitud");
//             } else {
//                 return res.json();
//             }
//         })
//         .then((data) => {
//             sendEmail([request.email, "RESTRELLA@DGAPP.GOB.DO"], `Solicitud de entrega de carnet - ${request.name}-${request.requirementDate}`, `
//         Saludos ${request.name},

//         La solicitud realizada por el empleado ${request.name}, el dia ${request.requirementDate}, se han hechos las observaciones y evaluaciones correspondientes.

//         Por favor de verificar el documento para su finalización.

//         Click aquí para finalizar el proceso de solicitud: ${process.env.REACT_APP_RUTE}/servicios/recursoshumanos/solicitudes/licencias/${request.licenseId}`)
//                 .then((res) => {
//                     if (res.status !== 200) {
//                         return toast.error("Error al intentar enviar la solicitud");
//                     } else {
//                         toast.success("La solicitud se envío exitosamente!");
//                         requestMenu();
//                     }
//                 })
//         })
//         .catch((err) => {
//             console.error(err.status);
//             toast.error("Error al intentar enviar el formulario");
//         });
// }