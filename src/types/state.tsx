import {RouterState} from "connected-react-router";
export interface HomeState {
  currentCategory:string
}

export interface User {
  username:string;
  email:string;
  advatar:string
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
  profile:ProfileState,
  router:RouterState
}
