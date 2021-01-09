import {HomeState} from '@/store/reducers/home';
import {MineState} from '@/store/reducers/mine';
import {ProfileState} from '@/store/reducers/profile';
import {RouterState} from "connected-react-router";

export interface CombinedState {
  home:HomeState,
  mine:MineState,
  profile:ProfileState,
  router:RouterState
}
