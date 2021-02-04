import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IconButton, Input, InputLabel, FormControl } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import api from "../../services/api";
import UserContext from "../../context/user";
import isEmail from "../../utils/isEmail";
import { notify } from "../../utils/notify";
import ModalLoading from "../../components/modalLoading/modalLoading";
import { GlobalVariables } from "../../global";
import "./login.css";

const Login = () => {
  const history = useHistory();
  const [, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setUser({});
    sessionStorage.clear();
  }, [setUser]);

  const onFormSubmit = async e => {
    try {
      e.preventDefault();

      const errorsLogin = {};
      let isValidated = true;

      if (!isEmail(email)) {
        isValidated = false;
        errorsLogin.email = true;
        notify("Digite um e-mail válido.", true, "error");
      }

      if (!password || password === "") {
        isValidated = false;
        errorsLogin.password = true;
        notify("Digite a senha.", true, "error");
      }

      setErrors(errorsLogin);
      if (!isValidated) return;

      setLoading(true);

      const { data } = await api.post("usuario/autenticar", {
        email: email.toLowerCase(),
        password,
      });

      if (!data) throw new Error();

      data.password = password;
      data.email = email;

      if (data.codMessage === GlobalVariables.ACCESS_FIRST) {
        setLoading(false);
        return history.push("/changePasswordAccessFirst", data);
      }

      sessionStorage.setItem("Email", email);
      sessionStorage.setItem("token", data.authCognito.accessToken);
      sessionStorage.setItem("refreshToken", data.authCognito.refreshToken);
      sessionStorage.setItem("Nome", data.Nome);
      sessionStorage.setItem("IdTipoUsuario", data.IdTipoUsuario);
      sessionStorage.setItem("IdTipoPromotor", data.IdTipoPromotor);
      sessionStorage.setItem("PromotorCNPJ", data.PromotorCNPJ);
      sessionStorage.setItem("Id", data.Id);
      sessionStorage.setItem("accessRoutes", data.accessRoutes.join(","));

      setUser({
        Nome: data.Nome,
        Id: data.Id.toString(),
        accessRoutes: data.accessRoutes.join(","),
        IdTipoUsuario: data.IdTipoUsuario.toString(),
        IdTipoPromotor: data.IdTipoPromotor.toString(),
        PromotorCNPJ: data.PromotorCNPJ,
      });

      setLoading(false);
      history.push("/homePage");
    } catch (error) {
      setLoading(false);
      setErrors({ email: true, password: true });
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="containerLogin">
        {loading && <ModalLoading loading={loading} />}
        <div className="containerFormLogin">
          <div className="imageBackgroudContainer">
            <div className="rightContainer">
              <div className="containerLogo">
              </div>
              <FormControl className="formControl">
                <InputLabel htmlFor="email">E-mail</InputLabel>
                <Input
                  autoFocus
                  type="text"
                  value={email}
                  error={errors.email}
                  onChange={e => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl className="formControl" id="passwordLogin">
                <InputLabel htmlFor="password">Senha</InputLabel>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  error={errors.password}
                  onChange={e => setPassword(e.target.value)}
                  endAdornment={
                    <IconButton
                      className="eyePasswordIcon"
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
