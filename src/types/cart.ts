import {Lesson} from "@/types/lessons";

export interface CartItem {
    lesson:Lesson;
    count:number;
    checked:boolean;
}

export type CartState  = CartItem[]