import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducer/index'
import { middleware } from '../navigator/AppNavigator'

// 自定义日志中间件
const logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatching a function')
    } else {
        console.log('dispatching a object', action)
    }
    const result = next(action)
    console.log('nextState', store.getState())
}

const middlewares = [middleware, logger, thunk]
/**
 * 创建store
 */
export default createStore(reducers, applyMiddleware(...middlewares))