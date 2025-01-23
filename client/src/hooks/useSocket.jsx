import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const backendURL = 
  process.env.NODE_ENV === "development"
    ?"http://localhost:3000"
    : "https://greyline.onrender.com"
     ;

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
