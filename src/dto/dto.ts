import {  IsEmail, IsNotEmpty} from "class-validator";


export class userDto {
    @IsNotEmpty()
    userName: string;
    @IsNotEmpty() 
    firstName: string;
    @IsNotEmpty() 
    lastName: string;
    @IsNotEmpty() 
    password: string;
    @IsNotEmpty()
    @IsEmail()
    email: string; 
}

export class signInForm {
    @IsNotEmpty()
    userName : string;
    @IsNotEmpty()
    password: string;
}