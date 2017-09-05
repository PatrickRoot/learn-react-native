import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Toast } from 'antd-mobile';

export default class App extends React.Component {
  showToast() {
    Toast.info('Button Clicked!', 1);
  }
  render() {
    return (
      <View style={styles.container}>
        <Button onClick={this.showToast.bind(this)}>Show Toast</Button>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
