import React, {PropsWithChildren, useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {CombinedState, GetLessonsData, Lesson} from "@/types";
import Nav from "@/components/Nav";
import {Card} from "antd";
import {connect} from "react-redux";
import {getLesson} from "@/api/home";

interface Params {
    id:string
}

class StaticContext {
}

type Props = PropsWithChildren<RouteComponentProps<Params,StaticContext,Lesson>>;

function Detail(props: Props) {
    const [lessons, setLesson] = useState<Lesson>({} as Lesson);
    useEffect(()=>{
        (async function () {
            let lesson = props.location.state
            if(!lesson) {
               let result:GetLessonsData = await getLesson<GetLessonsData>(props.match.params.id)
                if(result.success) {
                    lesson = result.data
                }
            }
            setLesson(lesson)
        })()
    },[])
    return (
        <>
            <Nav history={props.history}>课程详情</Nav>
            <Card
                hoverable
                style={{width: '100%'}}
                cover={<img src={lessons.poster} alt=""/>}
            >
                <Card.Meta title={lessons.title} description={<p>{ `价格:${lessons.price}元`}</p>}>

                </Card.Meta>
            </Card>
        </>
    )
}

export default connect(
    (state:CombinedState)=>state
)(Detail)