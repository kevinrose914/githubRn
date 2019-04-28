export default class NavigationUtil {
    /**
     * 返回上一页
     * @param {*} navigation 
     */
    static goToBack(navigation) {
        navigation.goBack();
    }
    /**
     * 重置到首页
     * @param {navigation} params 
     */
    static resetToHomePage(params) {
        const { navigation } = params
        navigation.navigate('Main')
    }
    /**
     * 跳转到指定页面
     * @param {*} params 
     * @param {*} page 
     */
    static goPage(params, page) {
        const navigation = NavigationUtil.navigation
        if (!navigation) {
            console.log('NavigationUtil.navigation can not be empty!')
            return
        }
        navigation.navigate(page, { ...params })
    }
}