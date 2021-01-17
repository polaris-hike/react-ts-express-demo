import React, {forwardRef, PropsWithChildren, useEffect, useState} from 'react';
import './index.less';
import {Lesson, Lessons} from '@/types';
import {MenuFoldOutlined} from '@ant-design/icons/lib';
import {Alert, Button, Card, Skeleton} from 'antd';
import {Link} from "react-router-dom";

type Props = PropsWithChildren<{
    container: any;
    lessons: Lessons;
    getLessons: () => void;
}>

function LessonLists(props: Props, forwardRef: any) {
    const [_, forceUpdate] = useState(0)
    useEffect(() => {
        if (props.lessons.list.length === 0) {
            props.getLessons();
        }
        forwardRef.current = () => forceUpdate(x => x + 1)
    }, []);
    let start = 0;
    let rootFontSize = parseFloat(document.documentElement.style.fontSize);
    if (props.container.current) {
        let scrollTop = props.container.current.scrollTop;
        start = Math.floor((scrollTop - (4.26 + 1.33) * rootFontSize) / (8.6667 * rootFontSize)); // 轮播图的高度+h2课程的高度/每个card的高度
    }
    return (
        <section className="lesson-list">
            <h2><MenuFoldOutlined/>全部课程</h2>
            <Skeleton active paragraph={{rows:8}} loading={props.lessons.loading && props.lessons.list.length === 0}>
                {
                    props.lessons.list.map((item: Lesson, index: number) => (
                        index >= start && index <= start + 2 ? (
                            <Link key={item.id} to={{pathname: `/detail/${item.id}`, state: item}}>
                                <Card hoverable style={{width: '100%'}} cover={<img src={item.poster} alt=""/>}>
                                    <Card.Meta title={item.title} description={`价格:${item.price}元`}/>
                                </Card>
                            </Link>
                        ) : <div key={item.id} style={{height: `${8.6667 * rootFontSize}px`}}/>
                    ))
                }
            </Skeleton>
            {
                props.lessons.hasMore
                    ? <Button
                        onClick={props.getLessons}
                        type="primary"
                        loading={props.lessons.loading}
                        block> {props.lessons.loading ? '加载中' : '加载更多'} </Button>
                    : <Alert style={{textAlign: 'center'}} message="到底啦" type="warning"/>
            }

        </section>
    );
}

export default forwardRef(LessonLists);

