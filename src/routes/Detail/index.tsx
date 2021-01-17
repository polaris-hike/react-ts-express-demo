import React, {PropsWithChildren, useEffect, useState} from 'react';
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
    const addCartItem = (lesson:Lesson)=>{
        props.addCartItem(lesson)
    }
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