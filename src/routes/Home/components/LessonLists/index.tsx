import React, {PropsWithChildren, useEffect} from 'react';
import './index.less';
import {Lesson, Lessons} from '@/types';
import {MenuFoldOutlined} from '@ant-design/icons/lib';
import {Alert, Button, Card} from 'antd';
import {Link} from "react-router-dom";

type Props = PropsWithChildren<{
    lessons: Lessons;
    getLessons: () => void;
}>

function LessonLists(props: Props) {
    useEffect(() => {
        if (props.lessons.list.length === 0) {
            props.getLessons();
        }
    }, []);
    return (
        <section className="lesson-list">
            <h2><MenuFoldOutlined/>全部课程</h2>
            {
                props.lessons.list.map((item: Lesson, index: number) => (
                    <Link key={item.id}  to={ {pathname:`/detail/${item.id}`,state:item}}>
                        <Card hoverable style={{width: '100%'}} cover={<img src={item.poster} alt=""/>}>
                            <Card.Meta title={item.title} description={`价格:${item.price}元`}/>
                        </Card>
                    </Link>

                ))
            }
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

export default LessonLists;

