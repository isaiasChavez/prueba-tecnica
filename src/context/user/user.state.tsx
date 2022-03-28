import { useContext, useReducer, useState } from "react";
import UserContext from "./user.context";
import UserReducer, { initialState } from "./user.reducer";
import { HTTPResponses, ServerResponse, URLS } from "../../types";

import clienteAxios from "../../config/axios";
import { User, US_A } from "./usertypes";
import ErrorService from "../../utils/error.helper";
import {
  CreateUserDTO,
  UpdateConfigurationUser,
  UpdateUserDTO,
} from "./user.dto";
import { validateOrReject } from "class-validator";
import { message } from "antd";
import config from "../../config";

const UserState = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSimple, setLoadingSimple] = useState<boolean>(false);
  const [state, dispatch] = useReducer(UserReducer, initialState());

  const createUser = async (
    createUserDTO: CreateUserDTO
  ): Promise<ServerResponse> => {
    try {
      await validateOrReject(createUserDTO);

      setLoading(true);
      const res = await clienteAxios.post(URLS.user.create, createUserDTO);
      const data: ServerResponse = res.data;

      if (
        data.status !== HTTPResponses.Ok &&
        data.status !== HTTPResponses.OkCreated
      ) {
        message.info(data.msg);
      }

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("createUser", error),
      };
    }
  };

  const updateUser = async (dto: UpdateUserDTO): Promise<ServerResponse> => {
    try {
      await validateOrReject(dto);

      setLoading(true);
      const res = await clienteAxios.put(`${URLS.user.user}`, dto);
      const data: ServerResponse = res.data;

      if (data.status !== HTTPResponses.Ok) {
        message.info(data.msg);
      } else {
        dispatch({
          type: US_A.UPDATE_SUCCESS,
          payload: {
            user: data.data,
          },
        });
      }

      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("updateUser", error),
      };
    }
  };
  const updateAvatar =  (info):void => {

    if (info.file.status !== "uploading") {

    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      dispatch({
        type: US_A.UPDATE_AVATAR_SUCCESS,
        payload: {
          avatar:info.file.response.data
        },
      });
      
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  const updateConfiguration = async (
    dto: UpdateConfigurationUser
  ): Promise<ServerResponse> => {
    try {
      await validateOrReject(dto);

      setLoadingSimple(true);

      const res = await clienteAxios.put(
        `${URLS.configuration.configuration}`,
        dto
      );      
      const data: ServerResponse = res.data;
      if (data.status === HTTPResponses.Ok) {
        dispatch({
          type: US_A.UPDATE_CONFIGURATION,
          payload: {
            configuration: data.data,
          },
        });
      } else {
        message.info(data.msg);
      }

      setLoadingSimple(false);
      return data;
    } catch (error) {
      setLoadingSimple(false);
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("updateConfiguration", error),
      };
    }
  };

  const getConfiguration = async (): Promise<ServerResponse> => {
    try {


      const res = await clienteAxios.get(`${URLS.configuration.configuration}`); 
      const data: ServerResponse = res.data;
      if (data.status === HTTPResponses.Ok) {
        dispatch({
          type: US_A.GET_CONFIGURATION,
          payload: {
            configuration: data.data,
          },
        });
      } else {
        message.info(data.msg);
      }

      return data;
    } catch (error) {
      setLoading(false);
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("updateUser", error),
      };
    }
  };


  const updateFiles = async (files:FileList): Promise<ServerResponse> => {
    try {

      let formData = new FormData();


      const res = await clienteAxios.get(`${URLS.configuration.configuration}`); 
      const data: ServerResponse = res.data;
      if (data.status === HTTPResponses.Ok) {
        dispatch({
          type: US_A.GET_CONFIGURATION,
          payload: {
            configuration: data.data,
          },
        });
      } else {
        message.info(data.msg);
      }

      return data;
    } catch (error) {
      setLoading(false);
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("updateUser", error),
      };
    }
  };


  const getUserProfile = async (simple: boolean): Promise<User> => {
    try {
      console.log("Trayendo datos del usuario");
      if (simple) {
        setLoadingSimple(true);
      } else {
        setLoading(true);
      }
      const res = await clienteAxios.get(URLS.user.getUserLogged);
      const data: ServerResponse = res.data;
      if (data.status === HTTPResponses.Ok) {
        dispatch({
          type: US_A.GET_USER_PROFILE,
          payload: {
            user: data.data,
          },
        });
      }
      setLoading(false);
      setLoadingSimple(false);
      return data.data;
    } catch (error) {
      setLoading(false);
      setLoadingSimple(false);
      errorService.genericHandler("getUserProfile", error);
    }
  };
  
  const clear = ():void => {
        dispatch({
          type: US_A.CLEAR,
          payload: {
          },
        });
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        loading,
        loadingSimple,
        updateAvatar,
        createUser,
        getUserProfile,
        updateUser,
        updateConfiguration,
        getConfiguration,
        clear
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
const errorService = new ErrorService(UserState);

export default UserState;
