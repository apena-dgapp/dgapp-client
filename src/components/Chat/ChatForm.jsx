import React, { useContext } from "react";
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import GlobalContext from "../../context/GlobalContext";

function ChatForm({ socket, username, room, persons }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]); //Its contains all the message from a chat
  const [isTyping, setIsTyping] = useState(false);
  const [contextState, , contextMiddleware] = useContext(GlobalContext);
  const toggleShowChat = () =>
    contextMiddleware.setShowChat((showChat) => !showChat);

  console.log(contextState.showChat);

  const sendMessage = async () => {
    //Method that send the message
    if (currentMessage !== "") {
      //It confirm that the message is not empty
      const messageData = {
        // This object contains all the information that is gonna be send, like which room, etc.
        room: room, //Get the actual room
        author: username, //Get the person who's sends the message
        message: currentMessage, //Get the actual message
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(), //Get the actual time
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]); //its add your current message to the list

      setCurrentMessage("");
    }
  };

  function handleTyping() {
    if (currentMessage !== "") {
      socket.emit("typing", { username, room }); //It's alert when the user is typing
    } else {
      socket.emit("notTyping", { username, room });
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on("user-isTyping", ({ username, room }) => {
      //Determine if the other user is typing

      console.log(`the user ${username} in the room: ${room} is typing`);
    });

    socket.on("user-isNotTyping", ({ username, room }) => {
      //Determine if the other user isn't typing anymore

      console.log(
        `the user ${username} in the room: ${room} is not typing anymore`
      );
    });
  }, [socket]);

  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <p>
            <i onClick={toggleShowChat} className="bi bi-hide" />
            <BiHide
              size="1.5rem"
              color="white"
              style={{ marginRight: "12.5rem" }}
            />
            Historial
            <i className="md md-outline-arrow-forward-ios" />
            <MdOutlineArrowForwardIos
              size="1rem"
              color="white"
              //   style={{ marginRight: "3rem" }}
            />
          </p>
        </div>
        <ScrollToBottom className="message-container">
          <div className="chat-body">
            {messageList.map((messageContent, index) => {
              return (
                <div
                  key={index}
                  className="message"
                  id={username === messageContent.author ? "you" : "other"} //When the username is equal at the author in the array, its apply the corresponding css
                >
                  <div>
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                    <div className="message-meta">
                      <p id="time">{messageContent.time}</p>
                      <p id="author">{messageContent.author}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollToBottom>
        <div className="chat-footer">
          <input
            type="text"
            placeholder="Escriba su mensaje aqui!"
            className="chat-input"
            onChange={(e) => {
              setCurrentMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            value={currentMessage}
          />
          <button onClick={sendMessage}>&#9658;</button>
        </div>
      </div>
      <div className="chat-historical">
        {persons?.map((person) => {
          return (
            <div
              id={person.personId}
              key={person.personId}
              className="chat-hist-container"
            >
              <div className="chat-hist-img">
                <img className="chat-hist-img" src={person.photo} alt="" />
              </div>
              <div className="chat-hist-name">
                <p>{person.fullName.split(" ")[0]}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ChatForm;
