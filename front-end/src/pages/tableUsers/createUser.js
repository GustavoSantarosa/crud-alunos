import React, { useState, useEffect, useContext } from "react";
import {
  Input,
  IconButton,
  InputLabel,
  FormControl,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import isEmail from "../../utils/isEmail";
import { notify } from "../../utils/notify";
import MaskService from "../../utils/mask/maskService";
import ModalLoading from "../../components/modalLoading/modalLoading";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import validatesNotNull from "../../utils/validatesNotNull";
import validationPasswordCognito from "../../utils/validationPasswordCognito";
import "./.user.css";
import UserContext from "../../context/user";

const CreateUser = () => {
  const [user] = useContext(UserContext);
  const { goBack } = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [telephone, setTelephone] = useState("");
  const [promoter, setPromoter] = useState("");
  const [typeUser, setTypeUser] = useState(0);
  const [profile, setProfile] = useState(0);
  const [active, setActive] = useState(true);
  const [optionsPromoters, setOptionsPromoters] = useState([
    { CNPJ: "", Fantasia: "" },
  ]);
  const [optionsTypeUsers, setOptionsTypeUsers] = useState([
    { Id: 0, Nome: "" },
  ]);
  const [optionsProfiles, setOptionsProfiles] = useState([
    { Id: 0, Descricao: "" },
  ]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(
          `usuario/dadosParaCriarUsuario/${user.IdTipoUsuario}`
        );
        data.promoters.unshift({ CNPJ: "", Fantasia: "" });
        data.typeUsers.unshift({ Id: 0, Nome: "" });
        data.profiles.unshift({ Id: 0, Descricao: "" });

        setOptionsPromoters(data.promoters);
        setOptionsTypeUsers(data.typeUsers);
        setOptionsProfiles(data.profiles);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getData();
  }, [user.IdTipoUsuario]);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      let validationFail = false;
      let passValidation = validationPasswordCognito(password);

      const resultValidation = validatesNotNull([
        { value: name, key: "name" },
        { value: email, key: "email" },
        { value: telephone, key: "telephone" },
        { value: promoter, key: "promoter" },
        { value: typeUser, key: "typeUser" },
        { value: profile, key: "profile" },
        { value: password, key: "password" },
      ]);

      if (email && !isEmail(email)) {
        validationFail = true;
        resultValidation.errorsValidation.email = true;
        notify("O e-mail informado é inválido.", true, "error");
      }

      if (telephone && !MaskService.isValid("cel-phone", telephone)) {
        validationFail = true;
        resultValidation.errorsValidation.telephone = true;
        notify("O telefone informado é inválido.", true, "error");
      }

      if (
        !passValidation.uperCase ||
        !passValidation.lowerCase ||
        !passValidation.number ||
        password.length < 8
      ) {
        validationFail = true;
        resultValidation.errorsValidation.password = true;
        notify(
          "A senha deve ter letras maiúsculas, minúsculas, números e no minimo 8 caracteres."
        );
      }

      if (resultValidation.error || validationFail) {
        setErrors(resultValidation.errorsValidation);
        return setLoading(false);
      } else {
        setErrors({});
      }

      const telRemoveMask = telephone;

      const { data } = await api.post("usuario", {
        Nome: name,
        Email: email,
        Senha: password,
        Telefone: telRemoveMask.replace(/[^0-9]+/g, ""),
        PromotorCNPJ: promoter,
        IdTipoUsuario: typeUser,
        IdPerfilAcesso: profile,
        FlagAtivo: active ? "S" : "N",
      });

      setLoading(false);

      if (data) {
        if (!data.warnings) notify("Usuário criado com sucesso.", true, "info");
        goBack();
      }
    } catch (error) {
      return setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <ModalLoading loading={loading} />}

      <div className="containerFormUser">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <ArrowBackIcon className="iconGoBack" onClick={goBack} />

            <label className="title">Novo usuário</label>

            <FormControl className="formControl" id="controlUser">
              <InputLabel>Nome*</InputLabel>
              <Input
                autoFocus
                type="text"
                value={name}
                error={errors.name}
                onChange={e => setName(e.target.value)}
              />
            </FormControl>

            <FormControl className="formControl" id="controlUser">
              <InputLabel>E-mail*</InputLabel>
              <Input
                type="text"
                value={email}
                error={errors.email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl className="formControl" id="controlUser">
              <InputLabel>Senha*</InputLabel>
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

            <FormControl className="formControl" id="controlUser">
              <InputLabel>Telefone*</InputLabel>
              <Input
                type="text"
                value={telephone}
                error={errors.telephone}
                onChange={e =>
                  setTelephone(
                    MaskService.toMask("cel-phone", e.target.value).toString()
                  )
                }
              />
            </FormControl>

            <div className="containerLists">
              <div className="textList">
                <TextField
                  select
                  label="Promotor*"
                  value={promoter}
                  error={errors.promoter}
                  onChange={e => setPromoter(e.target.value)}
                  helperText="Selecione o promotor"
                >
                  {optionsPromoters.map(option => (
                    <MenuItem key={option.CNPJ} value={option.CNPJ}>
                      {option.Fantasia}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="textList">
                <TextField
                  id="textList"
                  select
                  label="Tipo de usuário*"
                  value={typeUser}
                  error={errors.typeUser}
                  onChange={e => setTypeUser(e.target.value)}
                  helperText="Selecione o tipo de usuário"
                >
                  {optionsTypeUsers.map(option => (
                    <MenuItem key={option.Id} value={option.Id}>
                      {option.Nome}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

              <div className="textList">
                <TextField
                  select
                  id="textList"
                  label="Perfil*"
                  value={profile}
                  error={errors.profile}
                  onChange={e => setProfile(e.target.value)}
                  helperText="Selecione o Perfil"
                >
                  {optionsProfiles.map(option => (
                    <MenuItem key={option.Id} value={option.Id}>
                      {option.Descricao}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>

            <FormControlLabel
              className="containerCheckbox"
              control={
                <Checkbox
                  checked={active}
                  onChange={() => setActive(!active)}
                  name="checkedB"
                  className="checkboxColor"
                />
              }
              label="Usuário Ativo"
            />
            <button
              id="buttonStyle"
              type="submit"
              className="btn btn-info btn-block"
            >
              Inserir
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default CreateUser;
