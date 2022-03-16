import { createContext, useState } from "react";
import { Socket } from "socket.io-client";

type SocketResult = Socket | null;

const SocketContext = createContext<any>(null);

const SocketProvider = () => {
  const [mySocket, setMySocket] = useState<SocketResult>(null);
  return (
    <SocketContext.Provider
      value={{ mySocket, setMySocket }}
    ></SocketContext.Provider>
  );
};

export default SocketProvider;
