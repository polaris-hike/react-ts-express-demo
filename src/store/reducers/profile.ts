import {LOGIN_TYPE, ProfileState} from '@/types/state';
import {AnyAction} from 'redux';
import * as actionTypes from '@/store/action-types';

const initialState: ProfileState = {
  loginState: LOGIN_TYPE.UN_VALIDATE,
  user: null,
  error: null
};

export default function (state: ProfileState = initialState, action: AnyAction): ProfileState {
  switch (action.type) {
    case actionTypes.VALIDATE:
      if (action.payload.success) {
        return {
          loginState: LOGIN_TYPE.LOGINED,
          user: action.payload.data,
          error: null
        };
      } else {
        return {
          loginState: LOGIN_TYPE.UNLOGINED,
          user: null,
          error: action.payload
        };
      }
    case actionTypes.LOGOUT:
      return {
        loginState: LOGIN_TYPE.UNLOGINED,
        user: null,
        error: null
      };
    default:
      break;
  }
  return state;
}