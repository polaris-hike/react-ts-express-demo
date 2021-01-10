import { ProfileState,LOGIN_TYPE } from '@/types/state';
import {AnyAction} from 'redux';
const initialState:ProfileState ={
    loginState:LOGIN_TYPE.UN_VALIDATE,
    user:null,
    error:null
}

export default function (state:ProfileState=initialState,action:AnyAction):ProfileState {
return state
}