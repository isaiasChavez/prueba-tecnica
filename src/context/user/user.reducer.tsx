import { UserStateType } from "./user.context";
import { ActionTypesUser, US_A } from "./usertypes";

  export const initialState = () => {
    let state: UserStateType = {
      user:{
          email: '',
          type: '',
          name: '',
          lastname: '',
          instagram: null,
          phonenumber: '',
          telegram: null,
          gender: true,
          birthday: ''
      
      }
      
    }
    return state
  }

const userReducer = (state: UserStateType,action: ActionTypesUser): UserStateType => {
  const data = action.payload;

  switch (action.type) {
    case US_A.GET_USER_PROFILE:
      return {
        ...state,
        user:data.user
      }
  
    default:
      return state;
  }
};
export default userReducer;
