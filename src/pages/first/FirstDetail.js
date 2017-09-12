import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {connect} from 'react-redux';
import {Result, WhiteSpace} from 'antd-mobile';

class FirstDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: "编号"+navigation.state.params.order.orderCode,
    });
    
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    // componentWillUnmount() {
    //     const {order1} = this.props.navigation.state.params;
    //     order1.test();
    // }
    
    render() {
        const {order} = this.props.navigation.state.params;
        let orderStatus = order.orderStatus;
        return (
            <View>
                <WhiteSpace/>
                {orderStatus === "1000" ?
                    <Result
                        imgUrl={require('../../images/friend.png')}
                        title="下单成功，待支付"
                        message={`下单时间：${order.createTime}`}
                    />
                    : null}
                {orderStatus === "2000" ?
                    <Result
                        imgUrl={require('../../images/friend.png')}
                        title="支付成功"
                        message={`支付时间：${order.payTime}`}
                    />
                    : null}
                {orderStatus === "3000" ?
                    <Result
                        imgUrl={require('../../images/friend.png')}
                        title="订单取消"
                        message={`下单时间：${order.createTime}`}
                    />
                    : null}
            </View>
        )
    }
}

function select(store) {
    return {}
}

export default connect(select)(FirstDetail);