import { HomeState } from '@/types/state';
import {AnyAction} from 'redux';
import * as actionType  from '@/store/action-types'

const initialState:HomeState ={
    currentCategory:'all'
}

export default function (state:HomeState=initialState,action:AnyAction):HomeState {
    switch (action.type) {
        case actionType.SET_CURRENT_CATEGORY:
            return {...state,currentCategory:action.payload}
        default:
            return state
    }
}