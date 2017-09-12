import React from 'react';
import {
    Provider,
} from 'react-redux';

import configureStore from './store/index';
import {checkLogin} from "./actions/User";

import LoadingPage from "./LoadingPage";
import LoginPage from "./LoginPage";
import ContentPage from './ContentPage';

globalStore = null;

export default class App extends React.Component {
    constructor(props) {
        super(props);
        let that = this;
        globalStore = configureStore(() => {
            that.setState({isLoading: false})
        });
        
        this.state = {
            isSplashing: true,
            isLoading: true
        }
    }
    
    componentDidMount() {
        globalStore.dispatch(checkLogin());
    }
    
    render() {
        let that = this;
        setTimeout(function () {
            that.setState({isSplashing: false});
        }, 1500);
        if (this.state.isLoading || globalStore.getState().UserStore.isChecking || this.state.isSplashing) {
            return <LoadingPage/>;
        }
        return (
            <Provider store={globalStore}>
                {
                    globalStore.getState().UserStore.isLoggedIn ?
                        <ContentPage/>
                        : <LoginPage/>
                }
            </Provider>
        );
    }
}