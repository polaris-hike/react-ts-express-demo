import React, {PropsWithChildren} from 'react';
import './index.less';
import {Button, Form, Input} from 'antd';
import {connect} from "react-redux";
import {CombinedState, ProfileState} from "@/types/state";
import actions from '@/store/actions/profile';
import {UserOutlined,LockOutlined,MailOutlined } from '@ant-design/icons';
import {Link, RouteComponentProps} from "react-router-dom";
import mapDispatchToProps from "@/store/actions/profile";
import Nav from "@/components/Nav";
import {LoginPayload} from '@/types/profile';

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>;

function Login(props: Props) {
  const handleSubmit = (values:LoginPayload)=>{
    props.login(values)
  }
  return (
    <>
      <Nav history={props.history}>用户登录</Nav>
      <Form className="login-form" onFinish={handleSubmit}>
        <Form.Item name="username" label="用户名" rules={[
          {
            required: true, message: '用户名不能为空'
          }
        ]}>
          <Input placeholder="用户名" prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}/>
        </Form.Item>
        <Form.Item name="password" label="密码" rules={[
          {
            required: true, message: '密码不能为空'
          }
        ]}>
          <Input placeholder="密码" prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}/>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>或者 <Link to="/register">注册</Link>
        </Form.Item>
      </Form>
    </>
  )
}

const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

export default connect(
  mapStateToProps, actions
)(Login)