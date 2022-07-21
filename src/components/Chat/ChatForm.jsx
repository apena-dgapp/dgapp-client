import React, { useContext } from "react";
import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { MdOutlineArrowForwardIos, MdSearch, MdCircle } from "react-icons/md";
import { BiHide } from "react-icons/bi";
import GlobalContext from "../../context/GlobalContext";
import Images from "../../common/images";

function ChatForm({ socket, username, room, persons, getRoom, userHeader }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [contextState, , contextMiddleware] = useContext(GlobalContext);
  const [showHist, setShowHist] = useState(false);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  function handleTyping() {
    if (currentMessage !== "") {
      socket.emit("typing", { username, room });
    } else {
      socket.emit("notTyping", { username, room });
    }
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    socket.on("user-isTyping", ({ username, room }) => {
      console.log(`the user ${username} in the room: ${room} is typing`);
    });

    socket.on("user-isNotTyping", ({ username, room }) => {
      console.log(
        `the user ${username} in the room: ${room} is not typing anymore`
      );
    });

    return () => {
      socket.off();
    };
  }, [socket]);

  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <i className="bi bi-hide" />
          <BiHide
            size="1.5rem"
            color="white"
            style={{ marginLeft: "0.2rem" }}
            onClick={() => contextMiddleware.setIsShowChat(false)}
          />
          <div className="chat-hist-hearder-img-name">
            {userHeader.id ? (
              <img
                className="chat-hist-header-img"
                src={userHeader.photo ? userHeader.photo : Images.noImg}
                alt=""
              />
            ) : null}

            <div className="chat-hist-header-name">
              <p>{userHeader.name}</p>
            </div>
          </div>

          {!showHist ? (
            <>
              <i className="md md-outline-arrow-forward-ios" />
              <MdOutlineArrowForwardIos
                size="1.5rem"
                color="white"
                onClick={() => setShowHist((showHist) => !showHist)}
              />
            </>
          ) : (
            <>
              <i className="md md-outline-arrow-forward-ios" />
              <MdOutlineArrowForwardIos
                size="1.5rem"
                color="white"
                style={{ transform: "rotate(180deg)" }}
                onClick={() => setShowHist((showHist) => !showHist)}
              />
            </>
          )}
        </div>
        <ScrollToBottom className="message-container">
          <div className="chat-body">
            {messageList.map((messageContent, index) => {
              return (
                <div
                  key={index}
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
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
      <div
        style={{ display: !showHist ? "none" : "flex" }}
        className="chat-historical"
      >
        <div className="chat-hist-input-cont">
          <input placeholder="Buscar persona..." className="chat-hist-input" />
        </div>
        {/* <div className="chat-hist-input-icon">
          <i className="md md-search" />
          <MdSearch
            size="1rem"
            color="red"
            style={{
              marginLeft: "18rem",
              marginTop: "-2.5rem",
              // position: "absolute",
            }}
          />
        </div> */}

        {persons?.map((person) => {
          return person.isActive &&
            person.personId !== contextState.personId ? (
            <div
              id={person.personId}
              key={person.personId}
              className="chat-hist-container"
              onClick={() =>
                getRoom({
                  id: person.personId,
                  name:
                    person.firstName.split(" ")[0] +
                    " " +
                    person.lastName.split(" ")[0],
                  photo: person.photo,
                })
              }
            >
              <div className="chat-hist-img-cont">
                <img
                  className="chat-hist-img"
                  src={person.photo ? person.photo : Images.noImg}
                  alt=""
                />
                <div className="d-flex">
                  {/* <p style={{ fontWeight: "bold", color: "green" }}>Activo</p> */}
                  <i className="md md-phone-in-talk" />
                  <MdCircle
                    style={{
                      marginLeft: "-0.6rem",
                      marginTop: "1.1rem",
                      border: "2px solid white",
                      borderRadius: "50%",
                    }}
                    size="0.8rem"
                    color="green"
                  />
                </div>
                <div className="chat-hist-name">
                  <p>
                    {person.firstName.split(" ")[0] +
                      " " +
                      person.lastName.split(" ")[0]}
                  </p>
                </div>
              </div>

              <div className="chat-hist-msg">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500
              </div>
            </div>
          ) : null;
        })}
      </div>
    </>
  );
}

export default ChatForm;
