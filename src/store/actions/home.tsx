import * as actionTypes from '@/store/action-types';
import {getSliders} from "@/api/home";

export default {
  setCurrentCategory(currentCategory: string) {
    return {
      type: actionTypes.SET_CURRENT_CATEGORY,
      payload: currentCategory
    };
  },
  getSliders(){
    return {
      type:actionTypes.GET_SLIDERS,
      payload:getSliders()
    }
  }
};