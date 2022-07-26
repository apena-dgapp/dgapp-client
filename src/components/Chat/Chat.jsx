import { useState, useEffect, useContext } from "react";
import ChatForm from "./ChatForm";
import GlobalContext from "../../context/GlobalContext";
import { getAllPersons } from "../../api/person";
import socket from "../../utils/socket";

const Chat = () => {
  const [contextState, , contextMiddleware] = useContext(GlobalContext);
  const [arrayAllPersons, setArrayAllPersons] = useState();
  const [room, setRoom] = useState("");
  const [userHeader, setUserHeader] = useState({
    id: "",
    name: "",
    photo: "",
  });

  const getRoom = (hostId) => {
    socket.emit("join_room", room);
    setUserHeader({
      id: hostId.id,
      name: hostId.name,
      photo: hostId.photo,
    });
    if (contextState.personId >= hostId.id) {
      return setRoom(contextState.personId + "-" + hostId.id);
    } else {
      return setRoom(hostId.id + "-" + contextState.personId);
    }
  };
  console.log(room);

  // useEffect(() => {
  //   if (room) {
  //     socket.emit("join_room", room);
  //   }
  // }, [room]);

  useEffect(() => {
    let unmounted = false;

    // if (!unmounted) {
    //   socket.emit("users");
    //   socket.on("getclients", (data) => {
    //     if (data.length === 0) {
    //       console.log("arreglo vacio");
    //       socket.emit("storeClientInfo", { customId: contextState.personId });
    //       socket.emit("users");

    //       socket.on("getclients", (data) => {
    //         // contextMiddleware.setClients(data);
    //         console.log(data);
    //       });
    //     } else {
    //       console.log("arreglo lleno");
    //       socket.emit("users");

    //       socket.on("getclients", (data) => {
    //         // contextMiddleware.setClients(data);
    //         console.log(data);
    //       });
    //     }
    //   });
    // }

    // if (!unmounted) {
    //   console.log("entro");
    //   socket.on("connect", function () {
    //     if(!socket.connected) ? setIsConnected(true) : setIsConnected(false);
    //   });

    //   console.log(isConnected);
    // }

    // socket.emit("storeClientInfo", { customId: contextState.personId });
    // socket.emit("users");

    // socket.on("getclients", (data) => {
    //   contextMiddleware.setClients(data);
    //   console.log(data);
    // });

    // if (!unmounted) {
    //   const found = contextState.clients?.some(
    //     (el) => el.customId === contextState.personId
    //   );
    //   if (!found) {
    //     console.log("no existe");
    //     socket.emit("storeClientInfo", { customId: contextState.personId });
    //     socket.emit("users");

    //     socket.on("getclients", (data) => {
    //       contextMiddleware.setClients(data);
    //       console.log(data);
    //     });
    //   } else {
    //     console.log("existe");
    //   }
    // }

    getAllPersons()
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!unmounted) {
          setArrayAllPersons(res);
        }
      })
      .catch((err) => {
        console.error(err.status);
      });

    return () => {
      unmounted = true;
    };
  }, [contextState.personId]);

  return (
    <>
      <ChatForm
        socket={socket}
        username={contextState.userName}
        room={room}
        persons={arrayAllPersons}
        getRoom={getRoom}
        userHeader={userHeader}
      />
    </>
  );
};

export default Chat;
