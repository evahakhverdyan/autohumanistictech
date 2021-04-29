import React from 'react';
import { Content, Card, CardItem, Body, Right, Badge, Button, H1, H3, Left, Header, Title } from 'native-base';
import { StyleSheet, Text, Image } from 'react-native';
import { AUTO_AMO_URL } from '../config';
import { formatTime, getExamTitle } from '../helper';

const ExamTicket = ({ ticket , counter, state, selectAnswer, nextTicket }) => {
    const
        { currentTicket:
            {
                title, answers, image, correct, position
            },
            currentTicketNumber,
            ticketsCount
        } = ticket;

    const hasImage = !(image.match(/no_image/gi));
    const headerTitle = getExamTitle(position);

    return (
        <Content padder>
           <Header style={styles.headerTitle}><Text>{headerTitle}</Text></Header>
            <Card style={styles.card}>
                <CardItem header bordered style={styles.cardItem}>
                    <Left>
                        <Text>{correct}</Text>
                    </Left>
                    <Body style={styles.answerNumber}>
                        <H1>{`${currentTicketNumber+1}/${ticketsCount}`}</H1>
                    </Body>
                    <Right style={styles.budge}>
                        <Badge success style={styles.correctAnswer} textStyle={{ color: 'white' }}>
                            <H3 style={{color: 'white'}}>{formatTime(counter)}</H3>
                        </Badge>
                    </Right>
                </CardItem>
                <CardItem bordered style={styles.cardItem}>
                    <Body style={{flex: 1}}>
                        {
                            hasImage && <Image source={{uri: `${AUTO_AMO_URL}/${image}`}} style={{height: 200,  alignSelf: 'stretch'}}/>
                        }
                        <Text style={{fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>{title}</Text>
                    </Body>
                </CardItem>
                {
                    answers.map((answer, index) => (
                        <CardItem key={index} bordered button  onPress={() => selectAnswer(index)}>
                            <Body>
                                <Text style={!state.cardItems[index] ? styles.textAnswer : styles.textPressAnswer}>{answer}</Text>
                            </Body>
                        </CardItem>
                    ))
                }
                <CardItem footer bordered style={{ width: '100%'}}>
                    {
                        <Button block disabled={state.buttonDisabled} onPress={() => nextTicket()} style={[styles.blockButton, !state.buttonDisabled && {backgroundColor: '#007bff'}]}  >
                            <Text style={{color: '#fff'}}>Далее</Text>
                        </Button>
                    }
                </CardItem>
            </Card>
        </Content>
    )
}

export default ExamTicket;

const styles = StyleSheet.create({
    headerTitle: {
        flex: 1,
        height: '100%',
        backgroundColor: '#fff'
    },
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
    cardItem: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    textAnswer: {
        color: '#000'
    },
    textPressAnswer: {
        color: '#B0C4DE'
    },
    correctAnswer: {
        flex: 1,
        alignItems: 'center',
        height: 30,
    },
});
