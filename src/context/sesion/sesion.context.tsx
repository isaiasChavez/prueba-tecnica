import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { createContext } from "react";
import { ServerResponse, StatusService } from "../../types";



export class LoginDTO  {
  constructor({email,password}) {

    this.email = email
    this.password= password   
  }

  @IsEmail()
  @IsNotEmpty()
  email:string
  
  @IsNotEmpty()
  password:string

}

export class ReuestSesionLogOutDTO  {
  constructor() {


    
  }
}
export type SesionStateType = {
  isLogged: boolean;
  token: string;
};


export const initialStateSesion = () => {
  let state: SesionStateType = {
    token:'',
    isLogged: false,
  };
  return state;
};

interface SesionContextInterface {
  logout(): Promise<StatusService>;
  login(loginDTO:LoginDTO): Promise<StatusService>;
  verifyToken(token:string): Promise<ServerResponse>;
  isLogged:boolean,
  loading:boolean
}

const SesionContext = createContext<SesionContextInterface | null>(null);

export default SesionContext;
