import {AnyAction, combineReducers, Reducer, ReducersMapObject} from 'redux';
import {connectRouter} from 'connected-react-router';
import home from './home';
import mine from './mine';
import profile from './profile';
import history from '@/history';
import {CombinedState} from '@/types/state';
/*import produce from 'immer';
import {combinReducers} from 'redux-immer';*/

const reducers:ReducersMapObject<CombinedState,AnyAction> = {
  home,mine,profile,
  router:connectRouter(history)
}


const rootReducer:Reducer<CombinedState,AnyAction> = combineReducers<CombinedState>(reducers)

export default rootReducer