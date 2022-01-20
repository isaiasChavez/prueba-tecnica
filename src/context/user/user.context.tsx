
import { createContext } from "react";
import  Config  from "../../config";
import { CreateUserDTO, UpdateUserDTO } from "./user.dto";
import {  User } from "./usertypes";
import {ServerResponse } from "../../types";

export type UserStateType = {
  user: User;
};



interface UserContextInterface {
  createUser(createUserDTO: CreateUserDTO): Promise<ServerResponse>
  updateUser(dto: UpdateUserDTO): Promise<ServerResponse>
  /* resetPass(resetPassword: PasswordRecovery): any;
  passRecover(passwordRecovery: ResetPassword): any;
  confirmPass(confirmUserPassword: ConfirmUserPassword): any;
  deleteUser(): any;
  updateUser(updateUserDTO: UpdateUserDTO): any;
  getUserDetail(): any;
  profile: Profile;
  childrens:Childrens,
  selectedUser:User;
  type: number; */
  getUserProfile():Promise<User>;
  loading:boolean;
  user:User
}



const UserContext = createContext<UserContextInterface | null>(null);

export default UserContext;
