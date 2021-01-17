import React, {PropsWithChildren} from 'react';
import {RouteComponentProps} from "react-router-dom";
import {connect} from "react-redux";
import {CartItem, CartState, CombinedState, Lesson} from "@/types";
import actions from '@/store/actions/cart';
import {InputNumber, Table} from "antd";
import Nav from "@/components/Nav";

interface Params {
}
type Props = PropsWithChildren<RouteComponentProps<Params> & ReturnType<typeof mapStateToProps>>  &typeof actions;

function Cart(props:Props) {
    const columns = [
        {
            title: '商品',
            dataIndex: 'lesson',
            render: (val: Lesson, row: CartItem) => {
                return (
                    <>
                        <p>{val.title}</p>
                        <p>单价:{val.price}</p>
                    </>
                )
            }
        },
        {
            title: '数量',
            dataIndex: 'count',
            render: (val: number, row: CartItem) => {
                return (
                    <InputNumber
                        size="small"
                        min={1}
                        value={val}
                        onChange={(value)=> props.changeCartItemCount(row.lesson.id,value)}
                    />
                )
            }
        },
    ]
    return (
        <>
            <Nav history={props.history}>购物车</Nav>
            <Table
                columns={columns}
                dataSource={props.cart}
                pagination={false}
            />
        </>
    )
}

let mapStateToProps = (state:CombinedState):{cart:CartState} => ({cart:state.cart})

export default connect(
    mapStateToProps,
    actions
)(Cart)