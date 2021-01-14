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

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>;

function Register(props: Props) {
    const handleSubmit = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
    }
    return (
        <>
            <Nav history={props.history}>用户注册</Nav>
            <Form className="login-form" onSubmitCapture={handleSubmit}>
                <Form.Item name="username" rules={[
                    {
                        required: true, message: '用户名不能为空'
                    }
                ]}>
                    <Input placeholder="用户名" prefix={<UserOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                </Form.Item>
                <Form.Item name="password" rules={[
                    {
                        required: true, message: '密码不能为空'
                    }
                ]}>
                    <Input placeholder="密码" prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                </Form.Item>
                <Form.Item name="confirmPassword" rules={[
                    {
                        required: true, message: '确认密码不能为空'
                    }
                ]}>
                    <Input placeholder="确认密码" prefix={<LockOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                </Form.Item>
                <Form.Item name="email" rules={[
                    {
                        required: true, message: '邮箱不能为空'
                    },{
                        pattern:/@/,message:"邮箱格式不正确"
                    }
                ]}>
                    <Input placeholder="邮箱" prefix={<MailOutlined style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>或者 <Link to="/login">登录</Link>
                </Form.Item>
            </Form>
        </>
    )
}

// @ts-ignore
const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

export default connect(
    mapStateToProps, actions
)(Register)