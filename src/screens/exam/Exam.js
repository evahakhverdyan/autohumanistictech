import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    sendExamResult,
    updateExamResult,
    getExamTickets,
    getTickets,
    resetExamResult,
} from '../../redux/actions/Tickets';
import { EXAM_TIME, ADDITIONAL_EXAM_TIME, ADDITIONAL_TIKETS_POSITION, SECOND_ADDITIONAL_TIKETS_POSITION } from '../../config/constants';
import { isArrayEmpty } from '../../helper';
import SpinnerBlue from '../../components/Spinner';
import ExamTicket from '../../components/ExamTicket';
import ExamResult from '../../components/ExamResult';

const Exam = ({ navigation, route }) => {
    const { internal } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(EXAM_TIME);
    const [isSendExamResult, setIsSendExamResult] = useState(false);
    const [state, setState ] = useState({
        buttonDisabled: true,
        selectedAnswerId: 0,
        hasSelectedAnswer: false,
        cardItems: [false, false, false, false]
    });

    const tickets = useSelector(state => state.tickets);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadExamTickets = async () => {
            setIsLoading(true);

            if(isArrayEmpty(tickets.topicTickets)){
                await dispatch(getTickets());
            }

            await dispatch(getExamTickets());
            setIsLoading(false);
        };

        loadExamTickets();

        navigation.setOptions({
            title: `${internal ? 'Экзамен автошколы' : 'Пробный экзамен'} `,
            headerBackTitleVisible: false,
            headerLeft: null
        });
    }, [dispatch]);

    useEffect(() => {
        let timer;
        if (counter > 0) {
            timer = setTimeout(() => setCounter(count => count - 1), 1000);
        } else if(!isSendExamResult) {
            showExamResult();
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [counter]);

    const selectAnswer = async (answerId) => {
        const cardItems = [false, false, false, false];
        cardItems[answerId] = !state.cardItems[answerId];
        setState({
            buttonDisabled: state.cardItems[answerId],
            hasSelectedAnswer: true,
            selectedAnswerId: answerId + 1,
            cardItems
        });
    }

    const nextTicket = async () => {
        await dispatch(updateExamResult(state.selectedAnswerId));

        const position = tickets.currentTicket.position;
        if(position === ADDITIONAL_TIKETS_POSITION || position === SECOND_ADDITIONAL_TIKETS_POSITION){
            setCounter(count => count + ADDITIONAL_EXAM_TIME);
        }

        setState({
            buttonDisabled: true,
            hasSelectedAnswer: false,
            cardItems: [false, false, false, false]
        });
    }

    const isFinalTicket = tickets ? useSelector(state => state.tickets.isFinalTicket) : false;

    React.useEffect(() => {
        let isSubscribed = true;
            if (isSubscribed && isFinalTicket) {
                showExamResult();
            }

        return () => isSubscribed = false
    }, [isFinalTicket]);

    const showExamResult = async () => {
        const { internal } = route.params;
        if(internal){
            await dispatch(sendExamResult());
        }

        setIsSendExamResult(true);
        setCounter(0);
    }

    const resetResult = async () => {
        await dispatch(resetExamResult());
        navigation.goBack();
    }

    return (
        isLoading ?
            <SpinnerBlue />
            : isFinalTicket ?
                <ExamResult
                    tickets={tickets}
                    resetResult={resetResult}
                />
                : <ExamTicket
                    ticket={tickets}
                    counter={counter}
                    state={state}
                    selectAnswer={selectAnswer}
                    nextTicket={nextTicket}
                />
    )
}
export default Exam;
