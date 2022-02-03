//Users-Guest
export enum US_A {
  CHILD_DETAIL = "CHILD_DETAIL",
  GET_USER_PROFILE = "GET_USER_PROFILE",
  CLEAR = "CLEAR",
  UPDATE_CONFIGURATION = "UPDATE_CONFIGURATION",
  GET_CONFIGURATION = "GET_CONFIGURATION",
  REGISTER_SUCCES = "REGISTER_SUCCES",
  DELETE_SUCCESS = "DELETE_SUCCESS",
  UPDATE_SUCCESS = "UPDATE_SUCCESS",
  UPDATE_AVATAR_SUCCESS = "UPDATE_AVATAR_SUCCESS",
  PAUSE_SUCCESS = "PAUSE_SUCCESS",
  SELECT_USER = "SELECT_USER",
  UPDATE_PERIOD_SUCCESS = "UPDATE_PERIOD_SUCCESS",
  CHILDRENS = "CHILDRENS",
}

export enum Status {
  ACTIVE = 1,
  INACTIVE = 2,
  EXPIRED = 3,
}

export type Suscription = {
  cost: string;
  createdAt: string;
  finishedAt: string;
  isActive: boolean;
  invitations: number;
  isDeleted: boolean;
  startedAt: string;
};
export type User = {
  email: string;
  type: string;
  name: string;
  lastname: string;
  avatar: string;
  instagram: string | null;
  phonenumber: string;
  telegram: string | null;
  gender: boolean;
  birthday: string;
};

export type ConfigurationUser = {
  instagram: boolean;
  telegram: boolean;
};


export type Childrens = {
  admins: User[];
  users: User[];
};


export type GET_USER_PROFILE_PAYLOAD = {
  user:User
};

export type UPDATE_USER_AVATAR_PAYLOAD = {
  avatar:string
};

export type UPDATE_CONFIGURATION_PAYLOAD = {
  configuration:ConfigurationUser
};

export type GET_CONFIGURATION_PAYLOAD = {
  configuration:ConfigurationUser
};

export type UPDATE_SUCCESS_PAYLOAD = {
  user:User
};


export type GET_USER_PROFILE = {
  type: US_A.GET_USER_PROFILE;
  payload: GET_USER_PROFILE_PAYLOAD;
};

export type CLEAR = {
  type: US_A.CLEAR;
  payload: {};
};

export type UPDATE_CONFIGURATION = {
  type: US_A.UPDATE_CONFIGURATION;
  payload: UPDATE_CONFIGURATION_PAYLOAD;
};

export type GET_CONFIGURATION = {
  type: US_A.GET_CONFIGURATION;
  payload: UPDATE_CONFIGURATION_PAYLOAD;
};

export type UPDATE_SUCCESS = {
  type: US_A.UPDATE_SUCCESS;
  payload: UPDATE_SUCCESS_PAYLOAD;
};
export type UPDATE_AVATAR = {
  type: US_A.UPDATE_AVATAR_SUCCESS;
  payload: UPDATE_USER_AVATAR_PAYLOAD;
};




export type ActionTypesUser = GET_USER_PROFILE| UPDATE_SUCCESS|UPDATE_CONFIGURATION|GET_CONFIGURATION|UPDATE_AVATAR|CLEAR;
