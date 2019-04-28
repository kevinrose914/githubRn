import {
    createStackNavigator,
    createMaterialTopTabNavigator,
    createBottomTabNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation'
import WelcomePage from '../page/welcome'
import HomePage from '../page/home'
import DetailPage from '../page/detail'
import FetchDemoPage from '../page/DemoPage/FetchDemoPage'
import AsyncDemoPage from '../page/DemoPage/AsyncDemoPage'
import { connect } from 'react-redux'
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers'

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    },
    FetchDemoPage: {
        screen: FetchDemoPage
    },
    AsyncDemoPage: {
        screen: AsyncDemoPage
    }
})

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    DetailPage: {
        screen: DetailPage,
        navigationOptions: {
            // header: null
        }
    }
})

export const RootNavigator = createAppContainer(createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator
}, {
    defaultNavigationOptions: {
        header: null
    }
}))

export const rootCom = 'Init' // 定义根路由

export const middleware = createReactNavigationReduxMiddleware(
    // 'root',
    state => state.nav
)

// const AppWithNavigationState = createReduxContainer(RootNavigator, 'root')
const AppWithNavigationState = createReduxContainer(RootNavigator)

const mapStateToProps = state => ({
    state: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)