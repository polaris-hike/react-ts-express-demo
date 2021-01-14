import { HomeState } from '@/types';
import {AnyAction} from 'redux';
import * as actionType  from '@/store/action-types'

const initialState:HomeState ={
    currentCategory:'all',
    sliders:[]
}

export default function (state:HomeState=initialState,action:AnyAction):HomeState {
    switch (action.type) {
        case actionType.SET_CURRENT_CATEGORY:
            return {...state,currentCategory:action.payload}
        case actionType.GET_SLIDERS:
            return {...state,sliders:action.payload.data}
        default:
            return state
    }
}