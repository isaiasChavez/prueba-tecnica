import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
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
    constructor(name: string, lastname: string, email: string, password: string) {
      this.name = name;
      this.lastname = lastname;
      this.email = email;
      this.password = password;
    }
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;
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
  