import React from 'react';
import {
    StyleSheet,
    Text,
    Platform,
} from 'react-native';

import {
    TabBar,
} from 'antd-mobile';

import ListPage from './order/ListPage';
import OrderDetail from "./order/OrderDetail";

import FriendsScreen from './friends/FriendsScreen';
import MyScreen from './my/MyScreen';

import {StackNavigator} from 'react-navigation';

const ListPageNavigator = StackNavigator({
    ListPage: {
        screen: ListPage,
    },
    OrderDetail: {
        screen: OrderDetail,
    },
},{
    initialRouteParams:{
        goLogin:function (msg) {
            alert(msg)
        }
    }
});

export default class ContentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'blueTab',
            hidden: false,
        };
    }
    
    componentDidMount() {
    }
    
    renderContent(pageText) {
        if (pageText == "order") {
            return <ListPage/>;
        } else if (pageText == "friends") {
            return <FriendsScreen/>;
        } else if (pageText == "my") {
            return <MyScreen/>;
        } else {
            return <Text>未找到:{pageText}</Text>;
        }
    }
    
    render() {
        return (
            <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
            >
                <TabBar.Item
                    title="订单"
                    key="order"
                    // icon={<Image source={require('./images/vip.jpg')}/>}
                    // selectedIcon={<Image source={require('./images/ca.jpg')}/>}
                    icon={require('./images/friend.png')}
                    selectedIcon={require('./images/friend_sel.png')}
                    
                    selected={this.state.selectedTab === 'blueTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'blueTab',
                        });
                    }}
                    data-seed="logId"
                >
                    <ListPageNavigator />
                </TabBar.Item>
                <TabBar.Item
                    icon={require('./images/friend.png')}
                    selectedIcon={require('./images/friend_sel.png')}
                    title="朋友"
                    key="friends"
                    badge={2}
                    selected={this.state.selectedTab === 'greenTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'greenTab',
                        });
                    }}
                >
                    {this.renderContent('friends')}
                </TabBar.Item>
                <TabBar.Item
                    // icon={{uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}}
                    // selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                    icon={require('./images/friend.png')}
                    selectedIcon={require('./images/friend_sel.png')}
                    title="我的"
                    key="my"
                    badge={'new'}
                    selected={this.state.selectedTab === 'yellowTab'}
                    onPress={() => {
                        this.setState({
                            selectedTab: 'yellowTab',
                        });
                    }}
                >
                    {this.renderContent('my')}
                </TabBar.Item>
            </TabBar>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        ...Platform.select({
            ios: {
                paddingTop: 20
            },
        }),
    },
});
