import React from 'react';
import { StyleSheet, Dimensions, View, Linking } from 'react-native';
import { Body, Button, Card, CardItem, Right, Text } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PAYMENT_URL } from '../config';
import _ from 'lodash';

const { width } = Dimensions.get('window');

const renderAccordionContent = (content) => {
    return (
        _.map(content, (value, key) => (
            <View key={key}>
                <CardItem key={value}>
                    <Text style={{fontWeight: 'bold'}}>{key}</Text>
                </CardItem>
                <CardItem key={key}>
                    <Text>{value}</Text>
                </CardItem>
            </View>
        ))
    );
}

const renderAccordion = ({ fieldName, fieldValue }, index) => {
    const payment = fieldName === 'Остаток';
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Card key={index}>
            <CardItem key={fieldName} button onPress={() => setExpanded(!expanded)}>
                <Body style={styles.cardItemBody}>
                    <Text style={styles.fieldName}>{fieldName}</Text>
                </Body>
                <Right style={styles.cardItemRight}>
                    <MaterialCommunityIcons style={{ fontSize: 18 }} name={ expanded ? 'menu-up' : 'menu-down'} />
                </Right>
            </CardItem>
            { expanded && renderAccordionContent(fieldValue) }
        </Card>
    )
}

const goToPayment = () => {
    Linking.canOpenURL(PAYMENT_URL).then(supported => {
        if (supported) {
            Linking.openURL(PAYMENT_URL);
        } else {
            console.log('Не известный адрес : ' + PAYMENT_URL);
        }
    });
}

const renderCard = ({ fieldName, fieldValue }, index) => {
    return (
        <Card key={index}>
            <CardItem>
                <Text style={styles.fieldName}>{fieldName}</Text>
                <Text>{fieldValue}</Text>
            </CardItem>
        </Card>
    )
}

const UserInfo = ({ userData, index }) => {
    return (
        _.isObject(userData.fieldValue)
            ? renderAccordion(userData, index)
            : renderCard(userData, index)
    );
}
export default UserInfo;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: '#fff',
        width: width
    },
    cardItemBody: {
        flex: 0.95,
        fontWeight: 'bold',
        flexDirection: 'row'
    },
    cardItemRight: {
        flex: 0.05
    },
    fieldName: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        width: width,
        fontWeight: 'bold'
    },
    accordionView: {
        flex: 1,
        width: width,
    },
    buttonPayment: {
        flex: 1,
        padding: 10,
        marginBottom: 10,
        color: '#fff'
    }
});
