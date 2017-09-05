import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Toast} from 'antd-mobile';
import LoginPage from "./src/LoginPage";
import LoadingPage from "./src/LoadingPage";
import ListPage from "./src/ListPage";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            page: "",
        };
    }
    
    toastError(message) {
        Toast.fail(message, 1);
    }
    
    loginSuccess() {
        Toast.success('登录成功', 1);
        this.setState({
            page: "list"
        });
    }
    
    goLogin(message) {
        Toast.info(message, 1);
        this.setState({
            page: "login"
        });
    }
    
    componentDidMount() {
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
                            loginSuccess={this.loginSuccess.bind(this)}></LoginPage>
                        : null
                }
                {
                    this.state.page === "list" ?
                        <ListPage
                            goLogin={this.goLogin.bind(this)}></ListPage>
                        : null
                }
                {
                    this.state.page === "" ?
                        <LoadingPage/>
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
