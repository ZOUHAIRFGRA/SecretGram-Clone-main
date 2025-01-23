import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const backendURL = "https://greyline.onrender.com";
  // process.env.NODE_ENV === "production"
    // ?
    //  "https://greyline.onrender.com"
    // : "http://localhost:5000";

const socket = io(backendURL, {
  withCredentials: true,
});

const useSocket = () => {
  const userId = useSelector((state) => state.userReducer?.user?._id);

  const socketEmit = (action, payload, fn) => {
    socket.emit(action, payload, fn);
  };

  const socketListen = (action, fn) => {
    socket.on(action, fn);

    return () => {
      socket.off(action, fn);
    };
  };

  return { socketEmit, socketListen, userId, socket };
};

export default useSocket;
