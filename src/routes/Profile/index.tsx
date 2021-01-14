import React, {PropsWithChildren, useEffect, useState} from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';
import {CombinedState, LOGIN_TYPE, ProfileState} from '@/types/state';
import mapDispatchToProps from '@/store/actions/profile';
import Nav from '@/components/Nav';
import {Alert, Button, Descriptions, Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons/lib';
import './index.less';
import {RcFile, UploadChangeParam} from 'antd/lib/upload';

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>;

function Profile(props: Props) {
  const [loading, setLoading] = useState(false);
  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (value: string) => {
          setLoading(false);
        console.log('info.file.response.data');
        console.log(info.file.response.data);
        props.setAvatar(info.file.response.data);
        }
      );
    }
  };
  useEffect(() => {
    props.validate();
  }, []);
  let content;
  if (props.loginState === LOGIN_TYPE.UN_VALIDATE) {
    content = null;
  } else if (props.loginState === LOGIN_TYPE.LOGINED) {
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined/> : <PlusOutlined/>}
        <div style={{marginTop: 8}}>Upload</div>
      </div>
    );
    console.log('props.user.advatar');
    console.log(props.user.avatar);
    content = (
      <div className="user-info">
        <Descriptions title="当前用户">
          <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
          <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
          <Descriptions.Item label="头像">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              data={{userId: props.user.id}}
              action="http://localhost:8003/user/uploadAvatar"
              onChange={handleChange}
            >
              {props.user.avatar ? <img src={props.user.avatar} alt="avatar" style={{width: '100%'}}/> : uploadButton}
            </Upload>
          </Descriptions.Item>
        </Descriptions>
        <Button type="primary" danger onClick={() => props.logout()}>退出</Button>
      </div>
    );
  } else {
    content = (
      <>
        <Alert type="warning" message="未登录" description="亲爱的用户你好，你尚未登录，请你注册或者登录"/>
        <div style={{textAlign: 'center', padding: '.5rem'}}>
          <Button type="dashed" onClick={() => props.history.push('/login')}>登录</Button>
          <Button type="dashed" onClick={() => props.history.push('/register')}>注册</Button>
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

function beforeUpload(file: RcFile) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    return message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    return message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const mapStateToProps = (state: CombinedState): ProfileState => state.profile;

export default connect(mapStateToProps, mapDispatchToProps)(Profile);