import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    Button,
    View,
    AsyncStorage,
} from 'react-native';

class LoadingPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        };
    }
    
    render() {
        //表单中必需的
        return (
            <View style={styles.container}>
                <Text>这里是启动页</Text>
                <Text>放个有Big的图片</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

LoadingPage.checkLogin = function (callback) {
    AsyncStorage.getItem("accessToken", (error, result) => {
        if(!error){
            let formData = new FormData();
            formData.append("orderId", 1);
    
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
            var url = "https://testbid.zcjb.com.cn/api/mem/order/manage/viewOrder.htm";
            // var url = "http://192.168.1.62:8000/api/mem/order/manage/viewOrder.htm";
    
            fetch(url, fetchOptions)
                .then((response) => response.text())
                .then((responseText) => {
                    var data = JSON.parse(responseText);
                    if (data.errCode == 1 && data.errCode != 40000) {
                        callback(true);
                    } else {
                        callback(false);
                    }
                }).done();
        }else{
            callback(false);
        }
    });
};

export default LoadingPage;