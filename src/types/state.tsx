import {RouterState} from "connected-react-router";
export interface HomeState {
  currentCategory:string
}
export interface MineState {

}
export interface ProfileState {

}
export interface CombinedState {
  home:HomeState,
  mine:MineState,
  profile:ProfileState,
  router:RouterState
}
