//Users-Guest
export enum US_A {
  CHILD_DETAIL = "CHILD_DETAIL",
  GET_USER_PROFILE = "GET_USER_PROFILE",
  REGISTER_SUCCES = "REGISTER_SUCCES",
  DELETE_SUCCESS = "DELETE_SUCCESS",
  UPDATE_SUCCESS = "UPDATE_SUCCESS",
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
  instagram: string | null;
  phonenumber: string;
  telegram: string | null;
  gender: boolean;
  birthday: string;
};
export type Childrens = {
  admins: User[];
  users: User[];
};


export type GET_USER_PROFILE_PAYLOAD = {
  user:User
};

export type GET_USER_PROFILE = {
  type: US_A.GET_USER_PROFILE;
  payload: GET_USER_PROFILE_PAYLOAD;
};



export type ActionTypesUser = GET_USER_PROFILE;
