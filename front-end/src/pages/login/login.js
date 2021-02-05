import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IconButton, Input, InputLabel, FormControl } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import api from "../../services/api";
import UserContext from "../../context/user";
import { notify } from "../../utils/notify";
import ModalLoading from "../../components/modalLoading/modalLoading";
import "./login.css";

const Login = () => {
  const history = useHistory();
  const [, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser({});
    sessionStorage.clear();
  }, [setUser]);

  const onFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const { data } = await api.post("api/public/login", {
        email: email,
        password: password,
      });

      console.log(data);

      if (!data) throw new Error();

      sessionStorage.setItem("Token", data.access_token);

      setUser({
        Token: data.access_token,
      });

      setLoading(false);
      history.push("/visualizarAlunos");
    } catch (error) {
      setLoading(false);
      notify("Email ou senha incorreto.");
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="containerLogin">
        {loading && <ModalLoading loading={loading} />}
        <div className="containerFormLogin">
          <div className="imageBackgroudContainer">
            <div className="rightContainer">
              <div className="containerLogo"></div>
              <FormControl className="formControl">
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <Input
                  required
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl className="formControl" id="passwordLogin">
                <InputLabel htmlFor="password">Senha</InputLabel>
                <Input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <IconButton
                      className="eyePasswordIcon"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  }
                />
              </FormControl>

              <button
                id="buttonLogin"
                disabled={loading}
                type="submit"
                className="btn btn-info btn-block"
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
