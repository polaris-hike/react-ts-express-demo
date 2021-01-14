import {User} from "@/types/state";

export interface RegisterData {
    success:boolean,
    data:User
}

export interface LoginData {
    success:boolean,
    data:string
}