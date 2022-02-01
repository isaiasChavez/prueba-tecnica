import { useContext, useReducer, useState } from "react";
import UserContext from "./user.context";
import UserReducer, { initialState } from "./user.reducer";
import { HTTPResponses, ServerResponse, URLS } from "../../types";

import clienteAxios from "../../config/axios";
import { User, US_A } from "./usertypes";
import ErrorService from "../../utils/error.helper";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import { validateOrReject } from "class-validator";
import { message } from "antd";

const UserState = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, dispatch] = useReducer(UserReducer, initialState());

  const createUser = async (createUserDTO: CreateUserDTO): Promise<ServerResponse> => {
    

      try {
      await validateOrReject(createUserDTO)

      setLoading(true)
      const res = await clienteAxios.post(URLS.user.create, createUserDTO)
      const data: ServerResponse = res.data;

      if (data.status !== HTTPResponses.Ok && data.status !== HTTPResponses.OkCreated) {
        message.info(data.msg);
      }

      console.log({data})
      setLoading(false)
      return data
      
    } catch (error) {
      setLoading(false)
      console.log({error})
      return {
        status: HTTPResponses.BadRequest,
        msg: errorService.genericHandler("createUser", error),
      };
    } 
  };


  const updateUser = async (dto: UpdateUserDTO): Promise<ServerResponse> => {
    

    try {
    await validateOrReject(UpdateUserDTO)

    setLoading(true)
    const res = await clienteAxios.put(`${URLS.user.user}${state.user.email}`, dto)
    const data: ServerResponse = res.data;

    if (data.status !== HTTPResponses.Ok) {
      message.info(data.msg);
      console.log({data});
    }else{
      dispatch({ type: US_A.UPDATE_SUCCESS, payload: {
        user:data.data
      } })
    }

    console.log({data})
    setLoading(false)
    return data
    
  } catch (error) {
    setLoading(false)
    console.log({error})
    return {
      status: HTTPResponses.BadRequest,
      msg: errorService.genericHandler("updateUser", error),
    };
  } 
};



  const getUserProfile = async (): Promise<User> => {
    try {
      setLoading(true);
      const res = await clienteAxios.get(URLS.user.getUserLogged);
      const data: ServerResponse = res.data;

      
      if (data.status === HTTPResponses.Ok) {
        dispatch({ type: US_A.GET_USER_PROFILE, payload: {
          user:data.data
        } })
      }
      setLoading(false);
      return data.data;
    } catch (error) {
      setLoading(false);
      errorService.genericHandler("getUserProfile", error)
    }
  };

 
  

  return (
    <UserContext.Provider
      value={{
        ...state,
        loading,
        createUser,
        getUserProfile,
        updateUser
        
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
const errorService = new ErrorService(UserState);


export default UserState;
