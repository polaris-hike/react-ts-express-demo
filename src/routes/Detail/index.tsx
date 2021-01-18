import React, {PropsWithChildren, useCallback, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {CombinedState, GetLessonsData, Lesson} from "@/types";
import Nav from "@/components/Nav";
import {Button, Card} from "antd";
import {connect} from "react-redux";
import {getLesson} from "@/api/home";
import {ShoppingCartOutlined} from "@ant-design/icons/lib";
import './index.less'
import actions from '@/store/actions/cart';

interface Params {
    id: string
}

class StaticContext {
}

type Props = PropsWithChildren<RouteComponentProps<Params, StaticContext, Lesson>> &typeof actions;

function Detail(props: Props) {
    const [lessons, setLesson] = useState<Lesson>({} as Lesson);
    const addCartItem = useCallback((lesson:Lesson)=>{
        const cover:HTMLDivElement = document.querySelector('.ant-card-cover');
        const coverWidth = cover.offsetWidth;
        const coverHeight = cover.offsetHeight;
        const coverLeft = cover.getBoundingClientRect().left;
        const coverTop = cover.getBoundingClientRect().top;

        const cart:HTMLElement = document.querySelector('.cart');
        const cartWidth = cart.offsetWidth;
        const cartHeight = cart.offsetHeight;
        const cartRight = cart.getBoundingClientRect().right;
        const cartBottom = cart.getBoundingClientRect().bottom;

        const cloneCover:HTMLDivElement = cover.cloneNode(true) as HTMLDivElement;
        cloneCover.style.cssText = (
            `
                z-index:1000;
                opacity:0.8;
                position:fixed;
                width:${coverWidth}px;
                height:${coverHeight}px;
                top:${coverTop}px;
                left:${coverLeft}px;
                transition:all 1s ease-in-out;
            `
        );
        document.body.appendChild(cloneCover)
        setTimeout(()=>{
            cloneCover.style.left = `${cartRight - cartWidth /2}px`;
            cloneCover.style.top = `${cartBottom - cartHeight /2}px`;
            cloneCover.style.width = '0';
            cloneCover.style.height = '0';
            cloneCover.style.opacity = '.5';
        },0)
        setTimeout(()=>{
           cloneCover.parentNode.removeChild(cloneCover)
        },1000)
        props.addCartItem(lesson)
    },[])
    useEffect(() => {
        (async function () {
            let lesson = props.location.state
            if (!lesson) {
                let result: GetLessonsData = await getLesson<GetLessonsData>(props.match.params.id)
                if (result.success) {
                    lesson = result.data
                }
            }
            setLesson(lesson)
        })()
    }, [])
    return (
        <>
            <Nav history={props.history}>课程详情</Nav>
            <Card
                hoverable
                style={{width: '100%'}}
                cover={<img src={lessons.poster} alt=""/>}
            >
                <Card.Meta
                    title={lessons.title}
                    description={
                        <>
                            <p>{`价格:${lessons.price}`}</p>
                            <p><Button
                                className="add-cart"
                                icon={<ShoppingCartOutlined />}
                                onClick={()=>addCartItem(lessons)}
                            >加入购物车</Button></p>
                        </>
                    }/>
            </Card>
        </>
    )
}

export default connect(
    (state: CombinedState) => state,
    actions
)(Detail)