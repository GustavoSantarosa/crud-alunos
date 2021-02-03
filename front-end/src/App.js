import React, { useState } from "react";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import UserContext from "./context/user";
import api from "./services/api";
import "./styles/global.css";

const App = () => {
  const [user, setUser] = useState(sessionStorage);

  api.setToken();

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Routes />
      <ToastContainer />
    </UserContext.Provider>
  );
};

export default App;
