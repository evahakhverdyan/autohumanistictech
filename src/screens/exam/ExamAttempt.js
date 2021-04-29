import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native'
import { Content, Card, CardItem, Body, Button, Left, Right } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector} from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {  isExamActive } from '../../redux/actions/User';

const ExamAttempt = ({navigation}) => {
    const isFocused = useIsFocused()
    const examAttempts = useSelector(state => state.user.examAttempts);
    const currentUser = useSelector(state => state.user.currentUser);
    const isActiveExam = useSelector(state => state.user.isActiveExam);

    const dispatch = useDispatch();

    useEffect(() => {
        const checkExamActive = async () => dispatch(isExamActive(currentUser.id));
        checkExamActive();
    }, [isFocused]);


    const successAttempt = examAttempts.filter(element => element === true).length;
    const block = !isActiveExam || successAttempt >= 2;

    return (
        <Content padder>
            <View style={{flex: 1}}>
                <Card style={styles.card}>
                    <CardItem style={styles.cardItem}>
                        <Text style={{fontWeight: 'bold',margin: 10}}>Итак, вы готовы сдать внутренний экзамен автошколы.</Text>
                        <Text style={{margin: 10}}>На это дается 3 попытки, 2 из которых должны быть успешными.</Text>
                        <Text style={{margin: 10}}>В каждой попытке 20 случайных вопросов. На них надо ответить за 20 минут. За каждую ошибку назначается штраф - 5 вопросов и 5 дополнительных минут.</Text>
                        <Text style={{margin: 10}}>Попытка успешна, если допущено не более 2 ошибок.</Text>
                    </CardItem>
                </Card>
                <Card style={styles.card}>
                    {
                        examAttempts.map( (item, key)=> (
                            <CardItem bordered key={key} style={{flex: 1, width: '80%'}}>
                                <Right></Right>
                                <Body>
                                    <Text style={{ fontWeight: 'bold'}}>Попытка {key+1}</Text>
                                </Body>
                                <Left>
                                    {item !== null && <MaterialCommunityIcons name={item ? 'check': 'close'} color={item ? 'green': 'red'} size={20}/>}
                                </Left>
                            </CardItem>
                        ))
                    }
                </Card>
                <Card style={styles.card}>
                    <CardItem footer style={{ width: '90%'}}>
                        {
                            <Button disabled={block} style={[styles.blockButton, !block && {backgroundColor: '#007bff'}]} onPress={() => navigation.navigate('Exam', { internal: true })}>
                                <Text style={styles.buttonText}>Начать экзамен</Text>
                            </Button>
                        }
                    </CardItem>
                    <CardItem footer style={{ width: '90%'}}>
                        {
                            <Button style={[styles.blockButton, { backgroundColor: '#007bff' }]} onPress={() => navigation.goBack()}>
                                <Text style={styles.buttonText}>Позже</Text>
                            </Button>
                        }
                    </CardItem>
                </Card>
            </View>

        </Content>
    )
}
export default ExamAttempt;

const styles = StyleSheet.create({
    blockButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        width: '100%'
    },
    buttonText: {
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginBottom: 3,
        marginTop: 3,
        borderRadius: 5
    },
    answerNumber: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
       // justifyContent: 'space-between'
    },
    cardActive: {
        flex: 1,
        position: 'absolute',
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
