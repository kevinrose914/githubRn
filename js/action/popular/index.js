import Types from '../types'
import DataStore, { FLAG_STORAGE } from '../../expand/dao/DateStore'
import { handleData } from '../ActionUtil'

/**
 * 获取最热数据
 * @param {*} theme 
 */
export function onLoadPopularData(storeName, url, pageSize) {
    return dispatch => {
        dispatch({
            type: Types.POPULAR_REFRESH,
            storeName
        })
        const dataStore = new DataStore()
        dataStore.fetchData(url, FLAG_STORAGE.flag_popular).then(data => {
            handleData(Types.POPULAR_REFRESH_SUCCESS, dispatch, storeName, data, pageSize)
        }).catch(error => {
            dispatch({
                type: Types.POPULAR_REFRESH_FAIL,
                storeName,
                error
            })
        })
    }
}
/**
 * 上拉加载更多
 * @param {*} storeName 
 * @param {*} pageIndex 
 * @param {*} pageSize 
 * @param {*} dataArray 
 */
export function onLoadMorePopular(storeName, pageIndex, pageSize, dataArray=[], callback) {
    return dispatch => {
        setTimeout(() => { // 模拟网络请求
            if ((pageIndex - 1) * pageSize >= dataArray.length) { // 上次已经加载完全部数据
                if (typeof callback === 'function') {
                    callback('no more')
                }
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_FAIL,
                    error: 'no more',
                    storeName,
                    pageIndex: --pageIndex,
                    projectModes: dataArray
                })
            } else {
                let max = pageSize * pageIndex > dataArray.length ? dataArray.length :  pageSize * pageIndex
                dispatch({
                    type: Types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes: dataArray.slice(0, max)
                })
            }
        }, 500)
    }
}