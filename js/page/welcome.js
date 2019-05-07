import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import NavigationUtil from '../navigator/navigationUtil'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class WelcomePage extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>WelcomePage</Text>
                {/* <Button
                    title={'跳转到fetch demo页面'}
                    onPress={() => {
                        NavigationUtil.navigation = this.props.navigation
                        NavigationUtil.goPage({}, 'FetchDemoPage')
                    }}
                />
                <Button
                    title={'跳转到async storage demo页面'}
                    onPress={() => {
                        NavigationUtil.navigation = this.props.navigation
                        NavigationUtil.goPage({}, 'AsyncDemoPage')
                    }}
                />
                <Button
                    title={'跳转到data store demo页面'}
                    onPress={() => {
                        NavigationUtil.navigation = this.props.navigation
                        NavigationUtil.goPage({}, 'DataStoreDemoPage')
                    }}
                />
                <Button
                    title={'跳转到home页面'}
                    onPress={() => {
                        NavigationUtil.navigation = this.props.navigation
                        NavigationUtil.goPage({}, 'Main')
                    }}
                /> */}
            </View>
        );
    }
    componentDidMount() {
        this.timer = setTimeout(() => {
            NavigationUtil.resetToHomePage({
                navigation: this.props.navigation
            })
        }, 200)
    }
    componentWillUnmount() {
        this.timer && clearTimeout(this.timer)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
