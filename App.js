import React, { Component } from 'react';
import Main from './src/screens/Main';
import { Provider } from 'react-redux';
import { store } from './src/redux/reducers';
import {Text } from 'react-native';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        );
    }
}
