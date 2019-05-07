import Types from '../../action/types'

const defaultState = {
}
/**state树
 * popular: {
 *      java: {
 *          items: [],
 *          isLoading: false
 *      },
 *      ios: {},
 *      ...
 * }
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
    switch(action.type) {
        case Types.POPULAR_REFRESH_SUCCESS:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items: action.items, // 原始数据
                    isLoading: false,
                    projectModes: action.projectModes, // 此次要展示的数据
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            }
        case Types.POPULAR_REFRESH:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true
                }
            }
        case Types.POPULAR_REFRESH_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false
                }
            }
        case Types.POPULAR_LOAD_MORE_SUCCESS: // 上拉加载成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: false,
                    projectModes: action.projectModes,
                    pageIndex: action.pageIndex
                }
            }
        case Types.POPULAR_LOAD_MORE_FAIL: // 上拉加载失败
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    error: action.error,
                    projectModes: action.projectModes,
                    pageIndex: action.pageIndex
                }
            }
        default: 
            return state
    }
}