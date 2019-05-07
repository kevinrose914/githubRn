import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { connect } from 'react-redux'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
class FetchDemoPage extends Component<Props> {
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
                <Text style={styles.welcome}>FetchDemoPage</Text>
                <View style={styles.row}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => {
                            this.searchKey = text
                        }}
                    />
                    <Button
                        title="获取"
                        onPress={() => {
                            this.loadData2();
                        }}
                    />
                </View>
                <Text style={styles.welcome}>{this.state.showText}</Text>
            </View>
        );
    }
    loadData() {
        const url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url).then(res => res.text()).then(resStr => {
            this.setState({
                showText: resStr
            })
        })
    }
    loadData2() {
        const url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url).then(res => {
            console.log('fetch success', res)
            if (res.ok) {
                return res.text()
            }
            throw new Error('response is not ok.')
        }).then(resStr => {
            this.setState({
                showText: resStr
            })
        }).catch(err => {
            this.setState({
                showText: err.toString()
            })
        })
    }
}
export default FetchDemoPage

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
