import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Text, Animated } from 'react-native';
import { Content, CardItem, Card, View } from 'native-base';
import _ from 'lodash';
import { isArrayEmpty, progressPercent } from '../../helper';
import { getTickets } from '../../redux/actions/Tickets';
import SpinnerBlue from '../../components/Spinner';

const Statistic = () => {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const loadTopics = async () => {
            setIsLoading(true);

            if(isArrayEmpty(topicTitles)) {
                await dispatch(getTickets());
            }

            setIsLoading(false);
        };

        loadTopics();
    }, [dispatch]);

    const { results } = useSelector(state => state.statistics );

    const { topicTitles, totalTickets } = useSelector(state => state.tickets);

    const successTickets = _.sumBy(_.map(results, 'success'), 'length');

    const successTopic =  _.filter(results, (item) => item.success.length === item.ticketsCount);

    const successTicketsPercent = progressPercent(successTickets, totalTickets.length);

    const successTopicPercent = progressPercent(successTopic.length, topicTitles.length);

    return (
        isLoading ?
            <SpinnerBlue />
            : <Content padder>
                <View style={styles.container}>
                    <Text>Вопросы</Text>
                    <View style={styles.progressBar}>
                        <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: '#007bff', width: `${successTicketsPercent}%`}}/>
                    </View>
                    <Text>{successTicketsPercent}% ({successTickets}/{totalTickets.length})</Text>
                    <View style={{margin: 20}}></View>
                   <Text>Темы</Text>
                    <View style={styles.progressBar}>
                        <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: '#007bff', width: `${successTopicPercent}%`}}/>
                    </View>
                    <Text>{successTopicPercent}% ({successTopic.length}/{topicTitles.length})</Text>
                </View>
            </Content>
    );
}

export default Statistic;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8
    },
    progressBar: {
        flexDirection: 'row',
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5
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
    cardItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left'
    },
});