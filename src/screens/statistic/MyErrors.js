import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import { Body, Content, Right, List, ListItem, Icon } from 'native-base';
import SpinnerBlue from '../../components/Spinner';
import { fetchStatistics, getErrorTopic } from '../../redux/actions/Statistics';
import _ from 'lodash';
import { useIsFocused } from '@react-navigation/native';
import { isArrayEmpty } from '../../helper';

const MyErrors = ({ navigation }) => {
    const isFocused = useIsFocused();
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const { errorResults } = useSelector(state => state.statistics );

    useEffect(() => {
        const fetchStorage = async () => {
            setIsLoading(true);
            await dispatch(fetchStatistics());
            setIsLoading(false);
        };
        fetchStorage();
    }, [isFocused, dispatch]);

    const selectErrorTopicDetail = async (topicId) => {
        await dispatch(getErrorTopic(topicId));
        navigation.navigate('MyErrorDetail');
    }

    return (
        isLoading
        ?  <SpinnerBlue />
        :  <Content>
            <List>
                {
                    _.map(errorResults, (value, key) => (
                        <ListItem key={key}  onPress={() => selectErrorTopicDetail(value.topicId)}>
                            <Body>
                                <Text>{value.title}</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{color: '#f00'}}>{value.errors.length}/{value.ticketsCount}</Text>
                                </View>
                            </Body>
                            <Right>
                                <Icon style={{ fontSize: 18 }} name='arrow-forward'/>
                            </Right>
                        </ListItem>
                    ))
                }
            </List>
        </Content>
    );
}

export default MyErrors
