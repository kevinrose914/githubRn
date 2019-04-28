import { AsyncStorage } from 'react-native'

export default class DataStore {
    /**
     * 校验时间戳是否过期
     * @param {*} timestamp 
     */
    static checkTimestampValid(timestamp) {
        // 这里是不能超过4个小时
        const currentDate = new Date()
        const targetDate = new Date()
        targetDate.setTime(timestamp)
        if (currentDate.getFullYear() !== targetDate.getFullYear()) {
            return false
        }
        if (currentDate.getMonth() !== targetDate.getMonth()) {
            return false
        }
        if (currentDate.getDate() !== targetDate.getDate()) {
            return false
        }
        if ((currentDate.getHours() - targetDate.getHours()) > 4) {
            return false
        }
        return true
    }
    /**
     * 保存数据到本地
     * @param {*} url 
     * @param {*} data 
     * @param {*} callback 
     */
    saveData(url, data, callback) {
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback)
    }
    /**
     * 将数据包装，增加时间戳
     * @param {*} data 
     */
    _wrapData(data) {
        return {
            data,
            timestamp: new Date().getTime()
        }
    }
    /**
     * 获取本地的数据
     * @param {*} url 
     */
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(e)
                        console.error(e)
                    }
                } else {
                    reject(error)
                    console.error(error)
                }
            })
        })
    }
    /**
     * 获取网络的数据
     * @param {*} url 
     */
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url).then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error('Network response was not ok.')
            }).then(res => {
                // 保存到本地
                this.saveData(url, res)
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    }
    /**
     * 离线缓存设计的第一种模式的数据获取方法
     * @param {*} url 
     */
    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then(wrapData => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData)
                } else {
                    this.fetchNetData(url).then(data => {
                        resolve(this._wrapData(data))
                    }).catch(error => {
                        reject(error)
                    })
                }
            }).catch(err => {
                this.fetchNetData(url).then(data => {
                    resolve(this._wrapData(data))
                }).catch(error => {
                    reject(error)
                })
            })
        })
    }
}