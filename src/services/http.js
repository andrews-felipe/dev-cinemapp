import Axios from "axios";

const http = Axios.create({
  baseURL: `http://www.omdbapi.com/?apikey=925eba28&`
});

/**
 * @author Andrews
 *
 * Serviço para requisições http
 */
export default {
  getBy: param => {
    return http.get(param);
  }
};
