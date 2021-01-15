import {Lesson, Slider} from '@/types';

export interface Lessons {
    loading:boolean;
    list:Lesson[];
    hasMore:boolean;
    offset:number;
    limit:number;
}

export interface HomeState {
    currentCategory:string;
    sliders:Slider[],
    lessons:Lessons
}
