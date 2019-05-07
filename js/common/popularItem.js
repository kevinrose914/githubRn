import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default class PopularItem extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const { item } = this.props
        if (!item || !item.owner) {
            return null
        }
        let favortieButton = (
            <TouchableOpacity
                style={{padding: 6}}
                onPress={() => {

                }}
                underlayColor={'transparent'} // 按下去的颜色
            >
                <FontAwesome
                    name="star-o"
                    size={26}
                    style={{color: 'red'}}
                />
            </TouchableOpacity>
        )
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.onSelect()
                }}
            >
                <View style={styles.cell_container}>
                    <Text style={styles.title}>{item.full_name}</Text>
                    <Text style={styles.desc}>{item.description}</Text>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>Author:</Text>
                            <Image
                                style={{height: 22, width: 22}}
                                source={{uri: item.owner.avatar_url}}
                            />
                        </View>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                            <Text>Star:</Text>
                            <Text>{item.stargazers_count}</Text>
                        </View>
                        {favortieButton}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#ddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray', // ios设置阴影
        shadowOffset: {width: 0.5, height: 0.5},
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2 // 安卓设置阴影
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        marginBottom: 2,
        color: '#212121'
    },
    desc: {
        fontSize: 14,
        marginBottom: 2,
        color: '#757575'
    }
})