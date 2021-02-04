import axios from "axios";
import { notify } from "./../utils/notify";

const defaultErrorMessages = {
  503: "Não foi possível esabelecer uma conexão com o servidor. Verifique sua internet e tente novamente.",
};

axios.interceptors.response.use(
  response => {
    if (
      response.status === 200 &&
      response.data.warnings &&
      Array.isArray(response.data.warnings)
    ) {
      response.data.warnings.map(e => notify(e, true, "warning"));
    }

    return response;
  },
  error => {
    //Erro de conexão
    if (error.message && error.message === "Network Error") {
      notify(
        "Não foi possível esabelecer uma conexão com o servidor. Verifique sua internet e tente novamente."
      );
      return Promise.reject(error);
    }

    if (
      error.data &&
      error.data.warnings &&
      Array.isArray(error.data.warnings)
    ) {
      error.data.warnings.map(e => notify(e, true, "warning"));
    }

    if (
      error.response &&
      error.response.data &&
      Array.isArray(error.response.data.errors)
    ) {
      for (const msg of error.response.data.errors) {
        notify(msg, true);
      }
    }

    if (
      error.response &&
      error.response.data &&
      Array.isArray(error.response.data)
    ) {
      for (const msg of error.response.data) {
        notify(msg, true);
      }
    }

    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    //isCancel verifica se a requisição foi cancelada pelo usuário
    if (!expectedError && !axios.isCancel(error)) {
      console.log("Logging the error: " + error);
      console.log(error.response);

      if (
        error.response.data &&
        error.response.data.indexOf("File format not accepted") !== -1
      ) {
        notify(
          "Respeite os formatos permitidos para o anexo: PNG, JPEG e JPG."
        );
      } else {
        notify("Um erro inesperado aconteceu.");
      }
    } else if (expectedError) {
      if (defaultErrorMessages[error.response.status]) {
        notify(defaultErrorMessages[error.response.status], true);
      } else if (
        error.response &&
        error.response.data &&
        typeof error.response.data === "string"
      ) {
        notify(error.response.data, error.response.status !== 412);
      }
    }

    return Promise.reject(error);
  }
);

axios.defaults.baseURL = process.env.REACT_APP_API_PLUG;

axios.defaults.timeout = 1 * 60 * 60 * 10000000;

function setToken() {
  axios.defaults.headers.common["x-auth-token"] = sessionStorage.token || null;
  axios.defaults.headers.common["email"] = sessionStorage.Email || null;
  axios.defaults.headers.common["refreshToken"] =
    sessionStorage.refreshToken || null;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  baseURL: axios.defaults.baseURL,
  setToken,
};
