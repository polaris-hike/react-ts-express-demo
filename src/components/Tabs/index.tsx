import React from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import './index.less';
import {
    HomeOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';

interface Props {

}

function Tabs(props: Props) {
    return (
        <footer>
            <NavLink exact to="/"><HomeOutlined /><span>首页</span></NavLink>
            <NavLink exact to="/cart"><ShoppingCartOutlined /><span>购物车</span></NavLink>
            <NavLink exact to="/profile"><UserOutlined /><span>个人中心</span> </NavLink>
        </footer>
    )
}

export default Tabs