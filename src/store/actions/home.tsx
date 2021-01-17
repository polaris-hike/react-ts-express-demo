import * as actionTypes from '@/store/action-types';
import {getLessons, getSliders} from '@/api/home';
import {StoreDispatch, StoreGetState} from '@/store';
import {LessonsData} from '@/types';

export default {
  setCurrentCategory(currentCategory: string) {
    return {
      type: actionTypes.SET_CURRENT_CATEGORY,
      payload: currentCategory
    };
  },
  getSliders() {
    return {
      type: actionTypes.GET_SLIDERS,
      payload: getSliders()
    };
  },
  getLessons() {
    return function (dispatch: StoreDispatch, getState: StoreGetState) {
      (async function () {
        let {currentCategory, lessons: {hasMore, limit, offset, loading}} = getState().home;
        if (!loading && hasMore) {
          dispatch({type:actionTypes.SET_LESSONS_LOADING, payload:true})
          const result: LessonsData = await getLessons<LessonsData>(currentCategory, offset, limit);
          dispatch({
            type:actionTypes.SET_LESSONS,
            payload:result.data
          })
        }
      })();
    };
  },
  refreshLessons(){
    return function (dispatch: StoreDispatch, getState: StoreGetState) {
      (async function () {
        let {currentCategory, lessons: { limit, loading}} = getState().home;
        if (!loading) {
          dispatch({type:actionTypes.SET_LESSONS_LOADING, payload:true})
          const result: LessonsData = await getLessons<LessonsData>(currentCategory, 0, limit);
          dispatch({
            type:actionTypes.REFRESH_LESSONS,
            payload:result.data
          })
        }
      })();
    };
  }
};