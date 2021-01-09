import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import home from './home';
import mine from './mine';
import profile from './profile';
import history from '@/history';

const rootReducer = combineReducers({
  home,mine,profile,
  router:connectRouter(history)
})
export default rootReducer