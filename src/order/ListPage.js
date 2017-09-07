import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    AsyncStorage
} from 'react-native';
import Order from "./Order";
import {Toast} from 'antd-mobile';

class ListPage extends Component {
    static navigationOptions = {
        title: '订单列表',
    };
    
    constructor(props) {
        super(props);
        this.state = {
            hasNextPage: true,
            totalRecords: 0,
            passSize: 20,
            pageNo: 0,
            data:[],
            isRefreshing:true,
            loadMore:true,
        };
    }
    
    componentDidMount(){
        this.fetchData.apply(this);
    }
    
    fetchData(){
        let that = this;
        if(this.state.hasNextPage){
            AsyncStorage.getItem("accessToken", (error, result) => {
                if (!error) {
                    let formData = new FormData();
                    formData.append("pageNo", that.state.pageNo+1);
                    formData.append("pageSize", that.state.passSize);
            
                    var fetchOptions = {
                        method: 'POST',
                        headers: {
                            'accessToken': result,
                            'client': 'mobile',
                            'version': '0.0.1',
                            'deviceId': '1234567890',
                            'latitude': '123',
                            'longitude': '101',
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                        body: formData
                    };
                    var url = "https://testbid.zcjb.com.cn/api/mem/order/manage/queryOrder.htm";
                    // var url = "http://192.168.1.78:8000/api/mem/order/manage/queryOrder.htm";
            
                    fetch(url, fetchOptions)
                        .then((response) => response.text())
                        .then((responseText) => {
                            var data = JSON.parse(responseText);
                            if (data.errCode == 1) {
                                if (data.errCode == 40000) {
                                    that.props.goLogin("未登录");
                                } else {
                                    let pageNo = data.pageInfo.pageNo;
                                    let totalPages = data.pageInfo.totalPages;
                                    let hasNextPage = true;
                                    if (pageNo == totalPages) {
                                        hasNextPage = false;
                                    }
                                    let oldData = that.state.data;
                                    let newData = data.memInfoLinkList;
                                    if (newData && newData.length > 0) {
                                        // for (let obj of newData) {
                                        //     obj.key = obj.orderCode;
                                        // }
                                        oldData.push.apply(oldData, newData);
                                    }
                            
                                    that.setState({
                                        hasNextPage: hasNextPage,
                                        totalRecords: data.pageInfo.totalRecords,
                                        pageSize: data.pageInfo.pageSize,
                                        pageNo: data.pageInfo.pageNo,
                                        data: oldData,
                                        isRefreshing: false,
                                        loadMore: false,
                                    })
                                }
                            } else {
                                that.setState({
                                    isRefreshing: false,
                                    loadMore: false,
                                });
                                Toast.fail("请求数据失败", 1);
                            }
                        }).done();
                } else {
                    that.setState({
                        isRefreshing: false,
                        loadMore: false,
                    });
                    Toast.fail("状态失效", 1);
                }
            });
        }else{
            that.setState({
                isRefreshing: false,
                loadMore: false,
            });
            Toast.info("没有更多数据了",1);
        }
    }
    
    _onScroll(event) {
        if (this.state.loadMore || this.state.isRefreshing) {
            return;
        }
        if (!this.state.hasNextPage) {
            // Toast.info("没有更多数据了", 1);
            return;
        }
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if (y + height >= contentHeight - 20) {
            this.setState({
                loadMore: true,
            });
            this.fetchData.apply(this);
        }
    }
    
    onPressCallback(){
        let that = this;
        const {goLogin} = this.props.navigation.state.params;
        AsyncStorage.removeItem("accessToken",function (error) {
            if(error){
                Toast.fail("退出失败", 1);
            }else{
                Toast.success("退出成功", 1);
                goLogin("退出成功");
            }
        });
    }
    
    pressOrder(item){
        const {navigate} = this.props.navigation;
        navigate('OrderDetail', {order: item});
    }
    
    render() {
        //表单中必需的
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Text>总订单数量：{this.state.data.length}/{this.state.totalRecords}</Text>
                    <Button title='退出' onPress={this.onPressCallback.bind(this)}/>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
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
                        this.state.data.map((item, index) => {
                            return <TouchableOpacity onPress={this.pressOrder.bind(this,item)} key={item.id}>
                                <Order info={item}/>
                            </TouchableOpacity>;
                        })
                    }
                </ScrollView>
                {
                    this.state.loadMore ?
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

export default ListPage;