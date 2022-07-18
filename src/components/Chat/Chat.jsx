import { useState, useEffect, useContext } from "react";
import ChatForm from "./ChatForm";
import io from "socket.io-client";
import GlobalContext from "../../context/GlobalContext";
import { getAllPersons } from "../../api/person";

const socket = io.connect("http://localhost:4500"); //The url where the socket.io is running

const Chat = () => {
  //   const [username, setUsername] = useState("");
  //   const [room, setRoom] = useState("");
  //   const [showChat, setShowChat] = useState(false);
  const [contextState] = useContext(GlobalContext);
  const [arrayAllPersons, setArrayAllPersons] = useState();

  //   const profileChat = state.location.state;

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
        room={contextState.personId}
        persons={arrayAllPersons}
      />
    </>
  );
};

export default Chat;
