import * as constants from '../actions/constants';
import _ from 'lodash';
import { isArrayEmpty } from '../../helper';

const initialState = {
    results: [],
    errorResults: [],
    errorTickets: [],
    currentTicket: 0,
    currentTicketNumber: 0,
    topicTitle: '',
    finalTicket: false,
    errorCount: 0
};

export default function reduce (state = initialState, action) {
    switch (action.type) {
        case constants.FETCH_STATISTIC:
            const stat = action.statistics;

            return {
                ...state,
                results: action.statistics,
                errorResults: _.filter(action.statistics, (item) => !isArrayEmpty(item.errors))
            }

        case constants.ERROR_TOPIC:
            const topicId = action.topicId;

            return {
                ...state,
                errorTickets: state.results[topicId].errors,
                topicTitle: _.head(state.results[topicId].title.split('('))
            }

        case constants.GET_CURRENT_ERROR_TICKET:
            return {
                ...state,
                ...getCurrentTicket(state)
            }

        case constants.GET_NEXT_ERROR_TICKET:
            return {
                ...state,
                ...getNextErrorTicket(state)
            }

        case constants.RESET_ERROR_TICKET:
            return initialState;

        default:
            return state;
    }
}

const getCurrentTicket = (state) => {
    const { errorTickets } = state;
    return {
        currentTicket: _.head(errorTickets),
        isFinalTicket: errorTickets.length === 1
    };
}

const getNextErrorTicket = (state) => {
    let { errorTickets, currentTicketNumber } = state;
    currentTicketNumber += 1;

    return {
        currentTicketNumber,
        currentTicket: errorTickets[currentTicketNumber],
        isFinalTicket: errorTickets.length === currentTicketNumber + 1
    };
}

