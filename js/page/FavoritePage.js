import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { connect } from 'react-redux'
import actions from '../action/index' 

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

type Props = {};
class FavoritePage extends Component<Props> {
    render() {
        const { navigation } = this.props
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>FavoritePage</Text>
                <Button
                    title="改变主题颜色"
                    onPress={() => {
                        this.props.onThemeChange('#206')
                    }}
                ></Button>
            </View>
        );
    }
}
const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => {
    return {
        onThemeChange: theme => dispatch(actions.onThemeChange(theme))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(FavoritePage)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
