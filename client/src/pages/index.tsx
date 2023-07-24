import Login from "../../components/Login";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import HomePage from "../../components/HomePage";
import { User } from "../../components/HomePage";
import io from "socket.io-client";
import { Socket } from "socket.io-client";

const socket = io("http://192.168.8.106:5555");
export const userContext = createContext<User | null>(null);
export const socketContext = createContext<Socket | null>(null);
export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loggedId, setLoggedIn] = useState(false);

  useEffect(() => {
    axios
      .get("http://192.168.8.106:5555/user/profile", { withCredentials: true })
      .then((res) => {
        setLoggedIn(true);
        socket.emit("newUser", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        socket.disconnect();
        console.log(err);
      });
  }, []);

  return (
    <userContext.Provider value={user}>
      <socketContext.Provider value={socket}>
        <div className="w-full h-full flex justify-center items-center">
          {!loggedId ? <Login setLoggedIn={setLoggedIn} /> : <HomePage />}
        </div>
      </socketContext.Provider>
    </userContext.Provider>
  );
}
