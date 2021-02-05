import React, { useState } from "react";
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
import ModalLoading from "../../components/modalLoading/modalLoading";
import "./.alunos.css";
import LogoutButton from "../../components/logoutButton/logoutButton";

const ModificarAlunos = ({ location }) => {
  const { goBack } = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setNome] = useState(location.state.row.name);
  const [email, setEmail] = useState(location.state.row.email);
  const [genero, setGenero] = useState(location.state.row.genero);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const result = await api.put(
        `/api/pessoas/v1/aluno/${location.state.row.id}`,
        {
          name: name,
          email: email,
          genero: genero,
        }
      );

      if (result) {
        notify("Aluno atualizado com sucesso.", true, "info");

        goBack();
      }
    } catch (error) {
      notify("Falha ao editar aluno.");
      return setLoading(false);
    }
  };

  return (
    <>
      <LogoutButton />
      <form onSubmit={handleSubmit}>
        {loading && <ModalLoading loading={loading} />}

        <div className="containerFormUser">
          <div className="wrapper fadeInDown">
            <div id="formContent">
              <ArrowBackIcon className="iconGoBack" onClick={goBack} />

              <label className="title">Editar Aluno</label>

              <FormControl className="formControl" id="controlUser">
                <InputLabel>Nome*</InputLabel>
                <Input
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormControl>

              <FormControl className="formControl" id="controlUser">
                <InputLabel>E-mail*</InputLabel>
                <Input
                  autoFocus
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <div className="textList">
                <TextField
                  select
                  label="Genero*"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  helperText="Selecione o genero"
                >
                  {["Masculino", "Feminino"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </div>

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
    </>
  );
};

export default ModificarAlunos;
