import React, {PropsWithChildren, useEffect} from 'react';
import './index.less';
import {Lesson, Lessons} from '@/types';
import {MenuFoldOutlined} from '@ant-design/icons/lib';
import {Card} from 'antd';

type Props = PropsWithChildren<{
  lessons: Lessons;
  getLessons: () => void;
}>

function LessonLists(props: Props) {
  useEffect(() => {
    if(props.lessons.list.length ===0){
      props.getLessons();
    }
  }, []);
  return (
   <section>
     <h2><MenuFoldOutlined />全部课程</h2>
     {
       props.lessons.list.map((item:Lesson,index:number)=>(
         <Card key={item.id} hoverable style={{width:'100%'}} cover={<img src={item.poster} alt=""/>}>
          <Card.Meta title={item.title} description={`价格:${item.price}元`} />
         </Card>
       ))
     }
   </section>
  );
}

export default LessonLists;

