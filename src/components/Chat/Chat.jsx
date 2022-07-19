import { useState, useEffect, useContext } from "react";
import ChatForm from "./ChatForm";
import io from "socket.io-client";
import GlobalContext from "../../context/GlobalContext";
import { getAllPersons } from "../../api/person";

const socket = io.connect(process.env.REACT_APP_RUTE_SOCKET); //The url where the socket.io is running

const Chat = () => {
  //   const [username, setUsername] = useState("");
  //   const [room, setRoom] = useState("");
  //   const [showChat, setShowChat] = useState(false);
  const [contextState, , contextMiddleware] = useContext(GlobalContext);
  const [arrayAllPersons, setArrayAllPersons] = useState();

  //   const profileChat = state.location.state;

  const getRoom = (hostId) => {
    if (contextState.personId >= hostId) {
      socket.emit("join_room", contextState.personId + "-" + hostId);
    } else {
      socket.emit("join_room", hostId + "-" + contextState.personId);
    }

    // if (contextState.personId >= hostId) {
    //   contextMiddleware.setRoom(contextState.personId + "-" + hostId);
    // } else {
    //   contextMiddleware.setRoom(hostId + "-" + contextState.personId);
    // }
  };

  //   const createRoom = (getRoom) => {
  //     socket.emit("join_room", getRoom);
  //   };

  //   console.log(io.sockets.adapter.rooms.get(roomName).size);

  useEffect(() => {
    let unmounted = false;

    socket.on("active-room", (roomData) => {
      console.log(roomData);
    });

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
  }, [contextState.room]);

  return (
    <>
      <ChatForm
        socket={socket}
        username={contextState.userName}
        room={contextState.room}
        persons={arrayAllPersons}
        getRoom={getRoom}
      />
    </>
  );
};

export default Chat;
