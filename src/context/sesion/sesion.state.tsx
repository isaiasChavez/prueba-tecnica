import { useContext, useReducer, useState } from "react";
import axios, { tokenAuth } from "../../config/axios";
import SesionContext, {
  initialStateSesion,
  LoginDTO,
  ReuestSesionLogOutDTO,
} from "./sesion.context";
import {
  URLS,
  TypesNotification,
  StatusService,
  HTTPResponses,
  ServerResponse,
} from "../../types/index";
import SesionReducer from "./sesion.reducer";
import ErrorService from "../../utils/error.helper";
import { AxiosResponse } from "axios";
import { validateOrReject, ValidationError } from "class-validator";
import { LOG_A } from "./sesiontypes";
import config from "../../config";

const SesionState = ({ children }) => {
  const [state, dispatch] = useReducer(SesionReducer, initialStateSesion());
  
  const [loading, setLoading] = useState<boolean>(false);

  
  const defaultResponse = {
    code: HTTPResponses.BadRequest,
    message: "Ha ocurrido un error",
  };

  const login = async (loginDTO: LoginDTO): Promise<StatusService> => {
    try {
      let response = defaultResponse;
      setLoading(true);
      await errorService.validateClass(loginDTO, "login");


      const res: AxiosResponse = await axios.post(URLS.sesion.login, loginDTO);
      const data: ServerResponse = res.data;

      if (data.status === HTTPResponses.Ok) {
        tokenAuth(data.data.token);
        response = {
          code: HTTPResponses.Ok,
          message: "ok",
        };
        dispatch({
          type: LOG_A.LOGIN_SUCCESS,
          payload: {
            token:data.data.token
          },
        });
        
        localStorage.setItem(config.TOKEN_NAME_INTERN,data.data.token)

      } else {
        if (data.status === HTTPResponses.BadRequest) {
          response = {
            code: data.status,
            message: "El email o el password son incorrectos.",
          };
        }
        if (data.status === HTTPResponses.NotFound) {
          response = {
            code: data.status,
            message: "El usuario no existe.",
          };
        }
      }

      setLoading(false);

      return response;
    } catch (error) {
      setLoading(false);

      return {
        code: HTTPResponses.BadRequest,
        message: errorService.genericHandler("login", error),
      };
    }
  };

  const verifyToken = async (token:string): Promise<ServerResponse> => {
    
    try {
      setLoading(true)
      const res: AxiosResponse = await axios.post(`${URLS.sesion.validate}/${token}`,);
      const data: ServerResponse = res.data;     
     
      setLoading(false)

      if (data.status === HTTPResponses.BadRequest) {
        return{
          msg:'bad',
          status:HTTPResponses.BadRequest
        }
      } 

      tokenAuth(token);

      dispatch({
        type: LOG_A.LOGIN_SUCCESS,
        payload: {token},
      });
      
      return data

    } catch (error) {
      setLoading(false)
      return {
        status:HTTPResponses.BadRequest,
        msg: errorService.genericHandler("verifyToken", error),
      };
    }
  };
  const logout = async (): Promise<StatusService> => {
    /*
    try {
       const logoutDto = new ReuestSesionLogOutDTO()
      setLoading(true)
      const { data } = await axios.post(URLS.logout,logoutDto);
      
      localStorage.removeItem(Config.TOKEN_NAME_INTERN);
      setLoading(false)
      if (data.status === 0) {
      }
      if (data.status === 2) {
        sendAlert({
          type: TypesNotification.error,
          msg: `Sesion expired`
        })
      }
      router.push("/");
      dispatch({
        type: LOG_A.CLOSE_SESION,
        payload: null,
      });
    } catch (error) {
      sendAlert({
        type: TypesNotification.error,
        msg: `An error has occurred ${error.message}`
      })
      setLoading(false)
    }
    */
    return {
      code: HTTPResponses.Ok,
      message: "ok",
    };
  };

  return (
    <SesionContext.Provider
      value={{
        ...state,
        loading,
        verifyToken,
        logout,
        login,
      }}
    >
      {children}
    </SesionContext.Provider>
  );
};

const errorService = new ErrorService(SesionState);



export default SesionState;
