import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Content, List, ListItem, Left, Body } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import { getTickets, getSelectedTopic } from '../../redux/actions/Tickets';
import { isArrayEmpty } from '../../helper';
import SpinnerBlue from '../../components/Spinner';

const Topics = ({ navigation }) => {
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

    const topicTitles = useSelector(state => state.tickets.topicTitles);

    const selectTopic = async (position) => {
        await dispatch(getSelectedTopic(position));
        navigation.navigate('Tickets');
    }

    return (
        isLoading ? <SpinnerBlue />
        : <Content>
            <List>
                {
                    topicTitles.map((title, index) => (
                        <ListItem key={index} onPress={() => selectTopic(index+1)} >
                            <Left style={{flex: 0.28}}>
                                <Text style={{fontWeight: 'bold', marginRight: 5}}>Урок {index+1}</Text>
                            </Left>
                            <Body>
                                <Text>{title}</Text>
                            </Body>
                        </ListItem>
                    ))
                }
            </List>
        </Content>
    );
}

export default Topics;
