import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import NavigationBar from '../common/NavigationBar'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'

const THEME_COLOR = '#678'
const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class MyPage extends Component<Props> {
    render() {
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content'
        }
        let navigationBar = <NavigationBar
            title={'我的'}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
            rightButton={this.getRightButton()}
            leftButton={this.getLeftButton()}
        />
        return (
            <View style={styles.container}>
                {navigationBar}
                <Text style={styles.welcome}>MyPage</Text>
            </View>
        );
    }
    getRightButton() {
        return (
            <View
                style={{flexDirection: 'row'}}
            >
                <TouchableOpacity
                    onPress={() => {}}
                >
                    <View style={{padding: 5, marginRight: 8}}>
                        <Feather
                            name={'search'}
                            size={24}
                            style={{color: 'white'}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    getLeftButton() {
        return (
            <TouchableOpacity
                style={{padding: 8, marginLeft: 12}}
                onPress={() => {}}
            >
                <Ionicons
                    name={'ios-arrow-back'}
                    size={26}
                    style={{color: 'white'}}
                />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
