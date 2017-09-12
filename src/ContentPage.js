import React from 'react';
import {
    TabBar,
} from 'antd-mobile';
import {
    addNavigationHelpers,
} from 'react-navigation';
import {connect} from 'react-redux';

import FirstNavigator from './navigators/FirstNavigator';
import {changeTab} from "./actions/Tab";


class ContentPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        const {dispatch} = this.props;
        const selectTab = this.props.selectTab;
        
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
                    selected={selectTab === 'firstTab'}
                    onPress={() => {
                        dispatch(changeTab("firstTab"))
                    }}
                    data-seed="logId"
                >
                    <FirstNavigator navigation={addNavigationHelpers({dispatch, state: this.props.NavFirstStore})}/>
                </TabBar.Item>
                <TabBar.Item
                    icon={require('./images/friend.png')}
                    selectedIcon={require('./images/friend_sel.png')}
                    title="朋友"
                    key="friends"
                    badge={2}
                    selected={selectTab === 'secondTab'}
                    onPress={() => {
                        dispatch(changeTab("secondTab"))
                    }}
                >
                    <FirstNavigator navigation={addNavigationHelpers({dispatch, state: this.props.NavSecondStore})}/>
                </TabBar.Item>
                <TabBar.Item
                    // icon={{uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'}}
                    // selectedIcon={{uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'}}
                    icon={require('./images/friend.png')}
                    selectedIcon={require('./images/friend_sel.png')}
                    title="我的"
                    key="my"
                    badge={'new'}
                    selected={selectTab === 'thirdTab'}
                    onPress={() => {
                        dispatch(changeTab("thirdTab"))
                    }}
                >
                    <FirstNavigator navigation={addNavigationHelpers({dispatch, state: this.props.NavThirdStore})}/>
                </TabBar.Item>
            </TabBar>
        );
    }
}

function select(store) {
    return {
        NavFirstStore: store.NavFirstStore,
        NavSecondStore: store.NavSecondStore,
        NavThirdStore: store.NavThirdStore,
        selectTab: store.TabStore.selectTab,
    }
}

export default connect(select)(ContentPage);