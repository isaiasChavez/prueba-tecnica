import axios from "axios";
import Configuration from './'
const clienteAxios = axios.create({
  baseURL: Configuration.baseURL,
});


export const tokenAuth = (token:string) => {  
  if (token) {

    clienteAxios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

  } else {
    delete clienteAxios.defaults.headers.common['Authorization'];
  }
};

export default clienteAxios;
