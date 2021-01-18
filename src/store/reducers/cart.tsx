import {CartState} from "@/types/cart";
import * as actionType from '@/store/action-types'
import {AnyAction} from "redux";

let initialState: CartState = [];

export default function (state: CartState = initialState, action: AnyAction): CartState {
    switch (action.type) {
        case actionType.ADD_CART_ITEM:
            let oldLesson = state.find(item => item.lesson.id === action.payload.id)
            if (oldLesson) {
                oldLesson.count += 1
            } else {
                state.push({count:1,checked:false,lesson:action.payload})
            }
        case actionType.REMOVE_CART_ITEM:
            let removeIndex = state.findIndex(item => item.lesson.id === action.payload)
            if (removeIndex !== -1) {
                state.splice(removeIndex, 1)
            }
            return state
        case actionType.CLEAR_CART_ITEM:
            state.length = 0
            return state
        case actionType.CHANGE_CART_ITEM_COUNT:
            let changeIndex = state.findIndex(item => item.lesson.id === action.payload.id)
            if (changeIndex !== -1) {
                state[changeIndex].count += 1
            }
            return state
        case actionType.CHANGE_CHECKED_CART_ITEMS:
            let checkedIds = action.payload
            return state.map((item) => {
                item.checked = checkedIds.includes(item.lesson.id);
                return item
            })
        case actionType.SETTLE:
            return state.filter(item => {
                !item.checked
            })
        default:
            return state;
    }
};