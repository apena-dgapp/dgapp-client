import { useState, useEffect, useContext } from "react";
import ChatForm from "./ChatForm";
import io from "socket.io-client";
import GlobalContext from "../../context/GlobalContext";
import { getAllPersons } from "../../api/person";

const socket = io.connect(process.env.REACT_APP_RUTE_SOCKET);

const Chat = () => {
  const [contextState] = useContext(GlobalContext);
  const [arrayAllPersons, setArrayAllPersons] = useState();
  const [room, setRoom] = useState("");
  const [userHeader, setUserHeader] = useState({
    id: "",
    name: "",
    photo: "",
  });

  const getRoom = (hostId) => {
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

  socket.emit("join_room", room);

  useEffect(() => {
    let unmounted = false;

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
  }, []);

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
