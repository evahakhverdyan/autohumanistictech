import * as constants from '../actions/constants';
import { ADDITIONAL_TIKETS_СOUNT, LIMIT_RANDOM_TIMES } from '../../config/constants';
import _ from 'lodash';

const initialState = {
    topicTitles: [],
    topicTickets: [],
    totalTickets: [],
    selectedTickets: [],
    totalTicketsCount: 0,
    currentTicket: null,
    currentTicketNumber: 0,
    currentTicketTitle: null,
    topicId: 0,
    ticketsCount: 0,
    correctAnswer: 0,
    errorAnswer: 0,
    isFinalTicket: false,
    isSelectedTopic: false,
    isExamTickets: false,
    examTicketsCount: 0,
    exam: {
        tickets: [],
        result: {}
    },
    statistics: {}
};

const resetTickets = {
    isFinalTicket: false,
    isSelectedTopic: false,
    isExamTickets: false,
    currentTicketNumber: 0,
    topicId: 0,
    correctAnswer: 0,
    errorAnswer: 0
};

export default function reduce (state = initialState, action) {
    switch (action.type) {
        case constants.GET_TICKETS:
            const { topicTickets } = action;
            return {
                ...state,
                topicTickets,
                topicTitles: _.map(topicTickets, 'section'),
                totalTickets: _.flatten(_.map(topicTickets, 'tickets'))
            }
        case constants.SELECTED_TOPIC:
            return {
                ...state,
                ...getSelectedTopic(state, action.position),
                isSelectedTopic: true
            }
        case constants.GET_EXAM_TICKETS:
            return {
                ...state,
                ...getRandomTickets(state, LIMIT_RANDOM_TIMES),
                currentTicketTitle: 'Экзамен',
                currentTicketNumber: 0,
                correctAnswer: 0,
                errorAnswer: 0,
                isExamTickets: true
            }
        case constants.UPDATE_RESULT:
            return {
                ...state,
                ...updateResult(state, action.answerId),
                ...updateStatistics(state, action.answerId)
            }
        case constants.UPDATE_EXAM_RESULT:
            return {
                ...state,
                ...updateResult(state, action.answerId),
                ...updateExamResult(state, action.answerId),
                ...getNextExamTicket(state, action.answerId)
            }
        case constants.NEXT_TICKET:
            return {
                ...state,
                ...getNextTicket(state)
            }
        case constants.RESET_TICKET:
            return {
                ...state,
                ...resetTickets,
                statistics: {}
            }
        case constants.RESET_EXAM_RESULT:
            return {
                ...state,
                ...resetTickets,
                exam: {
                    tickets: [],
                    result: {}
                }
            }
        case constants.RESET_STATISTIC:
            return {
                ...state,
                statistics: {}
            }
        default:
            return state;
    }
}

const getRandomTickets = (state, limitTimes) => {
    const { totalTickets } = state;
    const selectedTickets = [];
    let times = 0;
    while (times < limitTimes) {
        const random = _.random(totalTickets.length);
        const randomTicket = totalTickets[random];

        if(!_.some(selectedTickets, randomTicket)){
            randomTicket.position = times + 1;
            selectedTickets.push(randomTicket);
            times++;
        }
    }

    return {
        selectedTickets,
        currentTicket: _.head(selectedTickets),
        examTicketsCount: 20,
        ticketsCount: 20
    };
}

const getNextExamTicket = (state, answerId) => {
    let { currentTicketNumber, selectedTickets, ticketsCount, isFinalTicket, currentTicket, errorAnswer, examTicketsCount } = state;
    currentTicketNumber += 1;

    const position = currentTicket.position;
    if( Number(currentTicket.correct) !== answerId){
        ++errorAnswer;
    }

    switch(position){
        case 20:
            if(errorAnswer == 1 || errorAnswer == 2) {
                currentTicketNumber = 0;
                ticketsCount = ADDITIONAL_TIKETS_СOUNT;
                examTicketsCount += ticketsCount;

            }else{
                isFinalTicket = true;
            }
            break;
        case 25:
            if(errorAnswer == 2) {
                currentTicketNumber = 0;
                examTicketsCount += ticketsCount;
            } else {
                isFinalTicket = true;
            }
            break;
        case 30:
            isFinalTicket = true;
            break;
    }

    return isFinalTicket ? { currentTicketNumber, isFinalTicket } : {
        currentTicketNumber,
        ticketsCount,
        examTicketsCount,
        currentTicket: selectedTickets[position],
        isFinalTicket
    }
}

const getSelectedTopic = (state, position) => {
    const { topicTickets } = state;
    const { tickets: selectedTickets, section: currentTicketTitle, position: topicId } = _.find(topicTickets, { position });

    return {
        selectedTickets,
        currentTicketTitle: _.head(currentTicketTitle.split('(')),
        currentTicket: _.head(selectedTickets),
        topicId,
        ticketsCount: selectedTickets.length
    };
}

const updateStatistics = (state, answerId) => {
    const { currentTicket, currentTicketTitle, statistics, topicId, currentTicketNumber, ticketsCount } = state;
    if(!statistics[topicId]){
        statistics[topicId] = {
            title: currentTicketTitle,
            topicId,
            ticketsCount,
            errors: [],
            success: []
        }
    }

    if(Number(currentTicket.correct) !== answerId) {
        statistics[topicId].errors.push({
            ...currentTicket,
            currentTicketNumber,
            answerId: answerId
        })
    } else {
        statistics[topicId].success.push({
            currentTicketNumber
        })
    }

    return statistics;
}

const updateExamResult = (state, answerId) => {
    let { currentTicket, exam } = state;
    exam.tickets.push({...currentTicket, selectAnswerId: answerId});

    return exam;
}

const updateResult = (state, answerId) => {
    const { currentTicket: { correct }, correctAnswer, errorAnswer } = state;

    return Number(correct) === answerId ? { correctAnswer: correctAnswer + 1 } : { errorAnswer: errorAnswer + 1 };
}

const getNextTicket = (state) => {
    let { currentTicketNumber, selectedTickets, ticketsCount, isFinalTicket } = state;
    currentTicketNumber += 1;

    return isFinalTicket ? { currentTicketNumber } : {
            currentTicketNumber,
            currentTicket: selectedTickets[currentTicketNumber],
            isFinalTicket: ticketsCount === currentTicketNumber + 1
        }
}
