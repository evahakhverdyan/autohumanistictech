import React from 'react';
import { Content, Card, CardItem, Body, Button } from 'native-base';
import { StyleSheet, Dimensions, Text, Image } from 'react-native';
import { AUTO_AMO_URL } from '../config';

const { width } = Dimensions.get('window');

const MyErrors = ({ myErrors, nextTicket, resetErrorTicket }) => {
    console.log('myErrors', myErrors);
    const
        { currentTicket:
            {
                title, hint, answers, correct, image, answerId
            },
            isFinalTicket
        } = myErrors;

    const hasImage = image && !(image.match(/no_image/gi));
    return (
        <Content padder>
            <Card style={styles.card}>
                <CardItem bordered style={styles.cardItem}>
                    <Body style={{flex: 1}}>
                        {
                            hasImage && <Image source={{uri: `${AUTO_AMO_URL}/${image}`}} style={{height: 200,  alignSelf: 'stretch'}}/>
                        }
                        <Text style={{fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>{title}</Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>Ваш ответ</Text>
                        <Text style={styles.errorText}>{answers[answerId-1]}</Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>Пояснения</Text>
                        <Text style={styles.explainText }>{hint}</Text>
                    </Body>
                </CardItem>
                <CardItem bordered>
                    <Body>
                        <Text>Правильный ответ</Text>
                        <Text style={styles.correctText }>{answers[correct-1]}</Text>

                    </Body>
                </CardItem>
                <CardItem footer bordered style={{ width: '100%'}}>
                    {
                        isFinalTicket ?
                            <Button block style={styles.blockButton} onPress={() => resetErrorTicket()} >
                                <Text style={{color: '#fff'}}>Вернуться</Text>
                            </Button> :
                            <Button block onPress={() => nextTicket()} style={styles.blockButton} >
                                <Text style={{color: '#fff'}}>Далее</Text>
                            </Button>
                    }
                </CardItem>
            </Card>
        </Content>
    )
}

export default MyErrors;

const styles = StyleSheet.create({
    blockButton: {
        flex: 1,
        alignItems: 'center',
        color: '#fff',
        width: '100%',
        backgroundColor: '#007bff'
    },
    card: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 1
    },
    answerNumber: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    budge: {
        flex: 1,
        flexDirection: 'row'
    },
    buttonText: {
        position: 'absolute',
        fontSize: 0.024*width,
    },
    cardItem: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    textBadge: {
        color: '#fff'
    },
    textButtonInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textAnswer: {
        color: '#000'
    },
    errorAnswer: {
        flex: 1,
        alignItems: 'center',
        height: 30,

    },
    correctAnswer: {
        flex: 1,
        alignItems: 'center',
        height: 30,
    },
    alert: {
        paddingLeft: 0.75,
    },
    errorText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8,
        color: '#000',
        backgroundColor: '#d9534f',
        borderColor: '#f5c6cb',
        borderRadius: 4,
        borderWidth: 1,
        width: '100%'
    },
    correctText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8,
        color: '#000',
        backgroundColor: '#5cb85c',
        borderColor: '#c3e6cb',
        borderRadius: 0.25,
        borderWidth: 1,
        width: '100%'
    },
    explainText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
        paddingBottom: 8,
        color: '#000',
        backgroundColor: '#ffc107',
        borderColor: '#c3e6cb',
        borderRadius: 0.25,
        borderWidth: 1,
        width: '100%'
    },
    cardActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
    },
    textActive: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
    },
    correctCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#5cb85c',
        fontWeight: 'bold'
    },
    errorCard: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#d9534f',
        fontWeight: 'bold'
    },

});
