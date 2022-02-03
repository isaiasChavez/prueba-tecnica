import { UserStateType } from "./user.context";
import { ActionTypesUser, US_A } from "./usertypes";

export const initialState = () => {
  let state: UserStateType = {
    user: {
      email: "",
      type: "",
      name: "",
      lastname: "",
      avatar: "",
      instagram: null,
      phonenumber: "",
      telegram: null,
      gender: true,
      birthday: "",
    },
    configuration: {
      instagram: true,
      telegram: false,
    },
  };
  return state;
};

const userReducer = (
  state: UserStateType,
  action: ActionTypesUser
): UserStateType => {
  switch (action.type) {
    case US_A.GET_USER_PROFILE:
      const data = action.payload;
      return {
        ...state,
        user: data.user,
      };
    case US_A.CLEAR:
      return initialState();
    case US_A.UPDATE_SUCCESS:
      const dataup = action.payload;
      const datae = {
        ...state.user,
        ...dataup.user,
      };

      return {
        ...state,
        user: datae,
      };
    case US_A.UPDATE_AVATAR_SUCCESS:
      const dataAV = action.payload;

      return {
        ...state,
        user: {
          ...state.user,
          avatar: dataAV.avatar,
        },
      };
    case US_A.GET_CONFIGURATION:
    case US_A.UPDATE_CONFIGURATION:
      console.log("ASDFASDFASDFSDFASDFDDDDDDDDDDDDDD");
      const dataConfig = action.payload;
      console.log({ dataConfig });
      return {
        ...state,
        configuration: dataConfig.configuration,
      };

    default:
      return state;
  }
};
export default userReducer;
