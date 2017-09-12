import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

class LoadingPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {};
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

export default LoadingPage;