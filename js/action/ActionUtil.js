export function handleData(type, dispatch, storeName, data, pageSize) {
    let fixItems = []
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items
        }
    }
    dispatch({
        type,
        items: fixItems,
        storeName,
        projectModes: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), // 第一次加载
        pageIndex: 1
    })
}