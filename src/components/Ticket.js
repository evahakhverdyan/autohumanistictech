import React from 'react';
import { Content, Card, CardItem, Left, Body, Right, Badge, Button, H1 } from 'native-base';
import { StyleSheet, Dimensions, Text, Image } from 'react-native';
import { AUTO_AMO_URL } from '../config';

const { width } = Dimensions.get('window');

const Ticket = ({ ticket, state, selectAnswer, nextTicket, resetTicket, goToTopics }) => {
    const
        { currentTicket:
            {
                title, hint, answers, correct, image
            },
            currentTicketNumber,
            isFinalTicket,
            ticketsCount,
            correctAnswer,
            errorAnswer
        } = ticket;

    const hasImage = !(image.match(/no_image/gi));

    return (
        <Content padder>
            <Card style={styles.card}>
                <CardItem header bordered style={styles.cardItem}>
                    <Left style={{flex: 1.3}}>
                        <Button bordered info small style={styles.textButtonInfo} onPress={() => resetTicket()}>
                            <Text style={styles.buttonText}>Другие вопросы</Text>
                        </Button>
                    </Left>
                    <Body style={styles.answerNumber}>
                        <H1>{`${currentTicketNumber+1}/${ticketsCount}`}</H1>
                    </Body>
                    <Right style={styles.budge}>
                        <Badge success style={styles.correctAnswer} textStyle={{ color: 'white' }}>
                            <Text>{correctAnswer}</Text>
                        </Badge>
                        <Badge danger style={styles.errorAnswer} textStyle={{ color: 'white' }}>
                            <Text>{errorAnswer}</Text>
                        </Badge>
                    </Right>
                </CardItem>
                <CardItem bordered style={styles.cardItem}>
                    <Body style={{flex: 1}}>
                        {
                            hasImage && <Image source={{uri: `${AUTO_AMO_URL}/${image}`}} style={{height: 200,  alignSelf: 'stretch'}}/>
                        }
                        <Text style={{fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>{title}</Text>
                        <Text style={[Number(correct) === state.selectedAnswerId ? styles.correctText : styles.errorText,
                            {display: state.hasSelectedAnswer ? 'flex': 'none'}] }>
                            {Number(correct) === state.selectedAnswerId ? "Верно" : hint.trim()}
                        </Text>
                    </Body>
                </CardItem>
                {
                    answers.map((answer, index) => (
                        <CardItem key={index} bordered button disabled={state.hasSelectedAnswer} onPress={() => selectAnswer(index)}>
                            <Body>
                                <Text style={!state.cardItems[index] ? styles.textAnswer : Number(correct)  === index + 1 ? styles.correctCard : styles.errorCard }>{answer}</Text>
                            </Body>
                        </CardItem>
                    ))
                }
                <CardItem footer bordered style={{ width: '100%'}}>
                    {
                        isFinalTicket ?
                            <Button block disabled={state.buttonDisabled} onPress={() => goToTopics()} style={[styles.blockButton, !state.buttonDisabled && {backgroundColor: '#007bff'}]} >
                                <Text style={{color: '#fff'}}>Перейти к вопросам</Text>
                            </Button> :
                            <Button block disabled={state.buttonDisabled} onPress={() => nextTicket()} style={[styles.blockButton, !state.buttonDisabled && {backgroundColor: '#007bff'}]} >
                                <Text style={{color: '#fff'}}>Далее</Text>
                            </Button>
                    }
                </CardItem>
            </Card>
        </Content>
    )
}

export default Ticket;

const styles = StyleSheet.create({
    blockButton: {
        flex: 1,
        alignItems: 'center',
        color: '#fff',
        width: '100%'
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
        width: '100%',

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
    }
});
