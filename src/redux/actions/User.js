import AmoAutoService from '../../service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as constants from './constants';
import _ from 'lodash';

export function signInUser(login, password) {
    return async (dispatch, getState) => {
        const query = `api/login?login=${login}&password=${password}`;
        const { user } = await AmoAutoService.sendRequest(query, 'GET');

        if(user){
            await AsyncStorage.setItem(
                'user',
                JSON.stringify({...user, status: 'user'})
            );
        }

        try {
            dispatch({
                type: constants.USER_STATE_CHANGE,
                currentUser: user || null
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}

export function fetchUser() {
    return async (dispatch, getState) => {
        const user = await AsyncStorage.getItem('user');

        if(user) {
            try {
                dispatch({
                    type: constants.USER_STATE_CHANGE,
                    currentUser: JSON.parse(user)
                })
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
    }
}

export function loadPersonalData(currentUserId) {
    return async (dispatch, getState) => {
        const query = `amo.php?type=getLead&leadId=${currentUserId}`;
        const user = await AmoAutoService.sendRequest(query, 'GET');
        const userData = _.transform(user, (result, value, key) => {
            result.push({
                fieldName: key,
                fieldValue: value
            });
        }, []);

        try {
            dispatch({
                type: constants.GET_USER,
                userData
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}

export const clearUser = () => {
    return async (dispatch, getState) => {
        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
            if (Platform.OS === 'android') {
                await AsyncStorage.clear();
            }
            if (Platform.OS === 'ios') {
                await AsyncStorage.multiRemove(asyncStorageKeys);
            }
        }

        try {
            dispatch({
                type:  constants.USER_STATE_CLEAR
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}

export const setUnaccountUser = () => {
    return async (dispatch, getState) => {
        const user = { status: 'quest' };
            await AsyncStorage.setItem(
                'user',
                JSON.stringify(user)
            );
        try {
            dispatch({
                type: constants.USER_STATE_CHANGE,
                currentUser: user
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}

export const isExamActive = (currentUserId) => {
    return async (dispatch, getState) => {
        const query = `api/checkExam?userId=${currentUserId}`;
        const { attempts, isActiveExam } = await AmoAutoService.sendRequest(query, 'GET');

        try {
            dispatch({
                type: constants.IS_EXAM_ACTIVE,
                isActiveExam,
                attempts
            })
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
}

export const getExamAttempts = () => {
    return {
        type: constants.GET_EXAM_ATTEMPTS
    };
}


