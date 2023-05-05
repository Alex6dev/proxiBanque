export interface User {
    user:Advisor|Manager| null;
    typeUser:"ADVISOR"|"MANAGER"|null
}
export interface UserDto{
	id: string,
	name:string;
	firstName:string;
	phone:string;
	mail:string;
    typeUser:"ADVISOR"|"MANAGER"
}

export interface Advisor{
    id:string,
    name:string,
    firstName:string,
    phone:string,
    mail:string,
}

export interface Manager{
    id:string,
    name:string,
    firstName:string,
    phone:string,
    mail:string,
}