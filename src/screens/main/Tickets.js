import React, { useEffect, useState} from 'react';
import { HeaderBackButton } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import {
    getTopicTickets,
    getNextTicket,
    resetTicket,
    updateResult,
    getExamTickets,
    saveStorage,
    getTickets,
} from '../../redux/actions/Tickets';
import Ticket from '../../components/Ticket';
import SpinnerBlue from '../../components/Spinner';
import { isArrayEmpty } from '../../helper';

const Tickets = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [state, setState ] = useState({
        buttonDisabled: true,
        selectedAnswerId: 0,
        hasSelectedAnswer: false,
        cardItems: [false, false, false]
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const loadTickets = async () => {
            setIsLoading(true);

            if(isArrayEmpty(tickets.topicTickets)){
                await dispatch(getTickets());
            }
            await dispatch(getTopicTickets());
            /*isSelectedTopic
                ? await dispatch(getTopicTickets())
                : await dispatch(getExamTickets());*/

            setIsLoading(false);
        };

        loadTickets();

        navigation.setOptions({
            title: currentTicketTitle,
            headerBackTitleVisible: false,
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={() => navigation.goBack()}
                />
            )
        });

    }, [dispatch]);

    const tickets = useSelector(state => state.tickets);
    const { isSelectedTopic, currentTicketTitle } = useSelector(state => state.tickets);

    const selectAnswer = async (answerId) => {
        await dispatch(updateResult(answerId + 1));
        let { cardItems } = state;
        cardItems[answerId] = !state.cardItems[answerId];
        setState({
            buttonDisabled: false,
            hasSelectedAnswer: true,
            selectedAnswerId: answerId + 1,
            cardItems
        });
    }

    const clearState = () => {
        setState({
            buttonDisabled: true,
            hasSelectedAnswer: false,
            cardItems: [false, false, false]
        })
    }

    const nextTicket = () => {
        dispatch(getNextTicket());
        clearState();
    }

    const resetTickets = async() => {
        await dispatch(resetTicket());
        navigation.goBack();
    }

    const goBackToTopics = async () => {
        await dispatch(saveStorage());
        resetTickets();
    }

    return (
        isLoading
            ? <SpinnerBlue />
            : <Ticket
                ticket={tickets}
                state={state}
                selectAnswer={selectAnswer}
                nextTicket={nextTicket}
                resetTicket={resetTickets}
                goToTopics={goBackToTopics}
            />
    );
}

export default Tickets;
