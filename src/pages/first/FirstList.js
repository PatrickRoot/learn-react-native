import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import OrderItem from "../../components/OrderItem";
import {getFirstListOrders} from "../../actions/FirstList";
import {NAV_1_DETAIL} from "../../constants/types";

class FirstList extends Component {
    static navigationOptions = {
        title: '订单列表',
    };
    
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    fetchData() {
        const {dispatch} = this.props;
        dispatch(getFirstListOrders());
    }
    
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(getFirstListOrders());
    }
    
    _onScroll(event) {
        const store = this.props.FirstListStore;
        if (store.isRefreshing) {
            return;
        }
        if (!store.hasNextPage) {
            return;
        }
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if (y + height >= contentHeight - 20) {
            const {dispatch} = this.props;
            dispatch(getFirstListOrders());
        }
    }
    
    pressOrder(item) {
        const {dispatch} = this.props;
        dispatch({
            type: NAV_1_DETAIL,
            order: item
        })
        // dispatch(NavigationActions.navigate({routeName: 'FirstDetail'}))
    }
    
    render() {
        const store = this.props.FirstListStore;
        
        //表单中必需的
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text>总订单数量：{store.data.length}/{store.totalRecords}</Text>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={store.isRefreshing}
                            onRefresh={this.fetchData.bind(this)}
                            tintColor="#ff0000"
                            title="加载中..."
                            titleColor="#00ff00"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffffff"
                        />
                    }
                    onScroll={this._onScroll.bind(this)}
                    scrollEventThrottle={50}
                >
                    {
                        store.data.map((item, index) => {
                            return <TouchableOpacity onPress={this.pressOrder.bind(this, item)} key={item.id}>
                                <OrderItem info={item}/>
                            </TouchableOpacity>;
                        })
                    }
                </ScrollView>
                {
                    store.isRefreshing ?
                        <View style={styles.more}>
                            <Text>加载中...</Text>
                        </View>
                        : null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "99%",
        flexDirection: 'column',
        borderBottomWidth: 1,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    more: {
        height: 50,
        justifyContent: 'center',
    },
});

function select(store) {
    return {
        FirstListStore: store.FirstListStore,
    }
}

export default connect(select)(FirstList);