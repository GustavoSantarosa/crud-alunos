import React, { useState, useEffect, useContext } from "react";
import {
  Input,
  InputLabel,
  FormControl,
  TextField,
  MenuItem,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { notify } from "../../utils/notify";
import MaskService from "../../utils/mask/maskService";
import ModalLoading from "../../components/modalLoading/modalLoading";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import validatesNotNull from "../../utils/validatesNotNull";
import "./.user.css";
import UserContext from "../../context/user";

const UpdateUser = ({ location }) => {
  const [user, setUser] = useContext(UserContext);
  const { goBack } = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(location.state.row.Nome);
  const [telephone, setTelephone] = useState(location.state.row.Telefone);
  const [promoter, setPromoter] = useState("");
  const [typeUser, setTypeUser] = useState(0);
  const [profile, setProfile] = useState(0);
  const [active, setActive] = useState(location.state.row.FlagAtivo === "S");
  const [optionsPromoters, setOptionsPromoters] = useState([
    { Id: 0, CNPJ: "", Fantasia: "" },
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
      setLoading(true);
      try {
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

  useEffect(() => {
    if (
      optionsProfiles.find(op => op.Id === location.state.row.IdPerfilAcesso)
    ) {
      setPromoter(location.state.row.PromotorCNPJ);
      setTypeUser(location.state.row.IdTipoUsuario);
      setProfile(location.state.row.IdPerfilAcesso);
    }
  }, [location.state.row, optionsProfiles, optionsPromoters, optionsTypeUsers]);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      let validationFail = false;

      const resultValidation = validatesNotNull([
        { value: name, key: "name" },

        { value: telephone, key: "telephone" },
        { value: promoter, key: "promoter" },
        { value: typeUser, key: "typeUser" },
        { value: profile, key: "profile" },
      ]);

      if (telephone && !MaskService.isValid("cel-phone", telephone)) {
        validationFail = true;
        resultValidation.errorsValidation.telephone = true;
        notify("O telefone informado é inválido.", true, "error");
      }

      if (resultValidation.error || validationFail) {
        setErrors(resultValidation.errorsValidation);
        return setLoading(false);
      } else {
        setErrors({});
      }

      const activeReference = location.state.row.FlagAtivo === "S";

      if (
        name === location.state.row.Nome &&
        telephone === location.state.row.Telefone &&
        promoter === location.state.row.PromotorCNPJ &&
        typeUser === location.state.row.IdTipoUsuario &&
        profile === location.state.row.IdPerfilAcesso &&
        activeReference === active
      ) {
        return goBack();
      }

      const telRemoveMask = telephone;

      const result = await api.put(`usuario/${location.state.row.Id}`, {
        Nome: name,
        Telefone: telRemoveMask.replace(/[^0-9]+/g, ""),
        PromotorCNPJ: promoter,
        IdTipoUsuario: typeUser,
        IdPerfilAcesso: profile,
        FlagAtivo: active ? "S" : "N",
      });

      if (result) {
        notify("Usuário atualizado com sucesso.", true, "info");

        if (location.state.row.Id === user.Id) {
          sessionStorage.setItem("Nome", name);
          sessionStorage.setItem("IdTipoUsuario", typeUser);
          sessionStorage.setItem("IdTipoPromotor", result.data.IdTipoPromotor);
          sessionStorage.setItem("PromotorCNPJ", promoter);

          setUser({
            Nome: name,
            Id: user.Id,
            accessRoutes: user.accessRoutes,
            IdTipoUsuario: typeUser,
            IdTipoPromotor: result.data.IdTipoPromotor,
            PromotorCNPJ: promoter,
          });
        }

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

            <label className="title">{location.state.row.Nome}</label>

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
              <InputLabel htmlFor="email">E-mail*</InputLabel>
              <Input disabled type="text" value={location.state.row.Email} />
            </FormControl>
            <FormControl className="formControl" id="controlUser">
              <InputLabel>Telefone*</InputLabel>
              <Input
                type="text"
                value={MaskService.toMask("cel-phone", telephone)}
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
                  disabled
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
              Editar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateUser;
