import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_RUTE_SOCKET);

export default socket;