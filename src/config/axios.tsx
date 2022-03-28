import axios from "axios";
import Configuration from './'
const clienteAxios = axios.create({
  baseURL: Configuration.baseURL,
});

export default clienteAxios;
