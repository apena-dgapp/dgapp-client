import React, { useContext } from "react";
import { AiOutlineMessage, AiFillBell } from "react-icons/ai";
import GlobalContext from "../../../context/GlobalContext";

const ChatButton = () => {
  const [, , contextMiddleware] = useContext(GlobalContext);
  return (
    <>
      <div
        onClick={() => contextMiddleware.setIsShowChat(true)}
        className="chatbutton-container"
      >
        <div>
          <i className="bi bi-outline-message" />
          <AiOutlineMessage size="2.6rem" color="white" />
        </div>
        <div>
          <i className="bi bi-fillbell" />
          <AiFillBell
            style={{ marginTop: "-4rem", marginRight: "-1.2rem" }}
            size="1.3rem"
            color="red"
          />
        </div>
      </div>
    </>
  );
};

export default ChatButton;
