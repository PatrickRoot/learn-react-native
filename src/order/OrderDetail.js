import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {Result, Icon, WhiteSpace} from 'antd-mobile';

class OrderDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.order.orderCode,
    });
    
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const {order} = this.props.navigation.state.params;
        let orderStatus = order.orderStatus;
        return (
            <View>
                <WhiteSpace />
                {orderStatus === "1000" ?
                    <Result
                        imgUrl={require('../images/friend.png')}
                        title="下单成功，待支付"
                        message={`下单时间：${order.createTime}`}
                    />
                    : null}
                {orderStatus === "2000" ?
                    <Result
                        imgUrl={require('../images/friend.png')}
                        title="支付成功"
                        message={`支付时间：${order.payTime}`}
                    />
                    : null}
                {orderStatus === "3000" ?
                    <Result
                        imgUrl={require('../images/friend.png')}
                        title="订单取消"
                        message={`下单时间：${order.createTime}`}
                    />
                    : null}
            </View>
        )
    }
}

export default OrderDetail;