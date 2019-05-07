import { combineReducers } from 'redux'
import theme from './theme/index'
import popular from './popular/index'
import { rootCom, RootNavigator } from '../navigator/AppNavigator'
import { createNavigationReducer } from 'react-navigation-redux-helpers'

// 指定默认state
const navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootCom))
/**
 * 创建自己的navigation reducer
 * @param {*} state 
 * @param {*} action 
 */
const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state)
    return nextState || state
}
// const navReducer = createNavigationReducer(RootNavigator)
/**
 * 合并reducer
 */
const index = combineReducers({
    nav: navReducer,
    theme,
    popular
})

export default index