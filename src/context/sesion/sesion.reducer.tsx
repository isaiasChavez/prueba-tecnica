import { SesionStateType } from "./sesion.context";
import {
  ActionTypes,
  LOGIN_SUCCESS,
  LOG_A,
  RESET_PASS_SUCCESS,
} from "./sesiontypes";

const sesionReducer = (
  state: SesionStateType,
  action: ActionTypes
): SesionStateType => {
  const newState: SesionStateType = {
    ...state,
  };

  switch (action.type) {
    case LOG_A.LOGIN_SUCCESS:
      const payload = action.payload;
      newState.token = payload.token;
      newState.isLogged = true;
      break;
    case LOG_A.CLOSE_SESION:
      newState.isLogged = false;
      newState.token = null;
      break;

    default:
      return state;
  }
  return newState;
};
export default sesionReducer;
