import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux'
import AppNavigator from './navigator/AppNavigator'
import store from './store/index'

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
              <AppNavigator />
            </Provider>
        )
    }
}
