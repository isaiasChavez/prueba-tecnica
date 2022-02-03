
import { createContext } from "react";
import  Config  from "../../config";
import { CreateUserDTO, UpdateConfigurationUser, UpdateUserDTO } from "./user.dto";
import {  ConfigurationUser, User } from "./usertypes";
import {ServerResponse } from "../../types";

export type UserStateType = {
  user: User;
  configuration:ConfigurationUser
};



interface UserContextInterface {
  createUser(createUserDTO: CreateUserDTO): Promise<ServerResponse>
  updateUser(dto: UpdateUserDTO): Promise<ServerResponse>,
  updateConfiguration (dto: UpdateConfigurationUser): Promise<ServerResponse>, 
  getConfiguration (): Promise<ServerResponse>,
  updateAvatar(info):void,
  clear():void,
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
  getUserProfile(simple:boolean):Promise<User>;
  loading:boolean;
  loadingSimple:boolean;
  user:User,
  configuration:ConfigurationUser
}



const UserContext = createContext<UserContextInterface | null>(null);

export default UserContext;
