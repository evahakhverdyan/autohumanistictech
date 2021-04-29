import React, { useEffect } from 'react';
import { AUTO_AMO_URL } from '../../config'
import { WebView } from 'react-native-webview';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Dimensions, Text
} from 'react-native';

import { HeaderBackButton } from '@react-navigation/stack';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('screen');
const  LoadingIndicatorView = () => {

    return (
        <View style={styles.activityIndicatorStyle}>
            <ActivityIndicator
                color='#007bff'
                size='large'
            />
        </View>
    );

}
const Chat = ({ navigation }) => {

    useEffect(() => {
        navigation.setOptions({
            title: 'Поддержка',
            headerBackTitleVisible: false,
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => navigation.goBack()}
                />
            )
        });

    }, []);
    return (
        <View style={styles.centeredView}>
            <WebView
                style={{flex: 1, width:450, height:100}}
                scalesPageToFit
                javaScriptEnabled={true}
                bounces={false}
                startInLoadingState={true}
                renderLoading={LoadingIndicatorView}
                source={{uri: 'https://button.amocrm.ru/tdzrx' }}
            />
        </View>
        
    );
}

export default Chat;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent:"center",
        alignItems:"center"
    },
    activityIndicatorStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
