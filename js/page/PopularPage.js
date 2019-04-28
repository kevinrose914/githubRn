import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import NavigationUtil from '../navigator/navigationUtil';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.tabNames = ['java', 'ios', 'android', 'javascript', 'html', 'css']
    }
    _genTabs() {
        const tabs = {};
        this.tabNames.forEach(( item, index ) => {
            tabs[`tab${index}`] = {
                screen: (props) => { // 可以用这种方式传递参数
                    return (
                        <TopNav1 {...props} tabLabel={item} />
                    )
                },
                navigationOptions: {
                    title: item
                }
            }
        })
        return tabs
    }
    render() {
        const TopNav = this._topTabNav()
        return (
            <View style={{flex: 1, marginTop: 30}}>
                <TopNav />
            </View>
        );
    }
    _topTabNav() {
        return createAppContainer(createMaterialTopTabNavigator(this._genTabs(), {
            tabBarOptions: {
                tabStyle: styles.tabStyle,
                upperCaseLabel: false,
                scrollEnabled: true,
                style: {
                    backgroundColor: '#678'
                },
                indicatorStyle: styles.indicatorStyle,
                labelStyle: styles.labelStyle
            }
        }))
    }
}
class TopNav1 extends Component<props> {
    render() {
        const { tabLabel, navigation } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{tabLabel}</Text>
                <Text
                    onPress={() => {
                        NavigationUtil.goPage({
                        }, 'DetailPage')
                    }}
                >跳转到详情页</Text>
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
    tabStyle: {
        minWidth: 50
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: '#fff'
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6
    }
});
