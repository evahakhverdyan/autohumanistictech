import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTicket, getNextErrorTicket, resetErrorTicket } from '../../redux/actions/Statistics';
import MyErrors from '../../components/MyErrors';
import { HeaderBackButton } from '@react-navigation/stack';
import SpinnerBlue from '../../components/Spinner';

const MyErrorDetail = ({ navigation}) => {
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadErrorTickets = async () => {
            setIsLoading(true);
            await dispatch(getCurrentTicket());
            setIsLoading(false);
        };

        loadErrorTickets();

        navigation.setOptions({
            title: statistics?.topicTitle,
            headerBackTitleVisible: false,
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => navigation.goBack()}
                />
            )
        });

    }, [dispatch]);

    const statistics = useSelector(state => state.statistics);

    const nextErrorTicket = () => dispatch(getNextErrorTicket());

    const resetErrorTickets = async () => {
        setIsLoading(true);
        await dispatch(resetErrorTicket());
        navigation.goBack();
    }

    return (
        isLoading
            ? <SpinnerBlue />
            : <MyErrors
                myErrors={statistics}
                nextTicket={nextErrorTicket}
                resetErrorTicket={resetErrorTickets}
            />
    );
}

export default MyErrorDetail;
