import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IconButton, Input, InputLabel, FormControl } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import api from "../services/api";
import notify from "../utils/notify";
import UserContext from "../context/user";
import ModalLoading from "../components/modalLoading/modalLoading";
import "./login.css";
import "../styles/global.css";

export default function Login() {
  const history = useHistory();
  const [, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(
      () => {
    setUser({ Nome: null, TelasAcesso: null, Token: null });
    sessionStorage.clear();
  }, [setUser]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      let validated = true;

      if (!email || email === "") {
        notify("Preencha o campo de e-mail.");
        validated = false;
      }

      if (!password || password === "") {
        notify("Preencha o campo de senha.");
        validated = false;
      }

      if (!validated) return;

      const { data } = await api.post("users/login", {
        Email: email,
        Senha: password
      });

      setLoading(false);

      if (data) {


        // api.setToken(data.Token);

        // history.push("/previewUser");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="backgroundContainer">
      {loading && <ModalLoading loading={loading} />}
      <img
        className="logoLogin"
        src="https://video-public.canva.com/VAEHFstA-U0/v/8885637e8d.gif"
        alt="rocket"
        draggable="false"
      />
      <div className="wrapperLogin fadeInDown">
        <div id="formContent">
          <div className="containerTitle">
            <img
              className="logoLoginDown"
              src="https://video-public.canva.com/VAEHFstA-U0/v/8885637e8d.gif"
              alt=""
              draggable="false"
            />
            <label className="title">Login</label>
          </div>
          <FormControl className="formControl">
            <InputLabel htmlFor="email">E-mail</InputLabel>
            <Input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl className="formControl" id="passwordLogin">
            <InputLabel htmlFor="password">Senha</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={e => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
            />
          </FormControl>

          <button
            id="buttonLogin"
            disabled={loading}
            type="button"
            className="btn btn-info btn-block"
            onClick={handleSubmit}
          >
            Entrar
          </button>

        </div>
      </div>
    </div>
  );
}
