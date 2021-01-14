import axios from './index';
import {SliderData} from "@/types";


export function getSliders() {
    return axios.get<SliderData,SliderData>('/sliders/list')
}