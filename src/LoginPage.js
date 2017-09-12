import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    Image,
    Button,
    View,
} from 'react-native';
import {connect} from 'react-redux';
import {logIn} from "./actions/User";
//将我们的页面和action链接起来

const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        const {dispatch} = this.props;
        dispatch(logIn({
            "username": this.state.username,
            "password": this.state.password,
        }))
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
                    <Image source={require('./images/ebidding.png')}/>
                </View>
                <View style={{
                    marginTop: 40,
                    width: "80%",
                }}>
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

function select(store) {
    return {
        isLoggedIn: store.UserStore.isLoggedIn,
    }
}

export default connect(select)(LoginPage);