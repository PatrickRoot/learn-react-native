import React from 'react';
import {
    StyleSheet,
    View,
    Platform,
} from 'react-native';
import {
    Toast,
} from 'antd-mobile';
import LoadingPage from "./src/LoadingPage";
import LoginPage from "./src/LoginPage";
import ContentPage from "./src/ContentPage";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "",
        };
    }
    
    componentDidMount() {
        var that = this;
        LoadingPage.checkLogin(function (isLogin) {
            that.setState({
                page: isLogin ? "content" : "login"
            });
        });
    }
    
    loginSuccess() {
        Toast.success('登录成功', 1);
        this.setState({
            page: "content"
        });
    }
    
    go2Login(){
        this.setState({
            page: "login"
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
                    this.state.page === "content" ?
                        <ContentPage />
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
        ...Platform.select({
            ios: {
                paddingTop: 20
            },
        }),
    },
});