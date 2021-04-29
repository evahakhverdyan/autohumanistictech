import React, { useEffect } from 'react';
import { Content, Card, CardItem, Body, Button, H1, H2 } from 'native-base';
import { StyleSheet, Text } from 'react-native';

const ExamResult = ({ tickets, resetResult }) => {
    const { errorAnswer, correctAnswer,  examTicketsCount, exam } = tickets

    return (
        <Content padder>
            <Card style={styles.card}>
                <CardItem header bordered style={styles.cardItem}>
                    <Body style={styles.answerNumber}>
                        { errorAnswer < 3 ?
                            <>
                                <H1 style={{color: '#5cb85c'}}>Поздравляем!!</H1>
                                <H2 style={{color: '#5cb85c'}}>Попытка успешная!</H2>
                            </>
                            :
                            <H2 style={{color: '#d9534f'}}>Попытка провалилась!</H2>
                        }
                    </Body>
                </CardItem>
                <CardItem bordered style={styles.cardItem}>
                    <Text style={{fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>Всего вопросов: {examTicketsCount}</Text>
                </CardItem>
                <CardItem bordered style={styles.cardItem}>
                    <Text style={{fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>Было отвечено на: {exam.tickets.length}</Text>
                </CardItem>
                <CardItem bordered style={styles.cardItem}>
                    <Text style={{fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>Правильных ответов: {correctAnswer}</Text>
                </CardItem>
                <CardItem bordered style={styles.cardItem}>
                    <Text style={{fontWeight: 'bold', marginBottom: 10, marginTop: 10}}>Неправильных ответов: {errorAnswer}</Text>
                </CardItem>
                <CardItem footer bordered style={{ width: '100%'}}>
                    <Button block onPress={() => resetResult()} style={[styles.blockButton, {backgroundColor: '#007bff'}]} >
                        <Text style={{color: '#fff'}}>Вернуться</Text>
                    </Button>
                </CardItem>
            </Card>
        </Content>
    )
}
export default ExamResult;

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
    cardItem: {
        display: 'flex',
        justifyContent: 'space-between'
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
    }
});

