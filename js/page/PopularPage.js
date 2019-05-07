import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import actions from '../action/index'
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import NavigationUtil from '../navigator/navigationUtil';
import PopularItem from '../common/popularItem'
import Toast from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'

const URL = 'https://api.github.com/search/repositories?q='
const QUERY_STR = '&sort=stars'
const THEME_COLOR = '#678'
const PAGE_SIZE = 10

type Props = {};
export default class PopularPage extends Component<Props> {
    constructor(props) {
        super(props)
        this.tabNames = ['java', 'ios', 'android', 'javascript', 'html', 'css']
    }
    componentDidMount() {
        console.log('popular page mounted')
    }
    _genTabs() {
        const tabs = {};
        this.tabNames.forEach(( item, index ) => {
            tabs[`tab${index}`] = {
                screen: (props) => { // 可以用这种方式传递参数
                    return (
                        <PopularTabComponent {...props} tabLabel={item} />
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
        let statusBar = {
            backgroundColor: THEME_COLOR,
            barStyle: 'light-content',
        }
        // 顶部状态栏
        let navigationBar = <NavigationBar 
            title={'最热'}
            statusBar={statusBar}
            style={{backgroundColor: THEME_COLOR}}
        />
        const TopNav = this._topTabNav()
        return (
            <View style={{flex: 1}}>
                {navigationBar}
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
class PopularTab extends Component<props> {
    constructor(props) {
        super(props)
        const { tabLabel } = this.props
        this.storeName = tabLabel
    }

    componentDidMount() {
        console.log('component did mount')
        this.loadData()
    }

    loadData(isLoadMore) {
        const { onLoadPopularData, onLoadMorePopular } = this.props
        const url = this.genFetchUrl(this.storeName)
        let store = this._store()
        debugger;
        if (isLoadMore) {
            onLoadMorePopular(this.storeName, ++store.pageIndex, PAGE_SIZE, store.items, () => {
                console.log('没有更多了')
                this.refs.toast.show('没有更多了')
            })
        } else {
            onLoadPopularData(this.storeName, url, PAGE_SIZE)
        }
    }

    genFetchUrl(key) {
        return URL + key + QUERY_STR
    }

    _store() {
        const { popular } = this.props
        let store = popular[this.storeName]
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModes: [],
                hideLoadingMore: true
            }
        }
        return store
    }

    render() {
        const { tabLabel, navigation } = this.props
        const { popular } = this.props
        let store = this._store()
        return (
            <View style={styles.container}>
                <FlatList
                    data={store.projectModes}
                    renderItem={data => this.renderItem(data)}
                    key={({item}) => item.id}
                    refreshControl={
                        <RefreshControl
                            title={"Loading"}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                    ListFooterComponent={() => {// 定义上拉刷新的控件
                        return this.genIndicator()
                    }} 
                    onEndReached={() => {
                        // 这儿用一个开关，主要是滑动到底部，会调用两次这个函数，造成性能问题
                        // settimeout确保该回调函数是在onMomentumScrollBegin之后执行
                        setTimeout(() => {
                            if (this.canLoadMore) {
                                debugger;
                                this.canLoadMore = false
                                this.loadData(true)
                            }
                        }, 100)
                    }}
                    onEndReachedThreshold={0.5}
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true
                    }}
                />
                <Toast
                    ref={'toast'}
                    position={'center'}
                />
            </View>
        )
    }

    renderItem(data) {
        const { item } = data
        return <PopularItem
            item={item}
            onSelect={() => {

            }}
        />
    }

    genIndicator() {
        return this._store().hideLoadingMore ? null : (
            <View style={styles.indicatorC}>
                <ActivityIndicator
                    style={styles.indicator}
                    size={'large'}
                    color={'red'}
                    animating={true}
                />
                <Text>正在加载更多</Text>
            </View>
        )
    }
}
const mapStateToProps = state => ({
    popular: state.popular
})
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url, pageSize) => dispatch(actions.onLoadPopularData(storeName, url, pageSize)),
    onLoadMorePopular: (storeName, pageIndex, pageSize, dataArray, callback) => {
        dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, dataArray, callback))
    }
})
const PopularTabComponent = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
    },
    indicatorC: {
        alignItems: 'center'
    },
    indicator: {
        margin: 10
    }
});
