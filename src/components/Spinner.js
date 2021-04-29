import React from 'react';
import { Spinner } from 'native-base';
import { StyleSheet, View } from 'react-native';

const SpinnerBlue = () => {
    return (
        <View style={styles.spinner}>
            <Spinner color='#007bff' />
        </View>
    );
}

export default SpinnerBlue;

const styles = StyleSheet.create({
    spinner: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});

