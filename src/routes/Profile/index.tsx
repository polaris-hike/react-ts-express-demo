import React, {PropsWithChildren, useEffect} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {CombinedState, LOGIN_TYPE, ProfileState } from '@/types/state';
import mapDispatchToProps from '@/store/actions/profile';
import Nav from '@/components/Nav';
import {Alert, Button, Descriptions} from 'antd';

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>;

function Profile(props: Props) {
  useEffect(()=>{
    props.validate()
  },[]);
  let content;
  if (props.loginState === LOGIN_TYPE.UN_VALIDATE) {
    content = null;
  } else if (props.loginState === LOGIN_TYPE.LOGINED) {
    content = (
      <div className="user-info">
        <Descriptions title="当前用户">
          <Descriptions.Item label="用户名">邬绪威</Descriptions.Item>
          <Descriptions.Item label="邮箱">2509165479@qq.con</Descriptions.Item>
        </Descriptions>
        <Button type="ghost" onClick={()=>props.logout()}>退出</Button>
      </div>
    );
  } else {
    content = (
      <>
         <Alert type="warning" message="未登录" description="亲爱的用户你好，你尚未登录，请你注册或者登录" />
         <div style={{textAlign:'center',padding:'.5rem'}}>
           <Button type="dashed" onClick={()=>props.history.push('/login')}>登录</Button>
           <Button type="dashed" onClick={()=>props.history.push('/register')}>注册</Button>
         </div>
      </>
    );
  }
  return (
    <section>
      <Nav history={props.history}>个人中心</Nav>
      {content}
    </section>
  );
}

const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);