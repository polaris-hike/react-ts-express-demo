import React, {PropsWithChildren} from "react";
import {RouteComponentProps} from 'react-router-dom'
import {Link, NavLink, withRouter} from "react-router-dom";
import './index.less';
import {
    ArrowLeftOutlined
} from '@ant-design/icons';

type Props = PropsWithChildren<{
    history:any
}>
function Nav(props: Props) {
    return (
        <nav className="nav-header">
            <ArrowLeftOutlined onClick={()=>props.history.goBack()}/>
            {props.children}
        </nav>
    )
}

export default Nav