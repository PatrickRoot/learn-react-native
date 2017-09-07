import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
} from 'react-native';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        let order = this.props.info;
        let orderType = order.orderType;
        let img = <Image style={styles.img} source={require('../images/ebidding.png')}/>;
        if (orderType == "1000") {
            orderType = "投标培训";
            img = <Image style={styles.img} source={require('../images/btc.jpg')}/>
        } else if (orderType == "2000") {
            orderType = "商机订阅";
            img = <Image style={styles.img} source={require('../images/bos.png')}/>
        } else if (orderType == "3000") {
            orderType = "会员专区";
            img = <Image style={styles.img} source={require('../images/vip.jpg')}/>
        } else if (orderType == "4000") {
            orderType = "投标学苑";
            img = <Image style={styles.img} source={require('../images/other.jpg')}/>
        } else if (orderType == "6000") {
            orderType = "CA 订单";
            img = <Image style={styles.img} source={require('../images/ca.jpg')}/>
        } else if (orderType == "9000") {
            orderType = "标点订单";
            img = <Image style={styles.img} source={require('../images/other.jpg')}/>
        }else{
            orderType = "其他";
            img = <Image style={styles.img} source={require('../images/other.jpg')}/>
        }
        
        let orderStatus = order.orderStatus;
        if (orderStatus == "1000") {
            orderStatus = <Text style={styles.red}>待支付</Text>;
        } else if (orderStatus == "2000") {
            orderStatus = <Text style={styles.green}>已支付</Text>;
        } else if (orderStatus == "3000") {
            orderStatus = "已取消";
        } else {
            orderStatus = "未知状态";
        }
        
        return (
            <View style={styles.container}>
                {img}
                <View style={styles.textContainer}>
                    <View style={styles.orderBar}>
                        <Text> [{orderType}] {order.orderCode}</Text>
                        <Text> {order.createTime}</Text>
                    </View>
                    <Text> 金额：{order.totalAmount} 元</Text>
                    <Text> 状态：{orderStatus}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 5,
        borderBottomWidth: 1 ,
        borderBottomColor: '#abc',
        backgroundColor: '#F5FCFF',
    },
    img: {
        width: 55,
        height: 55,
    },
    textContainer:{
        flexGrow: 1,
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    orderBar: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    green: {
        color: "#99cc55"
    },
    red: {
        color: "#cc3366"
    }
});

export default Order;