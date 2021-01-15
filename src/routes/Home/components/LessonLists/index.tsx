import React, {PropsWithChildren, useEffect} from 'react';
import './index.less';
import {Lesson} from '@/types';

type Props = PropsWithChildren<{
  lessons?: Lesson[];
  getLessons: () => void;
}>

function LessonLists(props: Props) {
  useEffect(() => {
    props.getLessons();
  }, []);
  return (
   <div>
      LessonList
   </div>
  );
}

export default LessonLists;

