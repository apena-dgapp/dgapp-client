import React, { useContext } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import GlobalContext from "../../../context/GlobalContext";

const ChatButton = () => {
  const [contextState, , contextMiddleware] = useContext(GlobalContext);
  const toggleShowChat = () =>
    contextMiddleware.setShowChat((showChat) => !showChat);
  return (
    <>
      <div onClick={toggleShowChat} className="chatbutton-container">
        <di>
          <i className="bi bi-outline-message" />
          <AiOutlineMessage
            size="2.6rem"
            color="white"
            // style={{ marginBottom: "1rem" }}
          />
        </di>
      </div>
    </>
  );
};

export default ChatButton;
