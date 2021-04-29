import * as constants from '../actions/constants';

const initialState = {
    currentUser: null,
    userData: null,
    isActiveExam: false,
    examAttempts: [null, null, null]
}

export default function reduce (state = initialState, action) {
    switch (action.type) {
        case constants.USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case constants.GET_USER:
            return {
                ...state,
                userData: action.userData
            }
        case constants.USER_STATE_CLEAR:
            return {
                ...state,
                currentUser: null
            }
        case constants.IS_EXAM_ACTIVE:
            return {
                ...state,
                isActiveExam: action.isActiveExam,
                examAttempts: action.attempts
            }
        case constants.SET_ATTEMPT:
            return {
                ...state,
                examAttempts: action.examAttempts
            }
        default:
            return state;
    }
}
