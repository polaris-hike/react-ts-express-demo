import axios from './index';
import {SliderData} from "@/types";


export function getSliders() {
    return axios.get<SliderData,SliderData>('/sliders/list')
}
export function getLessons<T>(category:string='all',offset?:number,limit?:number) {
    return axios.get<T,T>(`/lessons/list?category=${category}&offset=${offset}&limit=${limit}`)
}