
import { createContext } from "react";
import  Config  from "../../config";
import { CreateUserDTO } from "./user.dto";
import {  User } from "./usertypes";

export type UserStateType = {
  user: User;
};



interface UserContextInterface {
  addUser(createUserDTO: CreateUserDTO): any;
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
