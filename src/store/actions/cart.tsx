import {Lesson} from "@/types";
import * as actionTypes from '@/store/action-types'
import {StoreDispatch} from "@/store";
import {message} from "antd";

export default {
    addCartItem(lesson:Lesson ){
        return function (dispatch:StoreDispatch) {
            dispatch({
                type:actionTypes.ADD_CART_ITEM,
                payload:lesson
            })
            message.success('添加购物车成功')
        }
    },
    changeCartItemCount(id:string,count:any){
        return {
            type:actionTypes.CHANGE_CART_ITEM_COUNT,
            payload:{id,count}
        }
    }
}