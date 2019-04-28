import React, {Component} from 'react';
import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import NavigatorUtils from '../navigator/navigationUtil';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';


type Props = {};
class HomePage extends Component<Props> {
    constructor(props) {
        super(props)
        this.onBackPress = this.onBackPress.bind(this)
    }
    render() {
        return (
            <DynamicTabNavigator { ...this.props }/>
        )
    }
    /**
     * 处理安卓设备物理返回键的问题
     */
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
    }
    onBackPress() {
        const { dispatch, nav } = this.props
        if (nav.routes[1].index === 0) { // nav.routes[1]为Main
            return false
        }
        dispatch(NavigationActions.back())
        return true
    }
}
const mapStateToProps = state => {
    return {
        nav: state.nav
    }
}

export default connect(mapStateToProps)(HomePage)
