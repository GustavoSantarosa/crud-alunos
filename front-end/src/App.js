import React, { useState } from "react";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import UserContext from "./context/user";
import IdleTimer from "react-idle-timer";
import api from "./services/api";
import "./styles/global.css";

const App = () => {
  const [user, setUser] = useState(sessionStorage);

  api.setToken();

  const handleOnIdle = () => {
    const routeCurrent = window.location.href.split("/");

    if (routeCurrent[routeCurrent.length - 1] !== "login") {
      window.location.assign(`${process.env.REACT_APP_WEB_PLUG}expiredToken`);
    }
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
      <IdleTimer
        timeout={1000 * 60 * 10}
        onIdle={handleOnIdle}
        debounce={100}
      />
      <Routes />
      <ToastContainer />
    </UserContext.Provider>
  );
};

export default App;
