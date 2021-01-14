import React, {PropsWithChildren, useEffect} from "react";
import './index.less';
import {Carousel} from "antd";
import {Slider} from "@/types";

type Props = PropsWithChildren<{
    sliders:Slider[],
    getSliders:()=>void
}>

function HomeSliders(props:Props) {

    useEffect(()=>{
        if(props.sliders.length === 0){
            props.getSliders()
        }
    },[])

    return (
        <Carousel>
            {
                props.sliders.map((item:Slider,index:number)=>
                    (
                        <div key={index}>
                            <img src={item.url} alt=""/>
                        </div>
                    )
                )
            }
        </Carousel>
    )
}

export default HomeSliders

