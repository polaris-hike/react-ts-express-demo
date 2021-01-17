import {RouterState} from "connected-react-router";
import {HomeState,CartState} from "./";

export interface User {
  id:string;
  username:string;
  email:string;
  avatar:string;
}
export enum LOGIN_TYPE {
  UN_VALIDATE = 'UN_VALIDATE', // 未验证
  LOGINED = 'LOGINED', // 已经登录
  UNLOGINED = 'UNLOGINED' // 没有登录
}
export interface MineState {

}
export interface ProfileState {
  loginState:LOGIN_TYPE;
  user:User | null;
  error:string | null;
}
export interface CombinedState {
  home:HomeState,
  mine:MineState,
  cart:CartState,
  profile:ProfileState,
  router:RouterState
}
