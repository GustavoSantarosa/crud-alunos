import React, { useState } from "react";
import {
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  TextField,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { notify } from "../../utils/notify";
import ModalLoading from "../../components/modalLoading/modalLoading";
import "./.alunos.css";
import LogoutButton from "../../components/logoutButton/logoutButton";

const CriarAlunos = () => {
  const { goBack } = useHistory();
  const [loading, setLoading] = useState(false);
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [genero, setGenero] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const { data } = await api.post("api/pessoas/v1/aluno", {
        name,
        email,
        genero,
      });

      setLoading(false);

      if (data) {
        notify(data.msg, true, "info");
        goBack();
      }
    } catch (error) {
      notify("Falha ao criar aluno.");
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

              <label className="title">Novo Aluno</label>

              <FormControl className="formControl" id="controlUser">
                <InputLabel>Nome*</InputLabel>
                <Input
                  required
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormControl>

              <FormControl className="formControl" id="controlUser">
                <InputLabel>E-mail*</InputLabel>
                <Input
                  required
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <div className="textList">
                <TextField
                  required
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
                Inserir
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default CriarAlunos;
