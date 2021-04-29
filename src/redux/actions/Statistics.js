import * as constants from './constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import AmoAutoService from '../../service';

export const fetchStatistics = () => {
    return async (dispatch, getState) => {
            try {
                const { currentUser } = getState().user;
                const deviceId = await DeviceInfo.getUniqueId();
               
                const query = `api/getState?userId=${currentUser?.id}&deviceId=${deviceId}`;
                const { state } = await AmoAutoService.sendRequest(query, 'GET');
                
                dispatch({
                    type: constants.FETCH_STATISTIC,
                    statistics: state
                })
            } catch (error) {
                console.error('Ошибка:', error);
            }

    }
}

export const getErrorTopic = (topicId) => {
    return {
        type: constants.ERROR_TOPIC,
        topicId
    }
}

export const getCurrentTicket = () => {
    return {
        type: constants.GET_CURRENT_ERROR_TICKET
    }
}

export const getNextErrorTicket = () => {
    return {
        type: constants.GET_NEXT_ERROR_TICKET
    }
}

export const resetErrorTicket = () => {
    return {
        type: constants.RESET_ERROR_TICKET
    }
}
