import AmoAutoService from '../../service';
import * as constants from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import _ from 'lodash';

export const getTickets = () => {
    return async (dispatch, getState) => {
        const query = `questions.json`;
        const topicTickets = await AmoAutoService.sendRequest(query, 'GET');

        try {
            dispatch({
                type: constants.GET_TICKETS,
                topicTickets
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}

export const getTopicTickets = () => {
    return {
        type: constants.GET_TOPIC_TICKETS
    };
}

export const getExamTickets = () => {
    return {
        type: constants.GET_EXAM_TICKETS
    };
}

export const getSelectedTopic = (position) => {
    return {
        type: constants.SELECTED_TOPIC,
        position
    };
}

export const updateResult = (answerId) => {
    return {
        type: constants.UPDATE_RESULT,
        answerId
    };
}

export const updateExamResult = (answerId) => {
    return {
        type: constants.UPDATE_EXAM_RESULT,
        answerId
    };
}

export const getNextTicket = () => {
    return {
        type: constants.NEXT_TICKET
    };
}

export const resetTicket = () => {
    return {
        type: constants.RESET_TICKET
    };
}

export const saveStorage = () => {
    return async (dispatch, getState) => {
        try {

            let { topicId , statistics } = getState().tickets;
            const { currentUser } = getState().user;

            const deviceId = await DeviceInfo.getUniqueId();
       
            const query = `api/getState?userId=${currentUser?.id}&deviceId=${deviceId}`;
            const { state } = await AmoAutoService.sendRequest(query, 'GET');

            if(state){
                delete state[topicId];
                statistics = {...state, ...statistics};
            }
            
            await AmoAutoService.sendRequest('api/saveState', 'POST', { body: JSON.stringify({
                userId: currentUser?.id,
                deviceId,
                state: statistics
            }) });

            dispatch({
                type: constants.RESET_STATISTIC
            })
        } catch (error) {
            console.log(error);
        }
       
    }
}

export const sendExamResult = () => {
    return async (dispatch, getState) => {
        const {
            tickets: {
                examTicketsCount,
                correctAnswer,
                errorAnswer,
                exam
                },
            user: {
                currentUser: { id },
                examAttempts
            }
        } = getState();

        const attemptIndex = examAttempts.findIndex(item => item === null);
        const isCorrect = errorAnswer < 3;
        examAttempts[attemptIndex] = isCorrect;

        exam.result = {
            userId: id,
            ticketsCount: examTicketsCount,
            correctAnswer,
            errorAnswer,
            answeredTickets: exam.tickets.length,
            attempt: attemptIndex + 1,
            isCorrect
        }

        try {
            const query = `api/saveExam`;
            await AmoAutoService.sendRequest(query, 'POST', { body: JSON.stringify(exam) });
            dispatch({
                type: constants.SET_ATTEMPT,
                examAttempts

            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const resetExamResult = () => {
    return {
        type: constants.RESET_EXAM_RESULT
    };
}
