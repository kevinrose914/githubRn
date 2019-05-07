import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput, AsyncStorage} from 'react-native';
import { connect } from 'react-redux'
import DataStore from '../../expand/dao/DateStore'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
const KEY = 'save'
type Props = {};
class DataStoreDemoPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }
        this.dataStore = new DataStore()
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
                            this.loadData();
                        }}
                    >第1种设计模式获取数据</Text>
                </View>
                <View style={styles.row}>
                    <Text
                        onPress={() => {
                            this.loadData2();
                        }}
                    >第2种设计模式获取数据</Text>
                </View>
                <View style={styles.row}>
                    <Text
                        onPress={() => {
                            this.loadData3();
                        }}
                    >第3种设计模式获取数据</Text>
                </View>
                <Text style={styles.welcome}>{this.state.showText}</Text>
            </View>
        );
    }
    loadData() {
        const url = `https://api.github.com/search/repositories?q=${this.value}`
        this.dataStore.fetchData(url).then(res => {
            let showData = `初次数据加载时间: ${new Date(res.timestamp)}\n${JSON.stringify(res.data)}`
            this.setState({
                showText: showData
            })
        }).catch(err => {
            console.log(err.toString())
        })
    }
    loadData2() {
        const url = `https://api.github.com/search/repositories?q=${this.value}`
        this.dataStore.fetchDataMode2(url).then(res => {
            let showData = `初次数据加载时间: ${new Date(res.timestamp)}\n${JSON.stringify(res.data)}`
            this.setState({
                showText: showData
            })
        }).catch(err => {
            console.log(err.toString())
        })
    }
    loadData3() {
        const url = `https://api.github.com/search/repositories?q=${this.value}`
        this.dataStore.fetchDataMode3(url).then(res => {
            let showData = `初次数据加载时间: ${new Date(res.timestamp)}\n${JSON.stringify(res.data)}`
            this.setState({
                showText: showData
            })
        }).catch(err => {
            console.log(err.toString())
        })
    }
}
export default DataStoreDemoPage

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
