import React, { useState } from "react";
import { Input, InputLabel, FormControl } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import { notify } from "../../utils/notify";
import ModalLoading from "../../components/modalLoading/modalLoading";
import validatesNotNull from "../../utils/validatesNotNull";
import "./.alunos.css";

const CreateUser = () => {
  const { goBack } = useHistory();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setLoading(true);

      const resultValidation = validatesNotNull([
        { value: nome, key: "nome" },
        { value: genero, key: "genero" },
      ]);

      if (resultValidation.error) {
        setErrors(resultValidation.errorsValidation);
        return setLoading(false);
      }

      const result = await api.post("public/alunos/store", {
        Nome: nome,
      });

      setLoading(false);

      if (result) {
        notify("Alunos criado com sucesso!.", true, "info");
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

            <label className="title">Novo motivo de cancelamento</label>

            <FormControl className="formControl" id="controlUser">
              <InputLabel>Descrição*</InputLabel>
              <Input
                autoFocus
                type="text"
                value={description}
                error={errors.description}
                onChange={e => setDescription(e.target.value)}
              />
            </FormControl>

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
