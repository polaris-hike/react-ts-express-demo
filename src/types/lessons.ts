export interface Lesson {
  id:string;
  order:number; // 顺序
  title:string; // 标题
  video:string; // 视频地址
  poster:string; // 海报地址
  url:string;  // url 地址
  price:string; // 价格
  category:string; // 分类
}

export interface LessonsData {
  success:boolean;
  data:{
    hasMore:boolean,
    list:Lesson[]
  }
}

export interface GetLessonsData {
  success:boolean;
  data:Lesson
}