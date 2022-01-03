import { useContext, useReducer, useState } from "react";
import UserContext from "./user.context";
import UserReducer, { initialState } from "./user.reducer";
import { HTTPResponses, ServerResponse, URLS } from "../../types";
import clienteAxios from "../../config/axios";
import { User, US_A } from "./usertypes";
import ErrorService from "../../utils/error.helper";
import { CreateUserDTO } from "./user.dto";

const UserState = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, dispatch] = useReducer(UserReducer, initialState());
  //const { sendAlert } = useContext(NotificationsContext)

  const addUser = async (createUserDTO: CreateUserDTO) => {
    /*  try {
      await validateOrReject(createUserDTO)
      setLoading(true)
      const { data } = await clienteAxios.post(URLS.create, createUserDTO)
      setLoading(false)
      if (data.status === 0) {
        sendAlert({
          type: TypesNotification.success,
          msg: 'Successful registration',
        })
        dispatch({
          type: US_A.REGISTER_SUCCES,
          payload: data,
        })
      }
      if (data.status === 3) {
        sendAlert({
          type: TypesNotification.error,
          msg:
            'The person who invites you cannot invite more people, please contact him',
        })
      }
      if (data.status === 2) {
        sendAlert({
          type: TypesNotification.warning,
          msg: 'The email already exists',
        })
      }
      if (data.status === 1) {
        sendAlert({
          type: TypesNotification.warning,
          msg: "We couldn't find an invitation for you",
        })
      }
    } catch (error) {
      setLoading(false)
      console.error('** Error validating addUser ** ', { error })
      return -1
    } */
  };

  const getUserProfile = async (): Promise<User> => {
    try {
      setLoading(true);
      console.log(URLS.user.getUserLogged);
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

  /* 
  const selectUser = async (user: User, type: number) => {
    try {
      dispatch({
        type: US_A.SELECT_USER,
        payload: {
          user,
          type,
        },
      })
    } catch (error) {
      console.error('** Error  selecting User ** ', { error })
    }
  } */

  const deleteUser = async () => {
    /*  try {
      setLoading(true)
      const deleteUserDTO = new DeleteOrSuspendUserDTO(
        state.selectedUser.uuid,
        !state.selectedUser.isActive,
      )
      await validateOrReject(deleteUserDTO)
      const { data } = await clienteAxios.put(URLS.delete, deleteUserDTO)

      if (data.status === 0) {
        sendAlert({
          type: TypesNotification.success,
          msg: 'User deleted successfully',
        })
      }
      if (data.status === 1) {
        sendAlert({
          type: TypesNotification.error,
          msg: 'Not allowed',
        })
      }
      if (data.status === 2) {
        sendAlert({
          type: TypesNotification.error,
          msg: 'User not founded',
        })
      }
      console.log('state.selectedUser:', state.selectedUser)
      setLoading(false)
      dispatch({
        type: US_A.DELETE_SUCCESS,
        payload: state.selectedUser,
      })
    } catch (error) {
      setLoading(false)
      console.error('** Error validating deleteUser ** ', { error })
    } */
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        loading,
        addUser,
        getUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
const errorService = new ErrorService(UserState);


export default UserState;
