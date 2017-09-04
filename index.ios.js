/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    AlertIOS,
    View
} from 'react-native';
import LoginPage from "./src/common/LoginPage";
import LoadingPage from "./src/common/LoadingPage";
import ListPage from "./src/common/ListPage";

export default class LearnReactNative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            page: "",
        };
    }
    
    alertError(message) {
        AlertIOS.alert(message);
    }
    
    loginSuccess() {
        AlertIOS.alert("登录成功");
        this.setState({
            page: "list"
        });
    }
    
    goLogin(message) {
        AlertIOS.alert(message);
        this.setState({
            page: "login"
        });
    }
    
    componentDidMount(){
        var that = this;
        LoadingPage.checkLogin(function (isLogin) {
            if (isLogin) {
                that.setState({
                    page: "list"
                });
            } else {
                that.setState({
                    page: "login"
                });
            }
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.page === "login" ?
                        <LoginPage
                            loginSuccess={this.loginSuccess.bind(this)}
                            loginError={this.alertError.bind(this)}></LoginPage>
                        : null
                }
                {
                    this.state.page === "list" ?
                        <ListPage
                            goLogin={this.goLogin.bind(this)}
                            showError={this.alertError.bind(this)}></ListPage>
                        : null
                }
                {
                    this.state.page === "" ?
                        <LoadingPage />
                        : null
                }
            </View>
        );
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

AppRegistry.registerComponent('LearnReactNative', () => LearnReactNative);
