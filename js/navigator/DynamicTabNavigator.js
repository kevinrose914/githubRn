import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import NavigationUtil from '../navigator/navigationUtil';
import { BottomTabBar } from 'react-navigation-tabs';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});
const TABS = {
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: '最热',
            tabBarIcon: ({ tintColor }) => {
                return (
                    <MaterialIcons
                        name={'whatshot'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: '趋势',
            tabBarIcon: ({ tintColor }) => {
                return (
                    <Ionicons
                        name={'md-trending-up'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        }
    },
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: '收藏',
            tabBarIcon: ({ tintColor }) => {
                return (
                    <MaterialIcons
                        name={'favorite'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => {
                return (
                    <Entypo
                        name={'user'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        }
    }
}
type Props = {};
class DynamicTabNavigator extends Component<Props> {
    constructor(props) {
        super(props)
        // console.disableYellowBox = true // 禁止黄色的警告弹框
    }
    render() {
        // 保存navigation，会在嵌套路由里面用
        NavigationUtil.navigation = this.props.navigation
        const Tab = this._tabNavigator()
        return (
            <Tab />
        )
    }
    _tabNavigator() {
        if (this.Tabs) { // 避免改变主题颜色时，重新路由初始化定位到首页
            return this.Tabs
        }
        const { PopularPage, TrendingPage, FavoritePage, MyPage } = TABS
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage}; // 根据需要定制显示的tab
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
            tabBarComponent: (props) => {
                return <TabBarComponent {...props} theme={this.props.theme}/>
            }
        }));
        // return createAppContainer(createBottomTabNavigator(tabs, {
        //     tabBarOptions: {
        //         activeTintColor: 'green'
        //     }
        // }));
    }
}
const mapStateToProps = state => {
    return {
        theme: state.theme.theme
    }
}
export default connect(mapStateToProps)(DynamicTabNavigator)

class TabBarComponent extends Component<Props> {
    constructor(props) {
        super(props)
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime()
        }
    }
    render() {
        const { navigation } = this.props
        const { state } = navigation
        const { routes, index } = state
        if (routes[index].params) {
            const { theme } = routes[index].params
            // 以最新的更新时间为主，防止被其他tab之前的更改所覆盖掉
            if (theme && theme.updateTime > this.theme.updateTime) {
                this.theme = theme
            }
        }
        return (
            <BottomTabBar 
                {...this.props}
                // activeTintColor={this.theme.tintColor || this.props.activeTintColor}
                activeTintColor={this.props.theme}
            />
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
});
