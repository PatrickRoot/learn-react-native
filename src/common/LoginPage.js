import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    Button,
    View,
    AsyncStorage
} from 'react-native';

const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        width: "100%",
        padding: 30,
        backgroundColor: '#ffffff',
    },
    loginInput: {
        height: 40,
        lineHeight: 40,
    }
});

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }
    
    onPressCallback() {
        var that = this;
        let formData = new FormData();
        formData.append("username", this.state.username);
        formData.append("password", this.state.password);
        
        var fetchOptions = {
            method: 'POST',
            headers: {
                'accessToken': '',
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
        var url = "https://testbid.zcjb.com.cn/api/mem/login.htm";
        // var url = "http://192.168.1.62:8000/api/mem/login.htm";
        
        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                var data = JSON.parse(responseText);
                if (data.errCode == 1) {
                    AsyncStorage.setItem("accessToken", data.accessToken, function (errs) {
                        if (errs) {
                            that.props.toastError("保存登录信息失败");
                        }
                    });
                    that.props.loginSuccess();
                } else {
                    that.props.toastError(data.errMsg);
                }
            }).done();
    }
    
    render() {
        //表单中必需的
        return (
            <View style={LoginStyles.loginview}>
                <View style={{
                    flexDirection: 'row', height: 100, marginTop: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                    <Image source={require('../../images/ebidding.png')}/>
                </View>
                <View style={{marginTop: 80}}>
                    <TextInput style={LoginStyles.loginInput}
                               placeholder="用户名/手机号"
                               onChangeText={(text) => this.setState({username: text})}
                               value={this.state.username}/>
                    <TextInput style={LoginStyles.loginInput}
                               secureTextEntry={true}
                               placeholder="密码"
                               onChangeText={(text) => this.setState({password: text})}
                               value={this.state.password}/>
                    <Button title='登录' onPress={this.onPressCallback.bind(this)}/>
                    {/*<Text style={{color: "#4A90E2", textAlign: 'center', marginTop: 10}}>忘记密码？</Text>*/}
                </View>
            </View>
        )
    }
}

export default LoginPage;