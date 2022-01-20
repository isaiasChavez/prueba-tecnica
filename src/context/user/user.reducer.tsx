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
  

  switch (action.type) {
    case US_A.GET_USER_PROFILE:
      const data = action.payload;
      return {
        ...state,
        user:data.user
      }
    case US_A.UPDATE_SUCCESS:
      const dataup = action.payload;
    return {
      ...state,
      user:dataup.user
    }
  
    default:
      return state;
  }
};
export default userReducer;
