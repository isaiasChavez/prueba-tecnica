import {
  IsBoolean,
    isDateString,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    MaxLength,
    MinLength,
  } from "class-validator";

export class ReuestSesionDTO {
    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    password: string;
  }
  
  
  
  
  export class ResetPassword {
    constructor(email: string) {
      this.email = email;
    }
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  }
  
  export class ConfirmUserPassword {
    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MinLength(8)
    email: string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    password: string;
  }
  export class PasswordRecovery {
    constructor(password: string, token: string) {
      this.token = token;
      this.password = password;
    }
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    password: string;
    @MinLength(150)
    @IsString()
    @IsNotEmpty()
    token: string;
  }
  
  export class CreateUserDTO {
    constructor(data:{name: string,nickname: string,birthday: string,gender: boolean,phonenumber:number, lastname: string, email: string, password: string}) {
      this.name = data.name;
      this.lastname = data.lastname;
      this.email = data.email;
      this.password = data.password;
      this.nickname = data.nickname;
      this.birthday= data.birthday;
      this.gender=data.gender
      this.phonenumber= data.phonenumber;
      
    }
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    nickname: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    birthday: any;

    @MaxLength(100)
    @IsString()
    @IsNotEmpty()
    lastname: string;
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    @MaxLength(100)
    email: string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    password: string;

    @IsNotEmpty()
    @IsBoolean()
    gender: boolean;

    phonenumber: number;
  }
  
  
  export class UpdateUserDTO {
    constructor({
      name,
      avatar,
      thumbnail,
      roomImage
    }) {
      this.name=name
      this.avatar=avatar
      this.thumbnail=thumbnail
      this.roomImage = roomImage;
    }
  
    @IsOptional()  
    @IsString()
    name: string;
    
    @IsOptional()  
    @IsString()
    @MaxLength(150)
    avatar: string;
    
    @IsOptional()  
    @IsString()
    @MaxLength(150)
    thumbnail: string;
  
    @IsOptional()  
    @IsString()
    roomImage: string;
  
   
  }
  