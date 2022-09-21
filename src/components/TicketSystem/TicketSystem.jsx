import React, { useState } from "react";
import TicketSystemForm from "./TicketSystemForm";

const TicketSystem = () => {
  const [priority, setPriority] = useState("");

  return <TicketSystemForm priority={priority} setPriority={setPriority} />;
};

export default TicketSystem;
