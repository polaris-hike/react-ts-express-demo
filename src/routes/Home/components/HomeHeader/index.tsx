import React, {useState} from 'react';
import logo from '@/assets/images/logo.png';
import './index.less'
import { BarsOutlined } from '@ant-design/icons';
import {Transition} from "react-transition-group";
import classnames from 'classnames'

const duration = 300;
const defaultStyle = {
    transition:`opacity ${duration}ms ease-in-out`,
    opacity:0,
}

const transitionStyles= {
    entering:{opacity: 0},
    entered:{opacity: 1},
    exiting:{opacity: 0},
    exited:{opacity: 0},
    unmounted:{opacity: 0},
}


interface Props {
    currentCategory:string;
    setCurrentCategory:(currentCategory:string)=>any;
}

function HomeHeader(props:Props) {
    const [isMenuVisible,setIsmenuVisible] = useState(false);
    const setCurrentCategory = (event:React.MouseEvent<HTMLUListElement>)=>{
        const target:HTMLUListElement = event.target as HTMLUListElement;
        const category = target.dataset.category;
        props.setCurrentCategory(category)
        setIsmenuVisible(false)
    }
    const click = ()=>{
        console.log(1);
        setIsmenuVisible(!isMenuVisible)
    }
    return (
        <header className="home-header">
            <div className="logo-header">
                <img src={logo} alt=""/>
                <BarsOutlined onClick={click} />
            </div>
            <Transition in={isMenuVisible} timeout={duration}>
                {
                    (state)=>(
                        <ul className="category"
                            onClick={setCurrentCategory}
                            style={{
                                ...defaultStyle,
                                ...transitionStyles[state]
                            }}
                        >
                            <li data-category="all" className={classnames({active:props.currentCategory === 'all'})}>全部课程</li>
                            <li data-category="vue" className={classnames({active:props.currentCategory === 'vue'})}>Vue 课程</li>
                            <li data-category="react" className={classnames({active:props.currentCategory === 'react'})}>React 课程</li>
                        </ul>
                        )
                }
            </Transition>
        </header>
    )
}
export default HomeHeader