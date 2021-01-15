import {HomeState, Lesson} from '@/types';
import {AnyAction} from 'redux';
import * as actionType from '@/store/action-types';

const initialState: HomeState = {
  currentCategory: 'all',
  sliders: [],
  lessons: {
    loading: false,
    list: [],
    hasMore: true,
    offset: 0,
    limit: 5
  }
};

export default function (state: HomeState = initialState, action: AnyAction): HomeState {
  switch (action.type) {
    case actionType.SET_CURRENT_CATEGORY:
      return {...state, currentCategory: action.payload};
    case actionType.GET_SLIDERS:
      if (action.error) {
        return state;
      } else {
        return {...state, sliders: action.payload.data};
      }
    case actionType.GET_LESSONS:
      if (action.error) {
        return state;
      } else {
        return {...state, lessons: action.payload.data};
      }
    case actionType.SET_LESSONS_LOADING:
      state.lessons.loading = action.payload;
      return state
    case actionType.SET_LESSONS:
      state.lessons.loading = false;
      state.lessons.list = [...state.lessons.list,...action.payload.list];
      state.lessons.hasMore = action.payload.hasMore
      state.lessons.offset = state.lessons.offset+action.payload.list.length
      return state
    default:
      return state;
  }
}