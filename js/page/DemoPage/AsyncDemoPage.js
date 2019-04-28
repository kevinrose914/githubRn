import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, AsyncStorage} from 'react-native';
import { connect } from 'react-redux'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
const KEY = 'save'
type Props = {};
class AsyncDemoPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }
    }
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>AsyncDemoPage</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => {
                            this.value = text
                        }}
                    />
                </View>
                <View style={styles.row}>
                    <Text
                        onPress={() => {
                            this.doSave();
                        }}
                    >存储</Text>
                    <Text
                        onPress={() => {
                            this.doRemove();
                        }}
                    >删除</Text>
                    <Text
                        onPress={() => {
                            this.doGet();
                        }}
                    >获取</Text>
                </View>
                <Text style={styles.welcome}>{this.state.showText}</Text>
            </View>
        );
    }
    doSave() {
        AsyncStorage.setItem(KEY, this.value)
    }
    doRemove() {
        AsyncStorage.removeItem(KEY)
    }
    doGet() {
        AsyncStorage.getItem(KEY, (err, data) => {
            if (!err) {
                this.setState({
                    showText: data
                })
            }
        })
    }
}
export default AsyncDemoPage

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
    input: {
        lineHeight: 30,
        height: 30,
        padding: 0,
        flex: 1,
        borderColor: '#000',
        borderWidth: 1,
    },
    row: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
